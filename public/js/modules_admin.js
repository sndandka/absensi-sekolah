/* ═══════════════════════════════════════════════
   SiAbsen SMK - Admin Modules  (modules_admin.js)
   ═══════════════════════════════════════════════ */

// ── MANAJEMEN USER ─────────────────────────────────────
async function fetchUsers(query = '') {
  const tbody = id('userTbody'); if (!tbody) return;
  
  const { data: rows, error } = await supabase
    .from('profiles')
    .select('*')
    .order('name', { ascending: true });

  if (error) return console.error('Fetch users error:', error);
  if (!Array.isArray(rows)) return;
  
  const filtered = query 
    ? rows.filter(r => (r.name||'').toLowerCase().includes(query.toLowerCase()) || (r.email||'').toLowerCase().includes(query.toLowerCase()))
    : rows;

  tbody.innerHTML = filtered.map(u => `<tr>
    <td><div class="flex gap1" style="align-items:center">
      <div class="att-av av-hadir" style="width:30px;height:30px;font-size:.72rem;flex-shrink:0">${(u.name||'?').substring(0,2).toUpperCase()}</div>
      <span style="font-weight:600">${u.name||'-'}</span>
    </div></td>
    <td>${u.email}</td>
    <td><span class="bdg ${u.role==='admin'?'bv':u.role==='guru'?'bg':'bs'}">${(u.role||'siswa').toUpperCase()}</span></td>
    <td><span class="bdg ${u.active?'bg':'br'}">${u.active?'Aktif':'Nonaktif'}</span></td>
    <td class="t3 txs">${u.updated_at ? fdt(u.updated_at) : '-'}</td>
    <td>
      <button class="btn btn-xs btn-out" onclick="editUser('${u.id}')">Edit</button>
      <button class="btn btn-xs btn-red" onclick="deleteUser('${u.id}')">Hapus</button>
    </td>
  </tr>`).join('');
}

function filterUsers(val) { fetchUsers(val); }

function addUser() {
  id('userForm').reset();
  id('userId').value = '';
  id('userMdlTitle').textContent = 'Tambah User Baru (Gunakan Menu Register)';
  // Note: Admin cannot directly create Auth users from client-side easily.
  showToast('Admin sebaiknya menggunakan menu pendaftaran atau Supabase Dashboard untuk menambah user baru.', 'info');
  openMdl('userMdl');
}

async function editUser(userId) {
  const { data: u, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !u) return showToast('User tidak ditemukan', 'error');
  
  id('userId').value = u.id;
  id('userName').value = u.name;
  id('userEmail').value = u.email;
  id('userRole').value = u.role;
  id('userPass').value = ''; 
  id('userMdlTitle').textContent = 'Edit User';
  openMdl('userMdl');
}

async function saveUser(e) {
  e.preventDefault();
  const userId = id('userId').value;
  const name = id('userName').value;
  const email = id('userEmail').value;
  const role = id('userRole').value;

  if (userId) {
    // Update profile
    const { error } = await supabase
      .from('profiles')
      .update({ name, email, role, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) return showToast('Gagal memperbarui: ' + error.message, 'error');
    showToast('User berhasil diperbarui!', 'success');
  } else {
    showToast('Untuk menambah user baru, gunakan menu Register atau Supabase Dashboard.', 'warning');
    return;
  }

  closeMdl('userMdl');
  fetchUsers();
}

async function deleteUser(userId) {
  if (!confirm('Hapus profil user ini? (Akun login tetap ada di Auth)')) return;
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) return showToast('Gagal menghapus: ' + error.message, 'error');
  showToast('Profil user berhasil dihapus', 'success');
  fetchUsers();
}

// ── IMPORT CSV SISWA ───────────────────────────────────
async function importStu(input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = e.target.result;
    const lines = text.split('\n').map(l => l.split(','));
    // Expected header: nama,nisn,no,gender,phone,parentName,parentPhone,class_id
    const header = lines[0].map(h => h.trim().toLowerCase());
    const data = lines.slice(1).filter(l => l.length >= 2).map(l => {
      const obj = {};
      header.forEach((h, i) => obj[h] = l[i] ? l[i].trim() : '');
      return obj;
    });

    if (!data.length) return showToast('File CSV kosong atau tidak valid', 'error');
    
    const formatted = data.map(s => ({
      name: s.nama || s.name,
      nisn: s.nisn,
      no: parseInt(s.no) || 0,
      gender: s.gender || 'L',
      phone: s.phone,

      class_id: parseInt(s.class_id) || parseInt(id('stuCls').value) || null,
      active: true
    }));

    const { data: res, error } = await supabase.from('students').insert(formatted);
    
    if (!error) {
      showToast(`${formatted.length} siswa berhasil diimport!`, 'success');
      input.value = '';
      fetchStu(id('stuCls').value);
    } else {
      showToast('Gagal import: ' + error.message, 'error');
    }
  };
  reader.readAsText(file);
}
