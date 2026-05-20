/* ═══════════════════════════════════════════════════════════
   SiAbsen — Modul Data (Siswa, Guru, Kelas, Mapel) MySQL
   ═══════════════════════════════════════════════════════════ */

/* ╔══════════════════════════════╗
   ║  3. DATA SISWA               ║
   ╚══════════════════════════════╝ */
let stuList=[], classesMap={};
async function siswa(){
  setHdr('Data Siswa','Manajemen data siswa sekolah');
  await fillClassSel('stuCls',true); await fetchStu();
}
async function fetchStu(clsId=''){
  const isAdmin = App.profile?.role === 'admin';
  const tableCard = id('stuTableCard');
  const cardsWrap = id('stuCardsWrap');

  if (isAdmin) {
    if (tableCard) tableCard.style.display = 'block';
    if (cardsWrap) cardsWrap.style.display = 'none';
  } else {
    if (tableCard) tableCard.style.display = 'none';
    if (cardsWrap) cardsWrap.style.display = 'grid';
  }

  const tbTbody = id('stuTbody');
  
  if(isAdmin && tbTbody) {
    tbTbody.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  } else if (!isAdmin && cardsWrap) {
    cardsWrap.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></div>`;
  }
  
  // Build class lookup map (no FK dependency needed)
  if (!Object.keys(classesMap).length) {
    const { data: cls } = await supabase.from('classes').select('id, name');
    if (Array.isArray(cls)) cls.forEach(c => classesMap[c.id] = c.name);
  }

  let query = supabase.from('students').select('*');
  if(clsId) query = query.eq('class_id', clsId);
  
  const { data, error } = await query;
  if (error) {
    console.error('fetchStu error:', error);
    if(isAdmin && tbTbody) tbTbody.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--red)">Gagal memuat: ${error.message}</td></tr>`;
    else if (!isAdmin && cardsWrap) cardsWrap.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--red)">Gagal memuat: ${error.message}</div>`;
    return;
  }
  stuList = Array.isArray(data) ? data : [];
  stuList.sort((a,b)=>(a.name||'').localeCompare(b.name||''));
  renderStuTable(stuList);
}

function renderStuTable(list) {
  const isAdmin = App.profile?.role === 'admin';
  const tbTbody = id('stuTbody');
  const cardsWrap = id('stuCardsWrap'); 

  if (isAdmin) {
    if (!tbTbody) return;
    if (!list.length) {
      tbTbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--tx3)">Belum ada data siswa</td></tr>';
      return;
    }
    tbTbody.innerHTML = list.map((s, i) => `<tr>
      <td style="font-weight:700">${s.name}</td>
      <td class="t2">${s.nisn || '—'}</td>
      <td class="t2">${s.no || '—'}</td>
      <td><span class="bdg bv">${classesMap[s.class_id] || '—'}</span></td>
      <td><span class="bdg bn">${s.gender || '—'}</span></td>
      <td class="t2">${s.phone || '—'}</td>
      <td><div class="flex gap1">
        <button class="btn btn-xs btn-out" onclick="editStu('${s.id}')"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle"></button>
        <button class="btn btn-xs btn-red" onclick="delStu('${s.id}','${(s.name||'').replace(/'/g,"\\'")}')"><img src="image/trash.png" style="width:1.2em;height:1.2em;vertical-align:middle"></button>
      </div></td>
    </tr>`).join('');
  } else {
    if (!cardsWrap) return;
    if (!list.length) {
      cardsWrap.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--tx3)">Belum ada data siswa</div>';
      return;
    }
    cardsWrap.innerHTML = list.map((s, i) => `
      <div class="card" style="display:flex;flex-direction:column;border:1.5px solid var(--brd);border-radius:1rem;overflow:hidden;box-shadow:var(--s1);transition:transform 0.2s, box-shadow 0.2s" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='var(--s2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='var(--s1)'">
        <div style="padding:1rem 1.2rem;background:var(--bg2);border-bottom:1px solid var(--brd);display:flex;justify-content:space-between;align-items:center">
          <span class="bdg bv" style="font-size:0.75rem">${classesMap[s.class_id] || 'Tidak Ada Kelas'}</span>
          <span class="bdg bn" style="font-size:0.75rem">No: ${s.no || '—'}</span>
        </div>
        <div style="padding:1.2rem;flex:1;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:1rem">
            <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--v),var(--v1));display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:1rem;font-weight:700">
              ${s.gender || '?'}
            </div>
            <div>
              <div style="font-weight:800;font-size:1.05rem;color:var(--tx1);line-height:1.2">${s.name}</div>
              <div class="t2" style="font-size:0.8rem;margin-top:0.2rem">NISN: ${s.nisn || '—'}</div>
            </div>
          </div>
          
          <div style="margin-bottom:1.2rem;font-size:0.85rem">
            <div style="display:flex;align-items:center;gap:0.5rem;color:var(--tx2);margin-bottom:0.4rem">
              <span>📞</span> ${s.phone || '—'}
            </div>
          </div>
          
          <div style="margin-top:auto;display:flex;gap:0.5rem">
            <button class="btn btn-xs btn-out" style="flex:1;justify-content:center;border-color:var(--brd);color:var(--tx2)" onclick="editStu('${s.id}')">
              <img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:brightness(0.5)"> Edit
            </button>
            <button class="btn btn-xs btn-red" style="padding:0 0.8rem;justify-content:center" onclick="delStu('${s.id}','${(s.name||'').replace(/'/g,"\\'")}')" title="Hapus">
              <img src="image/trash.png" style="width:1.2em;height:1.2em;vertical-align:middle">
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function filterStu(val) {
  if(!val) return renderStuTable(stuList);
  const v = val.toLowerCase();
  renderStuTable(stuList.filter(s => (s.name||'').toLowerCase().includes(v) || (s.nisn||'').toLowerCase().includes(v)));
}

async function addStu() {
  id('stuForm').reset();
  id('stuId').value = '';
  id('stuMdlTitle').textContent = 'Tambah Siswa';
  await fillClassSel('stuClsId');
  openMdl('stuMdl');
}

async function editStu(eid) {
  const s = stuList.find(x => x.id == eid);
  if(!s) return;
  id('stuId').value = s.id;
  id('stuName').value = s.name;
  id('stuNisn').value = s.nisn || '';
  id('stuNo').value = s.no || '';
  id('stuGender').value = s.gender || 'L';
  id('stuPhone').value = s.phone || '';
  id('stuParent').value = s.parent_name || '';
  id('stuParentPh').value = s.parent_phone || '';
  await fillClassSel('stuClsId');
  id('stuClsId').value = s.class_id || '';
  id('stuMdlTitle').textContent = 'Edit Siswa';
  openMdl('stuMdl');
}

async function saveStu(e){
  e.preventDefault(); 
  const eid = id('stuId').value;
  const data = {
    name: id('stuName').value.trim(),
    nisn: id('stuNisn').value.trim() || null,
    no: parseInt(id('stuNo').value) || 0,
    gender: id('stuGender').value,
    phone: id('stuPhone').value.trim() || null,
    parent_name: id('stuParent').value.trim() || null,
    parent_phone: id('stuParentPh').value.trim() || null,
    class_id: parseInt(id('stuClsId').value) || null
  };

  if(!data.name) return showToast('Nama wajib diisi!','warning');

  let error;
  if(eid){
    const { error: e } = await supabase.from('students').update(data).eq('id', eid);
    error = e;
  } else {
    const { error: e } = await supabase.from('students').insert([data]);
    error = e;
  }

  if (error) {
    showToast('Gagal menyimpan: ' + error.message, 'error');
  } else {
    showToast(`Siswa ${eid?'diperbarui':'ditambahkan'}!`,'success');
    closeMdl('stuMdl'); fetchStu();
  }
}

async function delStu(eid,name){
  if(!confirm(`Hapus siswa "${name}"?`)) return;
  const { error } = await supabase.from('students').delete().eq('id', eid);
  if (!error) {
    showToast('Siswa dihapus','success'); fetchStu();
  } else {
    showToast('Gagal menghapus: ' + error.message, 'error');
  }
}

let tchrList = [];
async function guru(){
  setHdr('Data Guru','Manajemen data guru & wali kelas');
  const { data, error } = await supabase.from('teachers').select('*').order('name');
  if (error) console.error('fetch guru error:', error);
  tchrList = Array.isArray(data) ? data : [];
  renderTchrTable(tchrList);
}

function renderTchrTable(list) {
  const tb = id('guruTbody'); if (!tb) return;
  if (!list.length) {
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--tx3)">Belum ada data guru</td></tr>';
    return;
  }
  tb.innerHTML = list.map(g => `<tr>
    <td style="font-weight:700">${g.name}</td>
    <td class="t2">${g.nip || '—'}</td>
    <td class="t2">${g.subject || '—'}</td>
    <td><span class="bdg bv">${g.homeroom || '—'}</span></td>
    <td class="t2">${g.phone || '—'}</td>
    <td><div class="flex gap1">
      <button class="btn btn-xs btn-out" onclick="editGuru('${g.id}')"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle"></button>
      <button class="btn btn-xs btn-red" onclick="delGuru('${g.id}','${(g.name||'').replace(/'/g,"\\'")}')"><img src="image/trash.png" style="width:1.2em;height:1.2em;vertical-align:middle"></button>
    </div></td>
  </tr>`).join('');
}

function filterGuru(val) {
  if(!val) return renderTchrTable(tchrList);
  const v = val.toLowerCase();
  renderTchrTable(tchrList.filter(g => (g.name||'').toLowerCase().includes(v) || (g.nip||'').toLowerCase().includes(v)));
}

function addGuru() {
  id('guruForm').reset();
  id('guruId').value = '';
  id('guruMdlTitle').textContent = 'Tambah Guru';
  openMdl('guruMdl');
}

function editGuru(eid) {
  const g = tchrList.find(x => x.id == eid);
  if(!g) return;
  id('guruId').value = g.id;
  id('guruName').value = g.name;
  id('guruNip').value = g.nip || '';
  id('guruSubj').value = g.subject || '';
  id('guruHomeroom').value = g.homeroom || '';
  id('guruPhone').value = g.phone || '';
  id('guruEmail').value = g.email || '';
  id('guruMdlTitle').textContent = 'Edit Guru';
  openMdl('guruMdl');
}

async function saveGuru(e){
  e.preventDefault(); 
  const eid = id('guruId').value;
  const data = {
    name: id('guruName').value.trim(),
    nip: id('guruNip').value.trim() || null,
    subject: id('guruSubj').value.trim() || null,
    homeroom: id('guruHomeroom').value.trim() || null,
    phone: id('guruPhone').value.trim() || null,
    email: id('guruEmail').value.trim() || null
  };

  if(!data.name) return showToast('Nama wajib diisi!','warning');

  let error;
  if(eid){
    const { error: e } = await supabase.from('teachers').update(data).eq('id', eid);
    error = e;
  } else {
    const { error: e } = await supabase.from('teachers').insert([data]);
    error = e;
  }

  if (error) {
    showToast('Gagal menyimpan: ' + error.message, 'error');
  } else {
    showToast(`Guru ${eid?'diperbarui':'ditambahkan'}!`,'success');
    closeMdl('guruMdl'); guru();
  }
}

async function delGuru(eid,name){
  if(!confirm(`Hapus guru "${name}"?`)) return;
  const { error } = await supabase.from('teachers').delete().eq('id', eid);
  if (!error) {
    showToast('Dihapus','success'); guru();
  } else {
    showToast('Gagal menghapus: ' + error.message, 'error');
  }
}

let kelasListCache = [];
let kelasStudentsMap = {};

async function kelas(){
  setHdr('Manajemen Kelas','Kelola kelas, tingkat & ruangan');
  classesMap = {}; // Reset cache agar nama kelas selalu fresh

  // Show loading
  const cardsEl = id('kelasCards');
  const statsEl = id('kelasStats');
  if(cardsEl) cardsEl.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem"><div class="spin" style="margin:auto"></div><div class="t3 tsm" style="margin-top:1rem">Memuat data kelas & siswa...</div></div>`;

  // Fetch classes and students in parallel
  const [clsRes, stuRes] = await Promise.all([
    supabase.from('classes').select('*').order('name'),
    supabase.from('students').select('*').order('name')
  ]);

  const classes = Array.isArray(clsRes.data) ? clsRes.data : [];
  const students = Array.isArray(stuRes.data) ? stuRes.data : [];

  kelasListCache = classes;

  // Group students by class_id
  kelasStudentsMap = {};
  students.forEach(s => {
    const cid = s.class_id;
    if(!cid) return;
    if(!kelasStudentsMap[cid]) kelasStudentsMap[cid] = [];
    kelasStudentsMap[cid].push(s);
  });

  // Count unassigned students
  const unassigned = students.filter(s => !s.class_id);

  renderKelasStats(classes, students, unassigned);
  renderKelasCards(classes);
}

function renderKelasStats(classes, students, unassigned) {
  const el = id('kelasStats'); if(!el) return;
  const activeCount = classes.filter(c => c.active).length;
  const totalStudents = students.length;

  el.innerHTML = `
    <div class="card fcen" style="padding:1.2rem;flex-direction:column;text-align:center;background:linear-gradient(135deg,var(--v3),#fff);border:1.5px solid var(--v2)">
      <div style="width:42px;height:42px;background:var(--v);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:.6rem;box-shadow:0 4px 12px rgba(99,102,241,0.25)">
        <img src="image/home.png" style="width:1.3rem;height:1.3rem;filter:brightness(10)">
      </div>
      <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.6rem;color:var(--v)">${classes.length}</div>
      <div class="tsm t2" style="font-weight:600">Total Kelas</div>
    </div>
    <div class="card fcen" style="padding:1.2rem;flex-direction:column;text-align:center;background:linear-gradient(135deg,#ecfdf5,#fff);border:1.5px solid #a7f3d0">
      <div style="width:42px;height:42px;background:var(--grn);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:.6rem;box-shadow:0 4px 12px rgba(16,185,129,0.25)">
        <img src="image/user.png" style="width:1.3rem;height:1.3rem;filter:brightness(10)">
      </div>
      <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.6rem;color:var(--grn)">${totalStudents}</div>
      <div class="tsm t2" style="font-weight:600">Total Siswa</div>
    </div>
    <div class="card fcen" style="padding:1.2rem;flex-direction:column;text-align:center;background:linear-gradient(135deg,#fef3c7,#fff);border:1.5px solid #fcd34d">
      <div style="width:42px;height:42px;background:var(--amb);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:.6rem;box-shadow:0 4px 12px rgba(245,158,11,0.25)">
        <img src="image/info.png" style="width:1.3rem;height:1.3rem;filter:brightness(10)">
      </div>
      <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.6rem;color:var(--amb)">${unassigned.length}</div>
      <div class="tsm t2" style="font-weight:600">Belum Ada Kelas</div>
    </div>
  `;
}

function renderKelasCards(classes) {
  const el = id('kelasCards'); if(!el) return;

  if(!classes.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--tx3)">
      <div style="font-size:3rem;margin-bottom:1rem">🏫</div>
      <div style="font-weight:700;font-size:1.1rem;margin-bottom:.4rem">Belum ada kelas</div>
      <div class="tsm">Klik "Tambah Kelas" untuk menambahkan kelas baru</div>
    </div>`;
    return;
  }

  el.innerHTML = classes.map(c => {
    const stu = kelasStudentsMap[c.id] || [];
    const maleCount = stu.filter(s => s.gender === 'L').length;
    const femaleCount = stu.filter(s => s.gender === 'P').length;
    const fillPct = c.capacity ? Math.min(Math.round((stu.length / c.capacity) * 100), 100) : 0;
    const fillColor = fillPct > 90 ? 'var(--red)' : fillPct > 70 ? 'var(--amb)' : 'var(--grn)';

    return `<div class="card kelas-card" style="overflow:hidden;border-radius:1rem;box-shadow:var(--s2);border:1px solid var(--brd);transition:all .3s ease">
      <div style="padding:1.2rem 1.2rem .8rem;background:linear-gradient(135deg,var(--v),var(--v1));color:#fff;position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;background:rgba(255,255,255,0.08);border-radius:50%"></div>
        <div style="position:absolute;bottom:-30px;right:30px;width:60px;height:60px;background:rgba(255,255,255,0.05);border-radius:50%"></div>
        <div class="fbet" style="position:relative;z-index:1">
          <div>
            <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.2rem;margin-bottom:.2rem">${c.name}</div>
            <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
              <span class="bdg" style="background:rgba(255,255,255,0.2);color:#fff;font-size:.7rem;backdrop-filter:blur(4px)">${c.grade || '—'}</span>
              ${c.major ? `<span class="bdg" style="background:rgba(255,255,255,0.2);color:#fff;font-size:.7rem;backdrop-filter:blur(4px)">${c.major}</span>` : ''}
              <span class="bdg" style="background:rgba(255,255,255,0.15);color:#fff;font-size:.7rem">${c.active?'✓ Aktif':'✕ Nonaktif'}</span>
            </div>
          </div>
          <div class="flex gap1">
            <button class="btn btn-xs" style="background:rgba(255,255,255,0.2);color:#fff;border:1px solid rgba(255,255,255,0.3);backdrop-filter:blur(4px)" onclick="editKelas('${c.id}')" title="Edit">
              <img src="image/info.png" style="width:1em;height:1em;filter:brightness(10)">
            </button>
            <button class="btn btn-xs" style="background:rgba(244,63,94,0.8);color:#fff;border:1px solid rgba(255,255,255,0.2)" onclick="delKelas('${c.id}','${(c.name||'').replace(/'/g,"\\\\'")}')" title="Hapus">
              <img src="image/trash.png" style="width:1em;height:1em;filter:brightness(10)">
            </button>
          </div>
        </div>
      </div>

      <div style="padding:.8rem 1.2rem;display:grid;grid-template-columns:1fr 1fr;gap:.5rem;border-bottom:1px solid var(--brd);background:var(--bg2)">
        <div class="flex gap1" style="align-items:center">
          <img src="image/home.png" style="width:1em;height:1em;opacity:.5">
          <span class="tsm t2">${c.room || 'Belum diatur'}</span>
        </div>
        <div class="flex gap1" style="align-items:center;justify-content:flex-end">
          <img src="image/users-alt.png" style="width:1em;height:1em;opacity:.5">
          <span class="tsm" style="font-weight:700;color:var(--tx1)">${stu.length}<span class="t3">/${c.capacity||36}</span></span>
        </div>
      </div>

      <div style="padding:.6rem 1.2rem;border-bottom:1px solid var(--brd)">
        <div class="fbet tsm mb1">
          <span class="t3">Terisi</span>
          <span style="font-weight:700;color:${fillColor}">${fillPct}%</span>
        </div>
        <div class="prog-track" style="height:6px;border-radius:3px">
          <div class="prog-fill" style="width:${fillPct}%;background:${fillColor};border-radius:3px;transition:width .6s ease"></div>
        </div>
        <div class="flex gap1 tsm t3" style="margin-top:.4rem;justify-content:space-between">
          <span><strong>${maleCount}</strong> Laki-laki</span>
          <span><strong>${femaleCount}</strong> Perempuan</span>
        </div>
      </div>

      <div>
        <button class="kelas-toggle-btn" onclick="toggleKelasStudents('${c.id}', this)" style="width:100%;padding:.7rem 1.2rem;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:.85rem;font-weight:600;color:var(--v);transition:background .2s">
          <span><img src="image/user.png" style="width:1em;height:1em;vertical-align:middle;margin-right:.3rem"> Daftar Siswa (${stu.length})</span>
          <span class="kelas-chevron" style="transition:transform .3s;display:inline-block">▾</span>
        </button>
        <div id="kelasStu-${c.id}" class="kelas-students-wrap" style="max-height:0;overflow:hidden;transition:max-height .4s ease">
          ${stu.length ? `
            <div style="padding:0 1rem .8rem">
              <table style="width:100%;border-collapse:collapse;font-size:.82rem">
                <thead>
                  <tr style="background:var(--bg2)">
                    <th style="padding:.5rem .6rem;text-align:left;font-weight:700;color:var(--tx2);border-bottom:1px solid var(--brd)">No</th>
                    <th style="padding:.5rem .6rem;text-align:left;font-weight:700;color:var(--tx2);border-bottom:1px solid var(--brd)">Nama Siswa</th>
                    <th style="padding:.5rem .6rem;text-align:left;font-weight:700;color:var(--tx2);border-bottom:1px solid var(--brd)">NISN</th>
                    <th style="padding:.5rem .6rem;text-align:center;font-weight:700;color:var(--tx2);border-bottom:1px solid var(--brd)">JK</th>
                    <th style="padding:.5rem .6rem;text-align:left;font-weight:700;color:var(--tx2);border-bottom:1px solid var(--brd)">Telepon</th>
                  </tr>
                </thead>
                <tbody>
                  ${stu.map((s,i) => `<tr style="border-bottom:1px solid var(--brd);transition:background .15s" onmouseenter="this.style.background='var(--bg2)'" onmouseleave="this.style.background='transparent'">
                    <td style="padding:.5rem .6rem;color:var(--tx3)">${i+1}</td>
                    <td style="padding:.5rem .6rem;font-weight:600">${s.name}</td>
                    <td style="padding:.5rem .6rem;color:var(--tx2);font-family:monospace;font-size:.8rem">${s.nisn||'—'}</td>
                    <td style="padding:.5rem .6rem;text-align:center"><span class="bdg bn">${s.gender||'—'}</span></td>
                    <td style="padding:.5rem .6rem;color:var(--tx2)">${s.phone||'—'}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div style="padding:1.5rem;text-align:center;color:var(--tx3)">
              <div style="font-size:1.5rem;margin-bottom:.5rem;opacity:.5">👤</div>
              <div class="tsm">Belum ada siswa di kelas ini</div>
            </div>
          `}
        </div>
      </div>
    </div>`;
  }).join('');
}

function toggleKelasStudents(classId, btn) {
  const wrap = id('kelasStu-' + classId);
  if(!wrap) return;
  const chevron = btn.querySelector('.kelas-chevron');
  const isOpen = wrap.style.maxHeight !== '0px' && wrap.style.maxHeight !== '';
  
  if(isOpen) {
    wrap.style.maxHeight = '0px';
    if(chevron) chevron.style.transform = 'rotate(0deg)';
  } else {
    wrap.style.maxHeight = wrap.scrollHeight + 'px';
    if(chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

function filterKelas(val) {
  if(!val) return renderKelasCards(kelasListCache);
  const v = val.toLowerCase();
  renderKelasCards(kelasListCache.filter(c => 
    (c.name||'').toLowerCase().includes(v) || 
    (c.grade||'').toLowerCase().includes(v) || 
    (c.major||'').toLowerCase().includes(v) ||
    (c.room||'').toLowerCase().includes(v)
  ));
}


function addKelas() {
  id('kelasForm').reset();
  id('kelasId').value = '';
  id('kelasMdlTitle').textContent = 'Tambah Kelas';
  openMdl('kelasMdl');
}

async function editKelas(eid) {
  const { data: c } = await supabase.from('classes').select('*').eq('id', eid).single();
  if(!c) return;
  id('kelasId').value = c.id;
  id('kelasName').value = c.name;
  id('kelasGrade').value = c.grade || 'X';
  id('kelasMajor').value = c.major || 'Umum';
  id('kelasRoom').value = c.room || '';
  id('kelasCap').value = c.capacity || 36;
  id('kelasMdlTitle').textContent = 'Edit Kelas';
  openMdl('kelasMdl');
}

async function saveKelas(e){
  e.preventDefault(); 
  const eid = id('kelasId').value;
  const data = {
    name: id('kelasName').value.trim(),
    grade: id('kelasGrade').value,
    major: id('kelasMajor').value,
    room: id('kelasRoom').value.trim(),
    capacity: parseInt(id('kelasCap').value) || 36
  };

  if(!data.name) return showToast('Nama kelas wajib diisi!','warning');

  let error;
  if(eid){
    const { error: e } = await supabase.from('classes').update(data).eq('id', eid);
    error = e;
  } else {
    const { error: e } = await supabase.from('classes').insert([data]);
    error = e;
  }

  if (error) {
    showToast('Gagal menyimpan: ' + error.message, 'error');
  } else {
    showToast(`Kelas ${eid?'diperbarui':'ditambahkan'}!`,'success'); 
    closeMdl('kelasMdl'); kelas();
  }
}

async function delKelas(eid,name){
  if(!confirm(`Hapus kelas "${name}"?`)) return;
  const { error } = await supabase.from('classes').delete().eq('id', eid);
  if (!error) {
    showToast('Dihapus','success'); kelas();
  } else {
    showToast('Gagal menghapus: ' + error.message, 'error');
  }
}

let mapelList = [];
async function mapel(){
  setHdr('Mata Pelajaran','Kelola daftar mata pelajaran');
  const { data, error } = await supabase.from('subjects').select('*').order('name');
  mapelList = Array.isArray(data) ? data : [];
  const grid = id('mapelGrid'); if(!grid) return;
  grid.innerHTML = mapelList.map(s => `
    <div class="card" style="padding:1.2rem;display:flex;flex-direction:column;gap:1rem;border-radius:1rem;box-shadow:var(--s1);border:1px solid var(--brd);transition:transform 0.2s;cursor:pointer" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
      <div class="fbet">
        <div style="width:48px;height:48px;border-radius:12px;background:${s.color||'#6366f1'}22;display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;box-shadow:inset 0 0 0 1px ${s.color||'#6366f1'}44">${s.emoji||'<img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle">'}</div>
        <div class="flex gap1">
          <button class="btn btn-xs btn-out" onclick="editMapel('${s.id}')"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:brightness(0.5)"></button>
          <button class="btn btn-xs btn-red" onclick="delMapel('${s.id}','${(s.name||'').replace(/'/g,"\\'")}')"><img src="image/trash.png" style="width:1.2em;height:1.2em;vertical-align:middle"></button>
        </div>
      </div>
      <div>
        <div style="font-weight:800;font-size:1.1rem;color:var(--tx1)">${s.name}</div>
        ${s.code ? `<div class="bdg mt1" style="background:${s.color||'#6366f1'}15;color:${s.color||'#6366f1'};border:1px solid ${s.color||'#6366f1'}44;font-family:monospace">${s.code}</div>` : ''}
      </div>
    </div>`).join('') || `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--tx3)"><div style="font-size:3rem;margin-bottom:1rem;opacity:0.5">📚</div><div style="font-weight:700;font-size:1.1rem">Belum ada mata pelajaran</div></div>`;
}

function addMapel() {
  id('mapelForm').reset();
  id('mapelId').value = '';
  id('mapelMdlTitle').textContent = 'Tambah Mata Pelajaran';
  openMdl('mapelMdl');
}

function editMapel(eid) {
  const m = mapelList.find(x => x.id == eid);
  if(!m) return;
  id('mapelId').value = m.id;
  id('mapelName').value = m.name;
  id('mapelCode').value = m.code || '';
  id('mapelEmoji').value = m.emoji || '';
  id('mapelColor').value = m.color || '#6366f1';
  id('mapelMdlTitle').textContent = 'Edit Mata Pelajaran';
  openMdl('mapelMdl');
}

async function saveMapel(e){
  e.preventDefault();
  const eid = id('mapelId').value;
  const data = {
    name: id('mapelName').value.trim(),
    code: id('mapelCode').value.trim().toUpperCase(),
    emoji: id('mapelEmoji').value.trim() || '📚',
    color: id('mapelColor').value
  };

  if(!data.name) return showToast('Nama wajib diisi!','warning');
  
  let error;
  if(eid){
    const { error: e } = await supabase.from('subjects').update(data).eq('id', eid);
    error = e;
  } else {
    const { error: e } = await supabase.from('subjects').insert([data]);
    error = e;
  }

  if (!error) {
    showToast(`Mapel ${eid?'diperbarui':'ditambahkan'}!`,'success'); closeMdl('mapelMdl'); mapel();
  } else {
    showToast('Gagal menyimpan: ' + error.message, 'error');
  }
}

async function delMapel(eid,name){
  if(!confirm(`Hapus "${name}"?`)) return;
  const { error } = await supabase.from('subjects').delete().eq('id', eid);
  if (!error) {
    showToast('Dihapus','success'); mapel();
  } else {
    showToast('Gagal menghapus: ' + error.message, 'error');
  }
}
