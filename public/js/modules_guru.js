/* ═══════════════════════════════════════════════
   SiAbsen SMK — Guru Modules  (modules_guru.js)
   ═══════════════════════════════════════════════ */

// ── AGENDA MENGAJAR (JURNAL) ───────────────────────────
async function jurnal() {
  setHdr('Agenda Mengajar', 'Catatan aktivitas KBM');
  const sel = id('jurCls');
  if (sel && sel.options.length <= 1) await fillClassSel('jurCls', true);
  await fetchJournals();
}

async function fetchJournals() {
  const tbody = id('journalTbody'); if (!tbody) return;
  const clsId = id('jurCls').value;
  const date = id('jurDate').value ? id('jurDate').value.replace(/-/g, '_') : '';
  const tId = await getTeacherId();
  if (!tId && App.profile.role !== 'admin') return; // Only allow if mapped or admin

  let query = supabase
    .from('teaching_journals')
    .select('*')
    .order('created_at', { ascending: false });

  if (tId) query = query.eq('teacher_id', tId);

  if (clsId) query = query.eq('class_id', clsId);
  if (date) query = query.eq('date_key', date);

  const { data: rows, error } = await query;
  if (error) return console.error('Fetch journals error:', error);
  if (!Array.isArray(rows)) return;

  tbody.innerHTML = rows.map(j => `<tr>
    <td class="t2 tsm">${j.date_key.replace(/_/g, '-')}</td>
    <td class="tb7">${j.class_name}</td>
    <td class="t2">${j.subject_name}</td>
    <td style="max-width:300px; font-size:0.85rem">${j.material}</td>
    <td class="t3 txs">${j.notes || '—'}</td>
    <td>
      <div class="flex gap1">
        <button class="btn btn-xs btn-out" onclick="editJournal(${j.id})">Edit</button>
        <button class="btn btn-xs btn-red" onclick="deleteJournal(${j.id})"><span style="font-weight:bold;margin:0 4px">✕</span></button>
      </div>
    </td>
  </tr>`).join('') || `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--tx3)">Belum ada agenda mengajar</td></tr>`;
}

async function deleteJournal(jid) {
  if (!confirm('Hapus agenda ini?')) return;
  const { error } = await supabase.from('teaching_journals').delete().eq('id', jid);
  if (!error) {
    showToast('Agenda dihapus', 'success');
    fetchJournals();
  } else {
    showToast('Gagal menghapus: ' + error.message, 'error');
  }
}

async function addJournal() {
  id('jurnalForm').reset();
  id('jurId').value = '';
  const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  id('jurFormDate').value = d.toISOString().split('T')[0];
  id('jurnalMdlTitle').textContent = 'Agenda Mengajar Baru';

  await fillClassSel('jurFormCls');
  await fillSubjSel('jurFormSub');
  openMdl('jurnalMdl');
}

async function editJournal(jid) {
  const { data: j, error } = await supabase
    .from('teaching_journals')
    .select('*')
    .eq('id', jid)
    .single();

  if (error || !j) return showToast('Agenda tidak ditemukan', 'error');

  id('jurId').value = j.id;
  id('jurFormDate').value = j.date_key.replace(/_/g, '-');
  await fillClassSel('jurFormCls');
  await fillSubjSel('jurFormSub');
  id('jurFormCls').value = j.class_id;
  id('jurFormSub').value = j.subject_id;
  id('jurMaterial').value = j.material;
  id('jurNotes').value = j.notes;

  id('jurnalMdlTitle').textContent = 'Edit Agenda Mengajar';
  openMdl('jurnalMdl');
}

async function saveJournal(e) {
  e.preventDefault();
  const jid = id('jurId').value;
  const clsEl = id('jurFormCls');
  const subEl = id('jurFormSub');
  const tId = await getTeacherId();
  if (!tId) return showToast('Data guru tidak ditemukan untuk akun Anda', 'error');

  const data = {
    teacher_id: tId,
    teacher_name: App.profile.name,
    class_id: parseInt(clsEl.value),
    class_name: clsEl.options[clsEl.selectedIndex].text,
    subject_id: parseInt(subEl.value),
    subject_name: subEl.options[subEl.selectedIndex].text,
    date_key: id('jurFormDate').value.replace(/-/g, '_'),
    material: id('jurMaterial').value.trim(),
    notes: id('jurNotes').value.trim(),
    created_at: new Date().toISOString()
  };

  let res;
  if (jid) {
    res = await supabase.from('teaching_journals').update(data).eq('id', jid);
  } else {
    res = await supabase.from('teaching_journals').insert([data]);
  }

  if (!res.error) {
    showToast('Agenda berhasil disimpan!', 'success');
    closeMdl('jurnalMdl');
    fetchJournals();
  } else {
    showToast('Gagal menyimpan agenda: ' + res.error.message, 'error');
  }
}

// ── JADWAL PELAJARAN ────────────────────────────────────
const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const DAY_COLORS = ['bn', 'bv', 'bb', 'bg', 'ba', 'bp', 'bs', 'bn'];

let schList = [];
let schPage = 1, schPerPage = 10;

async function jadwal() {
  setHdr('Jadwal Pelajaran', 'Kelola jadwal kegiatan belajar mengajar');

  // Populate filter selects (only on first load)
  const schClsSel = id('schClass');
  if (schClsSel && schClsSel.options.length <= 1) await fillClassSel('schClass', true);
  const schTchSel = id('schTeacher');
  if (schTchSel && schTchSel.options.length <= 1) await fillTeacherSel('schTeacher', true);

  await fetchSchedules();
}

async function fillTeacherSel(selId, inclAll = false) {
  const { data: teachers, error } = await supabase
    .from('teachers')
    .select('*')
    .order('name', { ascending: true });

  const el = id(selId); if (!el) return;
  el.innerHTML = inclAll ? '<option value="">— Semua Guru —</option>' : '<option value="">— Pilih Guru —</option>';
  if (Array.isArray(teachers)) {
    teachers.forEach(t => { el.innerHTML += `<option value="${t.id}">${t.name}${t.subject ? ' (' + t.subject + ')' : ''}</option>`; });
  }
}

async function fetchSchedules() {
  const tbody = id('scheduleTbody'); if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;

  const role = App.profile.role;
  const isAdmin = role === 'admin';

  // Build query with related data including teachers
  let query = supabase.from('teaching_schedules').select('*, classes(name), subjects(name), teachers(name, subject)');

  // Apply filters
  const filterCls = id('schClass')?.value;
  const filterDay = id('schDay')?.value;
  const filterTch = id('schTeacher')?.value;

  if (filterCls) query = query.eq('class_id', filterCls);
  if (filterDay !== '' && filterDay !== undefined) query = query.eq('day', parseInt(filterDay));
  if (filterTch) query = query.eq('teacher_id', filterTch);

  // For non-admin, scope to their context
  if (role === 'siswa') {
    let stuNisn = App.user?.user_metadata?.nisn;
    let stuQuery = supabase.from('students').select('class_id');

    if (stuNisn) stuQuery = stuQuery.eq('nisn', stuNisn);
    else stuQuery = stuQuery.eq('user_id', App.profile.id);

    const { data: stu } = await stuQuery.single();
    if (!stu?.class_id) return tbody.innerHTML = '<tr><td colspan="6" class="fcen p2" style="color:var(--tx3)">Kelas belum diatur (atau NISN tidak ditemukan)</td></tr>';
    query = query.eq('class_id', stu.class_id);
  } else if (role === 'guru') {
    let guruNip = App.user?.user_metadata?.nip;
    let guruQuery = supabase.from('teachers').select('id, subject');

    if (guruNip) guruQuery = guruQuery.eq('nip', guruNip);
    else guruQuery = guruQuery.eq('user_id', App.profile.id);

    const { data: guruData } = await guruQuery.maybeSingle();
    if (!guruData) return tbody.innerHTML = '<tr><td colspan="6" class="fcen p2" style="color:var(--tx3)">Data guru tidak ditemukan (NIP tidak cocok)</td></tr>';
    
    query = query.eq('teacher_id', guruData.id);
  }

  // Sort by day then start_time
  query = query.order('day').order('start_time');

  const { data: rows, error } = await query;
  if (error) { console.error('Fetch schedules error:', error); return; }
  if (!Array.isArray(rows)) return;

  schList = rows;
  schPage = 1;
  renderSchTable();
}

function renderSchTable() {
  const rows = schList;
  const tbody = id('scheduleTbody');
  const role = App.profile.role;
  const isAdmin = role === 'admin';

  // Render stats for admin
  if (isAdmin) {
    renderSchStats(rows);
  } else {
    const statsEl = id('schStats');
    if (statsEl) statsEl.innerHTML = '';
  }

  const schTableCard = id('schTableCard');
  const schCardsWrap = id('schCardsWrap');

  if (role === 'siswa') {
    if (schTableCard) schTableCard.style.display = 'none';
    if (schCardsWrap) {
      schCardsWrap.style.display = 'flex';
      schCardsWrap.style.flexDirection = 'column';
      schCardsWrap.style.gap = '1rem';
      schCardsWrap.classList.remove('g3');
    }
  } else {
    if (schTableCard) schTableCard.style.display = 'block';
    if (schCardsWrap) schCardsWrap.style.display = 'none';
  }

  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / schPerPage);
  if (schPage > totalPages && totalPages > 0) schPage = totalPages;
  const startIdx = (schPage - 1) * schPerPage;
  const pagedList = rows.slice(startIdx, startIdx + schPerPage);

  renderSchPagination(totalItems);

  if (!pagedList.length) {
    if (role === 'siswa' && schCardsWrap) {
      schCardsWrap.innerHTML = `<div class="card fcen" style="padding:2rem;color:var(--tx3);width:100%">Belum ada jadwal pelajaran</div>`;
    }
    if (tbody) tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--tx3)">Belum ada jadwal pelajaran</td></tr>`;
    return;
  }

  if (role === 'siswa' && schCardsWrap) {
    const styleTag = `
      <style>
        .sch-list-card {
          display: flex;
          flex-direction: column;
          border: 1.5px solid var(--brd);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--s1);
          background: var(--card);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sch-list-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--s2);
        }
        .sch-list-h {
          background: var(--bg2);
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid var(--brd);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sch-list-b {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sch-list-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        @media (min-width: 801px) {
          .sch-list-card {
            flex-direction: row;
            align-items: stretch;
          }
          .sch-list-h {
            border-bottom: none;
            border-right: 1px solid var(--brd);
            flex-direction: column;
            justify-content: center;
            min-width: 140px;
            gap: 0.5rem;
          }
          .sch-list-b {
            flex-direction: row;
            align-items: center;
            flex: 1;
            justify-content: space-between;
          }
          .sch-list-info {
            flex: 1;
            padding-right: 1rem;
          }
          .sch-list-teacher {
            min-width: 200px;
            margin-bottom: 0 !important;
          }
          .sch-list-b .btn-amb {
            width: auto;
            flex-shrink: 0;
            padding: 0.6rem 1.5rem;
          }
        }
      </style>
    `;

    schCardsWrap.innerHTML = styleTag + pagedList.map(s => {
      const dayName = DAYS[s.day] || '—';
      const teacherName = s.teachers?.name || '—';
      const teacherSubj = s.teachers?.subject || '';
      const className = s.classes?.name || '—';
      const subjName = s.subjects?.name || '—';
      const startTime = s.start_time ? s.start_time.slice(0, 5) : '—';
      const endTime = s.end_time ? s.end_time.slice(0, 5) : '—';

      return `<div class="sch-list-card">
        <div class="sch-list-h">
          <span class="bdg ${DAY_COLORS[s.day] || 'bn'}">${dayName}</span>
          <span class="tb7" style="color:var(--v);font-size:.9rem">${startTime} - ${endTime}</span>
        </div>
        <div class="sch-list-b">
          <div class="sch-list-info">
            <div style="font-size:1.15rem;font-weight:800;color:var(--tx1);">${subjName}</div>
            <div class="t3 txs" style="font-weight:600;">Kelas: ${className}</div>
          </div>
          
          <div class="flex gap1 sch-list-teacher" style="align-items:center;margin-bottom:1.2rem;">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--v),var(--v1));display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <img src="image/graduation-cap.png" style="width:1.1em;height:1.1em;filter:brightness(10)">
            </div>
            <div>
              <div style="font-weight:700;font-size:.85rem;color:var(--tx1)">${teacherName}</div>
              ${teacherSubj ? `<div class="t3 txs">${teacherSubj}</div>` : ''}
            </div>
          </div>
          
          <button class="btn btn-amb wf" style="justify-content:center;border-radius:100px" onclick="startQRScanner(${s.id}, ${s.subject_id}, ${s.class_id}, '${subjName}', '${className}')">
            <img src="image/camera.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Absen QR
          </button>
        </div>
      </div>`;
    }).join('');
  } else {
    if (tbody) tbody.innerHTML = pagedList.map(s => {
      const dayName = DAYS[s.day] || '—';
      const teacherName = s.teachers?.name || '—';
      const teacherSubj = s.teachers?.subject || '';
      const className = s.classes?.name || '—';
      const subjName = s.subjects?.name || '—';
      const startTime = s.start_time ? s.start_time.slice(0, 5) : '—';
      const endTime = s.end_time ? s.end_time.slice(0, 5) : '—';

      const classCol = role !== 'siswa' ? `<td><span class="bdg bv">${className}</span></td>` : '';

      return `<tr>
        <td><span class="bdg ${DAY_COLORS[s.day] || 'bn'}">${dayName}</span></td>
        <td class="tb7">${startTime} - ${endTime}</td>
        ${classCol}
        <td>${subjName}</td>
        <td>
          <div style="display:flex;align-items:center;gap:.4rem">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--v),var(--v1));display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <img src="image/graduation-cap.png" style="width:.9em;height:.9em;filter:brightness(10)">
            </div>
            <div>
              <div style="font-weight:600;font-size:.82rem">${teacherName}</div>
              ${teacherSubj ? `<div class="t3 txs">${teacherSubj}</div>` : ''}
            </div>
          </div>
        </td>
        <td>
          <div class="flex gap1">
            ${isAdmin ? `
              <button class="btn btn-xs btn-out" onclick="editSchedule(${s.id})" title="Edit"><img src="image/settings (1).png" style="width:1em;height:1em;vertical-align:middle"></button>
              <button class="btn btn-xs btn-red" onclick="delSchedule(${s.id})" title="Hapus"><img src="image/trash.png" style="width:1em;height:1em;vertical-align:middle"></button>
            ` : role === 'guru' ? `
              <button class="btn btn-xs btn-pri" onclick="generateQR(${s.id}, '${subjName}', '${className}')"><img src="image/camera.png" style="width:1em;height:1em;vertical-align:middle"> Tampilkan QR</button>
              <button class="btn btn-xs btn-out" onclick="goToInputPresensi(${s.class_id}, ${s.subject_id}, ${s.day})"><img src="image/add-document.png" style="width:1em;height:1em;vertical-align:middle"> Input Presensi</button>
            ` : ''}
          </div>
        </td>
      </tr>`;
    }).join('');
  }
}

function renderSchPagination(totalItems) {
  const container = id('schPagination');
  if(!container) return;
  const totalPages = Math.ceil(totalItems / schPerPage);
  if(totalPages <= 1) { container.innerHTML = ''; return; }
  
  let html = `<button ${schPage === 1 ? 'disabled' : ''} onclick="changeSchPage(${schPage - 1})">Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= schPage - 1 && i <= schPage + 1)) {
      html += `<button class="${i === schPage ? 'active' : ''}" onclick="changeSchPage(${i})">${i}</button>`;
    } else if (i === schPage - 2 || i === schPage + 2) {
      html += `<span style="padding:0 5px;color:var(--tx2)">...</span>`;
    }
  }
  html += `<button ${schPage === totalPages ? 'disabled' : ''} onclick="changeSchPage(${schPage + 1})">Next</button>`;
  container.innerHTML = html.replace(/(<span[^>]*>\.\.\.<\/span>)+/g, '<span style="padding:0 5px;color:var(--tx2)">...</span>');
}

function changeSchPage(p) {
  schPage = p;
  renderSchTable();
}

function goToInputPresensi(classId, subjectId, day) {
  window._absensiPrefill = { classId, subjectId, day };
  navigateTo('absensi');
}

function renderSchStats(rows) {
  const el = id('schStats'); if (!el) return;
  const uniqueClasses = new Set(rows.map(r => r.class_id));
  const uniqueTeachers = new Set(rows.map(r => r.teacher_id));
  const uniqueSubjects = new Set(rows.map(r => r.subject_id));

  el.innerHTML = `
    <div class="card fcen" style="padding:1rem;flex-direction:column;text-align:center;background:linear-gradient(135deg,var(--v3),#fff);border:1.5px solid var(--v2)">
      <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.5rem;color:var(--v)">${rows.length}</div>
      <div class="tsm t2" style="font-weight:600">Total Jadwal</div>
    </div>
    <div class="card fcen" style="padding:1rem;flex-direction:column;text-align:center;background:linear-gradient(135deg,#ecfdf5,#fff);border:1.5px solid #a7f3d0">
      <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.5rem;color:var(--grn)">${uniqueClasses.size}</div>
      <div class="tsm t2" style="font-weight:600">Kelas Terjadwal</div>
    </div>
    <div class="card fcen" style="padding:1rem;flex-direction:column;text-align:center;background:linear-gradient(135deg,#fef3c7,#fff);border:1.5px solid #fcd34d">
      <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.5rem;color:var(--amb)">${uniqueTeachers.size}</div>
      <div class="tsm t2" style="font-weight:600">Guru Aktif</div>
    </div>
    <div class="card fcen" style="padding:1rem;flex-direction:column;text-align:center;background:linear-gradient(135deg,#fdf2f8,#fff);border:1.5px solid #fbcfe8">
      <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:1.5rem;color:var(--pnk)">${uniqueSubjects.size}</div>
      <div class="tsm t2" style="font-weight:600">Mata Pelajaran</div>
    </div>
  `;
}

async function addSchedule() {
  if (App.profile.role !== 'admin') {
    return showToast('Hanya admin yang dapat menambahkan jadwal', 'warning');
  }
  id('schForm').reset();
  id('schId').value = '';
  id('schMdlTitle').textContent = 'Tambah Jadwal Pelajaran';

  await fillClassSel('schFormClass');
  await fillSubjSel('schFormSubj');
  await fillTeacherSel('schFormTeacher');
  openMdl('schMdl');
}

async function editSchedule(eid) {
  const { data: s, error } = await supabase
    .from('teaching_schedules')
    .select('*')
    .eq('id', eid)
    .single();
  if (error || !s) return showToast('Jadwal tidak ditemukan', 'error');

  id('schId').value = s.id;
  id('schFormDay').value = s.day;
  await fillClassSel('schFormClass');
  await fillSubjSel('schFormSubj');
  await fillTeacherSel('schFormTeacher');
  id('schFormClass').value = s.class_id;
  id('schFormSubj').value = s.subject_id;
  id('schFormTeacher').value = s.teacher_id;
  id('schFormStart').value = s.start_time ? s.start_time.slice(0, 5) : '';
  id('schFormEnd').value = s.end_time ? s.end_time.slice(0, 5) : '';
  id('schMdlTitle').textContent = 'Edit Jadwal Pelajaran';
  openMdl('schMdl');
}

async function saveSchedule(e) {
  e.preventDefault();
  const eid = id('schId').value;
  const data = {
    day: parseInt(id('schFormDay').value),
    class_id: parseInt(id('schFormClass').value),
    subject_id: parseInt(id('schFormSubj').value),
    teacher_id: parseInt(id('schFormTeacher').value),
    start_time: id('schFormStart').value,
    end_time: id('schFormEnd').value
  };

  if (isNaN(data.day)) return showToast('Pilih hari!', 'warning');
  if (!data.class_id) return showToast('Pilih kelas!', 'warning');
  if (!data.subject_id) return showToast('Pilih mata pelajaran!', 'warning');
  if (!data.teacher_id) return showToast('Pilih guru pengajar!', 'warning');
  if (!data.start_time || !data.end_time) return showToast('Isi jam mulai & selesai!', 'warning');
  if (data.start_time >= data.end_time) return showToast('Jam selesai harus setelah jam mulai!', 'warning');

  let res;
  if (eid) {
    res = await supabase.from('teaching_schedules').update(data).eq('id', eid);
  } else {
    res = await supabase.from('teaching_schedules').insert([data]);
  }

  if (!res.error) {
    showToast(`Jadwal berhasil ${eid ? 'diperbarui' : 'ditambahkan'}!`, 'success');
    closeMdl('schMdl');
    fetchSchedules();
  } else {
    showToast('Gagal menyimpan: ' + res.error.message, 'error');
  }
}

async function delSchedule(eid) {
  if (!confirm('Hapus jadwal ini?')) return;
  const { error } = await supabase.from('teaching_schedules').delete().eq('id', eid);
  if (!error) {
    showToast('Jadwal dihapus', 'success');
    fetchSchedules();
  } else {
    showToast('Gagal menghapus: ' + error.message, 'error');
  }
}

// ── DASHBOARD GURU UPDATES ──────────────────────────────
async function updateGuruDash() {
  // Notifikasi Izin Pending
  let pc = 0;
  const tId = await getTeacherId();
  if (tId) {
    const { data: pData } = await supabase.from('permits').select('*').eq('status', 'pending');
    const listPending = Array.isArray(pData) ? pData : [];
    
    const { data: t } = await supabase.from('teachers').select('homeroom').eq('id', tId).single();
    const homeroomName = t?.homeroom || '';
    const { data: sch } = await supabase.from('teaching_schedules').select('day, classes(name)').eq('teacher_id', tId);
    
    pc = listPending.filter(p => {
       if (homeroomName && p.class_name === homeroomName) return true;
       if (!sch) return false;
       const classSchedules = sch.filter(s => s.classes?.name === p.class_name);
       if (classSchedules.length === 0) return false;
       const sDate = new Date(p.start_date);
       const eDate = new Date(p.end_date || p.start_date);
       const permitDays = new Set();
       let curr = new Date(sDate);
       while (curr <= eDate) { permitDays.add(curr.getDay()); curr.setDate(curr.getDate() + 1); }
       return classSchedules.some(s => permitDays.has(s.day));
    }).length;
  }

  const bdg = id('dashIzinBdg');
  if (bdg) {
    bdg.textContent = pc || 0;
    bdg.style.display = (pc && pc > 0) ? 'inline-block' : 'none';
  }

  // Jadwal Hari Ini
  const today = new Date().getDay();
  if (!tId) return;
  const { data: scheds, error: err2 } = await supabase
    .from('teaching_schedules')
    .select('*, classes(name), subjects(name)')
    .eq('teacher_id', tId)
    .eq('day', today);

  const list = id('dashScheduleList');
  if (list && Array.isArray(scheds)) {
    list.innerHTML = scheds.map(s => `
      <div class="flex fbet p1 mb1" style="background:var(--bg2); border-radius:0.8rem">
        <div>
          <div class="tb7" style="font-size:0.9rem">${s.subjects?.name || '—'}</div>
          <div class="t3 txs">${s.classes?.name || '—'}</div>
        </div>
        <div class="tb7" style="color:var(--v)">${s.start_time.slice(0, 5)}</div>
      </div>
    `).join('') || '<div class="t3 txs p1">Tidak ada jadwal hari ini</div>';
  }
}

// ── QR CODE ATTENDANCE ────────────────────────────────────
function generateQR(scheduleId, subjectName, className) {
  const container = id('qrCodeContainer');
  if (!container) return;

  container.innerHTML = '';

  const qrData = JSON.stringify({
    sch: scheduleId,
    d: new Date().toISOString().slice(0, 10)
  });

  new QRCode(container, {
    text: qrData,
    width: 250,
    height: 250,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  id('qrCodeDesc').innerHTML = `${subjectName} &bull; ${className}`;
  openMdl('qrGenMdl');
}

let html5QrcodeScanner = null;
let currentScanData = null;

function startQRScanner(scheduleId, subjectId, classId, subjectName, className) {
  currentScanData = { scheduleId, subjectId, classId, subjectName, className };
  openMdl('qrScanMdl');
  id('qrScanStatus').textContent = 'Arahkan kamera ke QR Code Guru';
  id('qrScanStatus').style.color = 'var(--v)';

  if (html5QrcodeScanner) return; // already running

  html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 }, false);

  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

function stopQRScanner() {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear().catch(error => console.error("Failed to clear html5QrcodeScanner. ", error));
    html5QrcodeScanner = null;
  }
  closeMdl('qrScanMdl');
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning
}

async function onScanSuccess(decodedText, decodedResult) {
  if (!currentScanData) return;

  try {
    const data = JSON.parse(decodedText);
    const todayStr = new Date().toISOString().slice(0, 10);

    if (data.sch !== currentScanData.scheduleId) {
      id('qrScanStatus').textContent = '❌ QR Code tidak cocok dengan mapel ini';
      id('qrScanStatus').style.color = 'var(--red)';
      return;
    }

    if (data.d !== todayStr) {
      id('qrScanStatus').textContent = '❌ QR Code kedaluwarsa (bukan untuk hari ini)';
      id('qrScanStatus').style.color = 'var(--red)';
      return;
    }

    // Stop scanner
    if (html5QrcodeScanner) {
      html5QrcodeScanner.clear();
      html5QrcodeScanner = null;
    }

    id('qrScanStatus').innerHTML = '<div class="spin"></div> Mencatat kehadiran...';
    id('qrScanStatus').style.color = 'var(--amb)';

    await recordMapelAttendance(currentScanData);

  } catch (e) {
    id('qrScanStatus').textContent = '❌ Format QR Code tidak valid';
    id('qrScanStatus').style.color = 'var(--red)';
    console.error("QR Parse Error", e);
  }
}

async function recordMapelAttendance(scanData) {
  const uid = App.profile?.id;
  if (!uid) return;

  try {
    const { data: stu } = await supabase.from('students').select('*').eq('user_id', uid).single();
    if (!stu) throw new Error("Data profil siswa tidak ditemukan");

    const dateKey = key();

    // Validate if already marked
    const { data: existing } = await supabase
      .from('attendance')
      .select('id')
      .eq('date_key', dateKey)
      .eq('student_user_id', uid)
      .eq('subject_key', scanData.subjectId)
      .maybeSingle();

    if (existing) {
      id('qrScanStatus').textContent = '✅ Anda sudah absen mapel ini sebelumnya!';
      id('qrScanStatus').style.color = 'var(--grn)';
      setTimeout(stopQRScanner, 2000);
      return;
    }

    // Get schedule to find teacher
    const { data: sch } = await supabase
      .from('teaching_schedules')
      .select('*, teachers(name)')
      .eq('id', scanData.scheduleId)
      .single();

    const now = Date.now();
    const status = 'hadir'; // default for QR scan

    const { error: attErr } = await supabase.from('attendance').insert([{
      date_key: dateKey,
      class_id: scanData.classId,
      class_name: scanData.className,
      student_id: stu.id,
      student_user_id: uid,
      name: stu.name,
      nisn: stu.nisn || '',
      subject_key: scanData.subjectId,
      subject: scanData.subjectName,
      status: status,
      time: now,
      teacher_id: sch?.teacher_id || null,
      teacher_name: sch?.teachers?.name || '',
      self_checkin: 1
    }]);

    if (attErr) throw attErr;

    await logAct('selfcheckin', `Absen mapel ${scanData.subjectName} via QR`);

    id('qrScanStatus').textContent = '✅ Berhasil Absen Mapel!';
    id('qrScanStatus').style.color = 'var(--grn)';
    showToast('Berhasil absen mata pelajaran!', 'success');

    setTimeout(stopQRScanner, 1500);

  } catch (err) {
    console.error(err);
    id('qrScanStatus').textContent = '❌ Gagal menyimpan absensi: ' + err.message;
    id('qrScanStatus').style.color = 'var(--red)';
    setTimeout(() => {
      // restart scanner if failed
      startQRScanner(scanData.scheduleId, scanData.subjectId, scanData.classId, scanData.subjectName, scanData.className);
    }, 3000);
  }
}
