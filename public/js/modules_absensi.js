/* ═══════════════════════════════════════════════════════════
   SiAbsen — Modul Absensi (Jadwal & Rekap)
   ═══════════════════════════════════════════════════════════ */

let rsList = [], rsIsSiswa = false, rsPage = 1, rsPerPage = 10;
let rmList = [], rmIsSiswa = false, rmPage = 1, rmPerPage = 10;

function renderRekapPagination(totalItems, perPage, currentPage, containerId, pageVar, renderFunc) {
  const container = id(containerId);
  if(!container) return;
  const totalPages = Math.ceil(totalItems / perPage);
  if(totalPages <= 1) { container.innerHTML = ''; return; }
  
  let html = `<button class="btn btn-xs btn-out" ${currentPage === 1 ? 'disabled' : ''} onclick="${pageVar}=${currentPage - 1};${renderFunc}()">Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<button class="btn btn-xs ${i === currentPage ? 'btn-pri' : 'btn-out'}" onclick="${pageVar}=${i};${renderFunc}()">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span style="padding:0 5px;color:var(--tx2)">...</span>`;
    }
  }
  html += `<button class="btn btn-xs btn-out" ${currentPage === totalPages ? 'disabled' : ''} onclick="${pageVar}=${currentPage + 1};${renderFunc}()">Next</button>`;
  container.innerHTML = html.replace(/(<span[^>]*>\.\.\.<\/span>)+/g, '<span style="padding:0 5px;color:var(--tx2)">...</span>');
}

function renderRS() {
  const tbody = rsIsSiswa ? document.querySelector('#pg-rekap #rekTbodySekolah') : document.querySelector('#pg-rekap_sekolah #rekTbodySekolah');
  if(!tbody) return;
  const total = rsList.length;
  const totalPages = Math.ceil(total / rsPerPage);
  if(rsPage > totalPages && totalPages > 0) rsPage = totalPages;
  const start = (rsPage - 1) * rsPerPage;
  const pagedList = rsList.slice(start, start + rsPerPage);

  renderRekapPagination(total, rsPerPage, rsPage, rsIsSiswa ? 'rekSiswaSekolahPagination' : 'rekSekolahPagination', 'rsPage', 'renderRS');

  if(rsIsSiswa) {
    if(!pagedList.length) tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:2rem;color:var(--tx3)">Anda belum memiliki riwayat absensi pagi pada rentang tanggal ini</td></tr>`;
    else tbody.innerHTML = pagedList.map(r=>`<tr>
      <td>${ftm(r.time)}</td>
      <td class="t2 txs">${r.teacher_name||'Sistem (AI)'}</td>
      <td>${mkBadge(r.status)}</td>
    </tr>`).join('');
  } else {
    if(!pagedList.length) tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--tx3)">Tidak ada data absensi sekolah pada tanggal yang dipilih</td></tr>`;
    else tbody.innerHTML = pagedList.map(r=>`<tr>
      <td style="font-weight:700">${r.name||'—'}</td>
      <td class="t2">${r.nisn||'—'}</td>
      <td><span class="bdg bb">${r.class_name||'—'}</span></td>
      <td style="font-weight:bold;color:var(--grn)">${r.hadir}</td>
      <td style="font-weight:bold;color:var(--amb)">${r.sakit}</td>
      <td style="font-weight:bold;color:var(--v)">${r.izin}</td>
      <td style="font-weight:bold;color:var(--red)">${r.alpha}</td>
      <td style="font-weight:bold;color:var(--pnk)">${r.terlambat}</td>
    </tr>`).join('');
  }
}

function renderRM() {
  const tbody = rmIsSiswa ? document.querySelector('#pg-rekap #rekTbodyMapel') : document.querySelector('#pg-rekap_mapel #rekTbodyMapel');
  if(!tbody) return;
  const total = rmList.length;
  const totalPages = Math.ceil(total / rmPerPage);
  if(rmPage > totalPages && totalPages > 0) rmPage = totalPages;
  const start = (rmPage - 1) * rmPerPage;
  const pagedList = rmList.slice(start, start + rmPerPage);

  renderRekapPagination(total, rmPerPage, rmPage, rmIsSiswa ? 'rekSiswaMapelPagination' : 'rekMapelPagination', 'rmPage', 'renderRM');

  if(rmIsSiswa) {
    if(!pagedList.length) tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--tx3)">Anda belum memiliki riwayat absensi mapel pada rentang tanggal ini</td></tr>`;
    else tbody.innerHTML = pagedList.map(r=>`<tr>
      <td class="t2" style="font-weight:600;color:var(--v)"><div style="display:flex;align-items:center"><span class="bdg bb" style="font-size:10px;padding:2px 6px;margin-right:5px"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> MAPEL</span> ${r.subject||'—'}</div></td>
      <td>${ftm(r.time)}</td>
      <td class="t2 txs">${r.teacher_name||'Sistem (AI)'}</td>
      <td>${mkBadge(r.status)}</td>
    </tr>`).join('');
  } else {
    if(!pagedList.length) tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--tx3)">Tidak ada data absensi mapel pada tanggal yang dipilih</td></tr>`;
    else tbody.innerHTML = pagedList.map(r=>`<tr>
      <td style="font-weight:700">${r.name||'—'}</td>
      <td class="t2">${r.nisn||'—'}</td>
      <td><span class="bdg bb">${r.class_name||'—'}</span></td>
      <td style="font-weight:bold;color:var(--grn)">${r.hadir}</td>
      <td style="font-weight:bold;color:var(--amb)">${r.sakit}</td>
      <td style="font-weight:bold;color:var(--v)">${r.izin}</td>
      <td style="font-weight:bold;color:var(--red)">${r.alpha}</td>
      <td style="font-weight:bold;color:var(--pnk)">${r.terlambat}</td>
    </tr>`).join('');
  }
}

/* ╔══════════════════════════════════╗
   ║  1. ABSENSI KELAS (Guru/Admin)   ║
   ╚══════════════════════════════════╝ */
let attStudents=[], attClassId='', attClassName='', attSubject='', attSubjectKey='', attDate='';

async function absensi(){
  setHdr('Absensi Mata Pelajaran','Input kehadiran siswa per kelas & mata pelajaran');
  
  const d=new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  id('absDate').value = d.toISOString().slice(0,10);
  if (typeof updateAbsDay === 'function') updateAbsDay();
  
  const isGuru = App.profile?.role === 'guru';
  let tId = null;
  window.currentMatch = null;
  
  if(isGuru) {
    tId = await getTeacherId();
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    if (window._absensiPrefill && window._absensiPrefill.day !== undefined) {
      id('guruAbsDay').value = days[window._absensiPrefill.day];
    } else {
      id('guruAbsDay').value = days[d.getDay()];
    }
    await loadGuruSchedulesForAbsensi();
  }
  
  if (isGuru && tId) {
    const { data: schData, error: e1 } = await supabase.from('teaching_schedules').select('class_id, subject_id, classes(name), subjects(name), day, start_time, end_time').eq('teacher_id', tId);
    if (e1) console.error("Error schData:", e1);
    
    const clsMap = new Map();
    const subMap = new Map();
    const todayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
    const nowTime = new Date(`2000-01-01 ${nowTimeStr}`);
    
    let currentMatch = null;

    if (Array.isArray(schData)) {
      schData.forEach(s => {
        if(s.classes) clsMap.set(s.class_id, s.classes.name);
        if(s.subjects) subMap.set(s.subject_id, s.subjects.name);
        
        if (s.day === new Date().getDay()) {
           const st = new Date(`2000-01-01 ${s.start_time}`);
           st.setMinutes(st.getMinutes() - 15);
           const en = new Date(`2000-01-01 ${s.end_time}`);
           en.setMinutes(en.getMinutes() + 30);
           if (nowTime >= st && nowTime <= en) {
              currentMatch = s;
           }
        }
      });
    }

    const clsEl = id('absClass');
    clsEl.innerHTML = '<option value="">— Pilih Kelas —</option>';
    for (let [cid, cname] of clsMap) {
      clsEl.innerHTML += `<option value="${cid}">${cname}</option>`;
    }

    const subEl = id('absSubj');
    subEl.innerHTML = '<option value="">— Pilih Mapel —</option>';
    for (let [sid, sname] of subMap) {
      subEl.innerHTML += `<option value="${sid}">${sname}</option>`;
    }

    if (window._absensiPrefill) {
      const optVal = `${window._absensiPrefill.classId}|${window._absensiPrefill.subjectId}`;
      if(id('guruAbsSchedule').querySelector(`option[value="${optVal}"]`)) {
        id('guruAbsSchedule').value = optVal;
      }
      window._absensiPrefill = null;
      setTimeout(loadAttStudents, 300);
    } else if (window.currentMatch) {
      clsEl.value = window.currentMatch.class_id;
      subEl.value = window.currentMatch.subject_id;
      const optVal = `${window.currentMatch.class_id}|${window.currentMatch.subject_id}`;
      if(id('guruAbsSchedule').querySelector(`option[value="${optVal}"]`)) {
        id('guruAbsSchedule').value = optVal;
      }
      setTimeout(loadAttStudents, 300);
    } else {
      renderAttEmpty();
    }
  } else {
    await fillClassSel('absClass'); await fillSubjSel('absSubj');
    if(window._absensiPrefill) {
      id('absClass').value = window._absensiPrefill.classId;
      id('absSubj').value = window._absensiPrefill.subjectId;
      window._absensiPrefill = null;
      setTimeout(loadAttStudents, 300);
    } else {
      renderAttEmpty();
    }
  }
}

function renderAttEmpty(){
  const w=id('attGrid'); if(!w) return;
  w.innerHTML=`<div style="text-align:center;padding:3rem;color:var(--tx3);grid-column:1/-1">
    <div style="font-size:3rem;margin-bottom:.8rem;color:var(--tx2)"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"></div>
    <div style="font-weight:700;margin-bottom:.3rem">Pilih Kelas & Mata Pelajaran</div>
    <div style="font-size:.83rem">Klik "Muat Data Siswa" untuk memulai</div>
  </div>`;
}

window.loadGuruSchedulesForAbsensi = async function() {
  if (App.profile?.role !== 'guru') return;
  const dayStr = id('guruAbsDay').value;
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const dayInt = days.indexOf(dayStr);
  const tId = await getTeacherId();
  if(!tId) return;
  
  const { data: schedules, error } = await supabase
    .from('teaching_schedules')
    .select('class_id, subject_id, start_time, end_time, day, classes(name), subjects(name)')
    .eq('teacher_id', tId)
    .eq('day', dayInt)
    .order('start_time');
    
  if (error) {
    console.error("Fetch schedules error:", error);
    showToast("Gagal memuat jadwal: " + error.message, 'error');
  }
    
  const sel = id('guruAbsSchedule');
  if(!sel) return;
  
  sel.innerHTML = '<option value="">— Pilih Jadwal —</option>';
  if(schedules && schedules.length > 0) {
    schedules.forEach(s => {
      sel.innerHTML += `<option value="${s.class_id}|${s.subject_id}">${s.start_time} - ${s.end_time} | ${s.subjects?.name || s.subject_id} | ${s.classes?.name || s.class_id}</option>`;
    });
  } else {
    sel.innerHTML = '<option value="">— Tidak ada jadwal —</option>';
  }
  
  // Also reset hidden fields when day changes
  const cEl = id('absClass'), sEl = id('absSubj');
  if(cEl) cEl.value = '';
  if(sEl) sEl.value = '';
  renderAttEmpty(); // clear the grid when day is changed
}

window.onGuruScheduleSelect = function() {
  const val = id('guruAbsSchedule').value;
  if(val) {
    const [cId, sId] = val.split('|');
    id('absClass').value = cId;
    id('absSubj').value = sId;
    loadAttStudents();
  } else {
    id('absClass').value = '';
    id('absSubj').value = '';
    renderAttEmpty();
  }
}

async function loadAttStudents(){
  const isGuru = App.profile?.role === 'guru';
  
  if (isGuru) {
    const val = id('guruAbsSchedule')?.value;
    if (val) {
      const [cId, sId] = val.split('|');
      attClassId = cId;
      attSubjectKey = sId;
    } else {
      attClassId = '';
      attSubjectKey = '';
    }
    
    const dayName = id('guruAbsDay')?.value;
    if (dayName) {
      const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
      const targetDayIdx = days.indexOf(dayName);
      const d = new Date();
      let diff = targetDayIdx - d.getDay();
      if (diff > 0) diff -= 7;
      d.setDate(d.getDate() + diff);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      attDate = d.toISOString().slice(0,10).replace(/-/g,'_');
    } else {
      attDate = id('absDate')?.value?.replace(/-/g,'_');
    }
  } else {
    attClassId = id('absClass')?.value;
    attSubjectKey = id('absSubj')?.value;
    attDate = id('absDate')?.value?.replace(/-/g,'_');
  }
  
  if(!attClassId||!attSubjectKey||!attDate) {
    if (isGuru) return showToast('Pilih Jadwal Pelajaran terlebih dahulu!', 'warning');
    return showToast('Pilih kelas, mapel & tanggal!','warning');
  }

  // ── VALIDASI JADWAL MENGAJAR GURU ──
  if(isGuru) {
    const tId = await getTeacherId();
    if(tId) {
      // Get current day and time
      const selectedDate = new Date(attDate.replace(/_/g,'-'));
      const dayOfWeekStr = selectedDate.toLocaleDateString('id-ID', { weekday: 'long' });
      const dayOfWeekInt = selectedDate.getDay();
      const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      // Check if teacher has schedule for this class, subject, and day
      const { data: schedules } = await supabase
        .from('teaching_schedules')
        .select('*')
        .eq('teacher_id', tId)
        .eq('class_id', attClassId)
        .eq('subject_id', attSubjectKey)
        .eq('day', dayOfWeekInt);
      
      if(!schedules || schedules.length === 0) {
        const btn=id('btnLoad'); 
        if(btn){btn.innerHTML='<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Muat Data Siswa';btn.disabled=false;}
        return showToast(`Anda tidak memiliki jadwal mengajar untuk kelas dan mapel ini pada hari ${dayOfWeekStr}!`, 'error', 5000);
      }
      
    }
  }

  const { data: cls } = await supabase.from('classes').select('name').eq('id', attClassId).single();
  attClassName = cls?.name || attClassId;
  const { data: subj } = await supabase.from('subjects').select('name').eq('id', attSubjectKey).single();
  attSubject = subj?.name || attSubjectKey;

  const btn=id('btnLoad'); if(btn){btn.innerHTML='<div class="spin"></div>';btn.disabled=true;}

  const { data: students } = await supabase.from('students').select('*').eq('class_id', attClassId).order('name');
  attStudents = Array.isArray(students) ? students : [];

  // Load existing attendance
  const { data: existing } = await supabase
    .from('attendance')
    .select('student_user_id, student_id, status')
    .eq('date_key', attDate)
    .eq('class_id', attClassId)
    .eq('subject_key', attSubjectKey);
    
  const existMap = {};
  if(Array.isArray(existing)) existing.forEach(r => { existMap[r.student_user_id||r.student_id] = r.status; });

  // Load approved permits
  const currentDt = attDate.replace(/_/g,'-');
  const { data: permits } = await supabase
    .from('permits')
    .select('student_id, type, start_date, end_date')
    .eq('status', 'approved')
    .lte('start_date', currentDt);

  const activePermits = {};
  if(Array.isArray(permits)) permits.forEach(p => {
    if(currentDt <= (p.end_date||p.start_date)) {
      activePermits[p.student_id] = p.type;
    }
  });

  App.attBuf={};
  attStudents.forEach(s => {
    const key = s.user_id || s.id;
    App.attBuf[s.id] = existMap[key] || activePermits[s.user_id] || null;
  });

  if(btn){btn.innerHTML='<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Muat Ulang';btn.disabled=false;}
  const info=id('attInfo');
  if(info) info.innerHTML=`<span class="bdg bv"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${attClassName}</span>
    <span class="bdg bb">${attSubject}</span>
    <span class="bdg bn"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${attDate.replace(/_/g,'-')}</span>`;
  renderAttGrid();
  updateAttSummary();
}

function renderAttGrid(){
  const w=id('attGrid'); if(!w) return;
  if(!attStudents.length){ w.innerHTML=`<div style="text-align:center;padding:2rem;color:var(--tx3)">Tidak ada siswa</div>`; return; }
  
  // Change grid to single column for horizontal cards
  w.style.gridTemplateColumns = '1fr';
  w.style.gap = '0.75rem';
  
  w.innerHTML=attStudents.map((s,i)=>{
    const st=App.attBuf[s.id]||'';
    const statusColor = {
      hadir: 'var(--grn)',
      izin: 'var(--v)',
      sakit: 'var(--amb)',
      alpha: 'var(--red)',
      terlambat: 'var(--pnk)'
    };
    
    return `<div class="att-card-horizontal ${st}" id="ac_${s.id}" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.2rem;background:var(--card);border:1px solid var(--brd);border-radius:12px;transition:all 0.2s;">
      <div class="att-av av-${st||'default'}" id="av_${s.id}" style="width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem;flex-shrink:0;background:${st ? statusColor[st] : 'var(--bg2)'};color:#fff;">${(s.name||'?').substring(0,2).toUpperCase()}</div>
      <div style="flex:1;min-width:0;">
        <div class="att-name" style="font-weight:700;font-size:0.95rem;color:var(--tx1);margin-bottom:0.2rem;">${s.name}</div>
        <div class="att-nisn" style="font-size:0.8rem;color:var(--tx3);">NISN: ${s.nisn||'—'} · No. ${s.no||i+1}</div>
      </div>
      <div id="btns_${s.id}" style="flex-shrink:0; display:flex; gap:0.4rem; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
        <button id="btn_${s.id}_hadir" onclick="setSt('${s.id}', 'hadir')" style="background:${st==='hadir'?'var(--grn)':'var(--bg2)'}; color:${st==='hadir'?'#fff':'var(--tx2)'}; border:none; border-radius:8px; padding:0.5rem 0.8rem; font-weight:700; font-size:0.8rem; cursor:pointer; transition:0.2s;">Hadir</button>
        <button id="btn_${s.id}_izin" onclick="setSt('${s.id}', 'izin')" style="background:${st==='izin'?'var(--v)':'var(--bg2)'}; color:${st==='izin'?'#fff':'var(--tx2)'}; border:none; border-radius:8px; padding:0.5rem 0.8rem; font-weight:700; font-size:0.8rem; cursor:pointer; transition:0.2s;">Izin</button>
        <button id="btn_${s.id}_sakit" onclick="setSt('${s.id}', 'sakit')" style="background:${st==='sakit'?'var(--amb)':'var(--bg2)'}; color:${st==='sakit'?'#fff':'var(--tx2)'}; border:none; border-radius:8px; padding:0.5rem 0.8rem; font-weight:700; font-size:0.8rem; cursor:pointer; transition:0.2s;">Sakit</button>
        <button id="btn_${s.id}_alpha" onclick="setSt('${s.id}', 'alpha')" style="background:${st==='alpha'?'var(--red)':'var(--bg2)'}; color:${st==='alpha'?'#fff':'var(--tx2)'}; border:none; border-radius:8px; padding:0.5rem 0.8rem; font-weight:700; font-size:0.8rem; cursor:pointer; transition:0.2s;">Alpha</button>
      </div>
    </div>`;
  }).join('');
}

function setSt(sid,status){
  App.attBuf[sid]=status;
  const c=id('ac_'+sid), av=id('av_'+sid);
  
  const statusColor = {
    hadir: 'var(--grn)',
    izin: 'var(--v)',
    sakit: 'var(--amb)',
    alpha: 'var(--red)',
    terlambat: 'var(--pnk)'
  };
  
  if(c) {
    c.className = 'att-card-horizontal ' + status;
  }
  if(av) {
    av.className = 'att-av av-' + status;
    av.style.background = statusColor[status] || 'var(--bg2)';
  }
  
  const statuses = ['hadir', 'izin', 'sakit', 'alpha', 'terlambat'];
  statuses.forEach(s => {
    const btn = id(`btn_${sid}_${s}`);
    if (btn) {
      if (s === status) {
        btn.style.background = statusColor[s];
        btn.style.color = '#fff';
      } else {
        btn.style.background = 'var(--bg2)';
        btn.style.color = 'var(--tx2)';
      }
    }
  });

  updateAttSummary();
}
function setAllSt(status){ attStudents.forEach(s=>setSt(s.id,status)); }

function updateAttSummary(){
  const c={hadir:0,izin:0,sakit:0,alpha:0,terlambat:0,kosong:0};
  attStudents.forEach(s=>{ const st=App.attBuf[s.id]; if(st&&c[st]!==undefined)c[st]++; else c.kosong++; });
  const el=id('attSum'); if(!el) return;
  el.innerHTML=`<span class="bdg bg"><img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${c.hadir}</span><span class="bdg bp"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${c.terlambat}</span>
    <span class="bdg bv"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${c.izin}</span><span class="bdg ba"><img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${c.sakit}</span>
    <span class="bdg br"><span style="font-weight:bold;margin:0 4px">✕</span> ${c.alpha}</span><span class="bdg bn"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${c.kosong}</span>`;
}

async function saveAbsensi(){
  if(!attClassId||!attDate) return showToast('Muat siswa terlebih dahulu!','warning');
  const blank=attStudents.filter(s=>!App.attBuf[s.id]);
  if(blank.length>0&&!confirm(`${blank.length} siswa belum diisi status. Lanjut simpan?`)) return;
  const btn=id('btnSave'); if(btn){btn.innerHTML='<div class="spin"></div> Menyimpan...';btn.disabled=true;}
  
  const tId = await getTeacherId();
  const now=Date.now();
  const batch = attStudents.map(s=>({
    date_key:attDate, class_id:parseInt(attClassId), class_name:attClassName,
    student_id:s.id, student_user_id:s.user_id||null,
    name:s.name, nisn:s.nisn||'', subject_key:attSubjectKey, subject:attSubject,
    status:App.attBuf[s.id]||'alpha', time:now,
    teacher_id:tId, teacher_name:App.profile?.name||''
  }));

  // Supabase delete old records first for this batch
  await supabase.from('attendance')
    .delete()
    .eq('date_key', attDate)
    .eq('class_id', attClassId)
    .eq('subject_key', attSubjectKey);

  // Insert new batch
  const { error } = await supabase.from('attendance').insert(batch);
  
  if (!error) {
    await logAct('absensi',`Rekam ${attClassName} — ${attSubject} — ${attDate}`);
    showToast(`Absensi ${attClassName} berhasil disimpan!`,'success');
  } else {
    showToast('Gagal menyimpan: ' + error.message, 'error');
  }

  if(btn){btn.innerHTML='<img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Simpan Absensi';btn.disabled=false;}
}

/* ╔══════════════════════════════╗
   ║  2. REKAP ABSENSI            ║
   ╚══════════════════════════════╝ */
async function rekap(){
  const isSiswa = App.profile?.role === 'siswa';
  const isGuru = App.profile?.role === 'guru';
  
  let headerTitle = 'Rekap Kehadiran';
  if (window._rekapMode === 'sekolah') headerTitle = 'Rekap Absensi Sekolah';
  else if (window._rekapMode === 'mapel') headerTitle = 'Rekap Absensi Mapel';
  
  setHdr(headerTitle, isSiswa ? 'Lihat riwayat kehadiran pribadi Anda' : 'Lihat rekap kehadiran berdasarkan kelas & tanggal');
  
  if(!isSiswa) await fillClassSel('rekClass', true);
  
  const d=new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  id('rekDate').value=d.toISOString().slice(0,10);
  
  const typeSel = id('rekType');
  const typeWrap = typeSel ? typeSel.parentElement : null;
  const sel = id('rekClass');

  if(isGuru) {
    const tId = await getTeacherId();
    if(tId) {
      const { data: t } = await supabase.from('teachers').select('homeroom').eq('id', tId).single();
      if(t && t.homeroom) {
        if(sel) {
          for(let i=0; i<sel.options.length; i++) {
            if(sel.options[i].text === t.homeroom || sel.options[i].value === t.homeroom) {
              sel.selectedIndex = i;
              break;
            }
          }
          sel.disabled = (window._rekapMode === 'sekolah');
        }
      } else {
         if (sel) sel.disabled = false;
      }
    }
  } else {
      if (sel) sel.disabled = false;
  }
  
  if (typeSel && typeWrap) {
      if (window._rekapMode === 'sekolah') {
          typeSel.value = 'sekolah';
          typeWrap.style.display = 'none';
      } else if (window._rekapMode === 'mapel') {
          typeSel.value = 'mapel';
          typeWrap.style.display = 'none';
      } else {
          typeSel.value = '';
          typeWrap.style.display = '';
      }
  }
  
  // Show/Hide cards based on mode
  const cardSekolah = id('rekCardSekolah');
  const cardMapel = id('rekCardMapel');
  if (window._rekapMode === 'sekolah') {
      if(cardSekolah) cardSekolah.style.display = 'block';
      if(cardMapel) cardMapel.style.display = 'none';
  } else if (window._rekapMode === 'mapel') {
      if(cardSekolah) cardSekolah.style.display = 'none';
      if(cardMapel) cardMapel.style.display = 'block';
  } else {
      if(cardSekolah) cardSekolah.style.display = 'block';
      if(cardMapel) cardMapel.style.display = 'block';
  }
  
  loadRekap();
}

// ── REKAP ABSENSI SEKOLAH (TERPISAH) ──────────────────────
async function loadRekapSekolah(){
  const isSiswa = App.profile?.role === 'siswa';
  const uid = App.profile?.id || App.user?.id;
  const cls=id('rekSekolahClass')?.value;
  const dtStart=id('rekSekolahDateStart')?.value;
  const dtEnd=id('rekSekolahDateEnd')?.value;
  if(!dtStart || !dtEnd) return showToast('Pilih rentang tanggal!','warning');
  const dkStart=dtStart.replace(/-/g,'_');
  const dkEnd=dtEnd.replace(/-/g,'_');
  
  const tbody = isSiswa ? document.querySelector('#pg-rekap #rekTbodySekolah') : document.querySelector('#pg-rekap_sekolah #rekTbodySekolah');
  
  if(tbody) tbody.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  
  let query = supabase.from('attendance').select('*').gte('date_key', dkStart).lte('date_key', dkEnd).eq('subject', 'Absensi Sekolah');
  if(cls) query = query.eq('class_id', cls);
  
  if(isSiswa) {
    let stuNisn = App.user?.user_metadata?.nisn;
    if (!stuNisn) {
      const { data: stu } = await supabase.from('students').select('nisn').eq('user_id', uid).single();
      if (stu) stuNisn = stu.nisn;
    }
    if (stuNisn) query = query.eq('nisn', stuNisn);
    else query = query.eq('student_user_id', uid);
  }
  
  const { data: rows, error } = await query;
  if(error) { console.error(error); return showToast('Error memuat data: ' + error.message, 'error'); }
  let list = Array.isArray(rows) ? rows : [];
  
  const sum={hadir:0,terlambat:0,izin:0,sakit:0,alpha:0};
  list.forEach(r => { if(sum[r.status]!==undefined) sum[r.status]++; });

  const tot=Object.values(sum).reduce((a,b)=>a+b,0)||1;
  Object.entries(sum).forEach(([k,v])=>{
    const b=id('rrs_'+k); if(b) b.style.width=Math.round(v/tot*100)+'%';
    const n=id('rns_'+k); if(n) n.textContent=v;
  });

  list.sort((a,b)=>(a.time||0)-(b.time||0));
  
  const thead = isSiswa ? document.querySelector('#pg-rekap #rekTheadSekolah') || document.querySelector('#pg-rekap #rekCardSekolah thead') : document.querySelector('#pg-rekap_sekolah #rekTheadSekolah') || document.querySelector('#pg-rekap_sekolah thead');
  
  rsIsSiswa = isSiswa;
  if(!isSiswa) {
    if(thead) thead.innerHTML = `<tr>
      <th>Nama Siswa</th>
      <th>NISN</th>
      <th>Kelas</th>
      <th>Hadir</th>
      <th>Sakit</th>
      <th>Izin</th>
      <th>Alpha</th>
      <th>Terlambat</th>
    </tr>`;
    
    const g={};
    list.forEach(r=>{
      if(!g[r.student_id]) g[r.student_id]={name:r.name, nisn:r.nisn, class_name:r.class_name, hadir:0, sakit:0, izin:0, alpha:0, terlambat:0};
      if(g[r.student_id][r.status]!==undefined) g[r.student_id][r.status]++;
    });
    rsList = Object.values(g).sort((a,b)=>(a.name||'').localeCompare(b.name||''));
    if(!rsList.length) showToast('Info: Belum ada rekaman absensi yang tersimpan pada rentang tanggal dan kelas yang Anda pilih.', 'info');
  } else {
    if(thead) thead.innerHTML = `<tr>
      <th>Waktu</th>
      <th>Guru Piket</th>
      <th>Status</th>
    </tr>`;
    rsList = list;
  }

  rsPage = 1;
  renderRS();
  window._rekapSekolahData=list;
}

function exportRekapSekolah(){
  const d=window._rekapSekolahData; if(!d?.length) return showToast('Load rekap dulu!','warning');
  const h='Nama,NISN,Kelas,Jam,Petugas,Status\n';
  const rows=d.map(r=>`${r.name||''},${r.nisn||''},${r.class_name||''},${ftm(r.time)},${r.teacher_name||'Sistem'},${r.status||''}`).join('\n');
  dl(h+rows,'rekap_sekolah_'+Date.now()+'.csv');
}

// ── REKAP ABSENSI MAPEL (TERPISAH) ────────────────────────
async function loadRekapMapel(){
  const isSiswa = App.profile?.role === 'siswa';
  const uid = App.profile?.id || App.user?.id;
  const cls=id('rekMapelClass')?.value, subj=id('rekMapelSubject')?.value;
  const dtStart=id('rekMapelDateStart')?.value;
  const dtEnd=id('rekMapelDateEnd')?.value;
  if(!dtStart || !dtEnd) return showToast('Pilih rentang tanggal!','warning');
  const dkStart=dtStart.replace(/-/g,'_');
  const dkEnd=dtEnd.replace(/-/g,'_');
  const tbody = isSiswa ? document.querySelector('#pg-rekap #rekTbodyMapel') : document.querySelector('#pg-rekap_mapel #rekTbodyMapel');
  
  if(tbody) tbody.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  
  let query = supabase.from('attendance').select('*').gte('date_key', dkStart).lte('date_key', dkEnd).neq('subject', 'Absensi Sekolah');
  if(cls) query = query.eq('class_id', cls);
  if(subj) query = query.eq('subject_key', String(subj));
  
  const isGuru = App.profile?.role === 'guru';
  if(isGuru) {
    const tId = await getTeacherId();
    if(tId) query = query.eq('teacher_id', tId);
  }
  
  if(isSiswa) {
    let stuNisn = App.user?.user_metadata?.nisn;
    if (!stuNisn) {
      const { data: stu } = await supabase.from('students').select('nisn').eq('user_id', uid).single();
      if (stu) stuNisn = stu.nisn;
    }
    if (stuNisn) query = query.eq('nisn', stuNisn);
    else query = query.eq('student_user_id', uid);
  }
  
  const { data: rows, error } = await query;
  if(error) { console.error(error); return showToast('Error memuat data: ' + error.message, 'error'); }
  let list = Array.isArray(rows) ? rows : [];
  
  const sum={hadir:0,terlambat:0,izin:0,sakit:0,alpha:0};
  list.forEach(r => { if(sum[r.status]!==undefined) sum[r.status]++; });

  const tot=Object.values(sum).reduce((a,b)=>a+b,0)||1;
  Object.entries(sum).forEach(([k,v])=>{
    const b=id('rrm_'+k); if(b) b.style.width=Math.round(v/tot*100)+'%';
    const n=id('rnm_'+k); if(n) n.textContent=v;
  });

  list.sort((a,b)=>(a.time||0)-(b.time||0));
  
  const thead = isSiswa ? document.querySelector('#pg-rekap #rekTheadMapel') || document.querySelector('#pg-rekap thead') : document.querySelector('#pg-rekap_mapel #rekTheadMapel');
  
  rmIsSiswa = isSiswa;
  if(!isSiswa) {
    if(thead) thead.innerHTML = `<tr>
      <th>Nama Siswa</th>
      <th>NISN</th>
      <th>Kelas</th>
      <th>Hadir</th>
      <th>Sakit</th>
      <th>Izin</th>
      <th>Alpha</th>
      <th>Terlambat</th>
    </tr>`;
    
    const g={};
    list.forEach(r=>{
      if(!g[r.student_id]) g[r.student_id]={name:r.name, nisn:r.nisn, class_name:r.class_name, hadir:0, sakit:0, izin:0, alpha:0, terlambat:0};
      if(g[r.student_id][r.status]!==undefined) g[r.student_id][r.status]++;
    });
    rmList = Object.values(g).sort((a,b)=>(a.name||'').localeCompare(b.name||''));
    if(!rmList.length) showToast('Info: Belum ada rekaman absensi yang tersimpan pada rentang tanggal dan kelas yang Anda pilih.', 'info');
  } else {
    if(thead) thead.innerHTML = `<tr>
      <th>Mapel</th>
      <th>Waktu</th>
      <th>Guru</th>
      <th>Status</th>
    </tr>`;
    rmList = list;
  }

  rmPage = 1;
  renderRM();
  window._rekapMapelData=list;
}

function exportRekapMapel(){
  const d=window._rekapMapelData; if(!d?.length) return showToast('Load rekap dulu!','warning');
  const h='Nama,NISN,Kelas,Mapel,Jam,Guru,Status\n';
  const rows=d.map(r=>`${r.name||''},${r.nisn||''},${r.class_name||''},${r.subject||''},${ftm(r.time)},${r.teacher_name||''},${r.status||''}`).join('\n');
  dl(h+rows,'rekap_mapel_'+Date.now()+'.csv');
}

// ── REKAP LEGACY (UNTUK SISWA) ────────────────────────────
async function loadRekap(){
  const isSiswa = App.profile?.role === 'siswa';
  const uid = App.profile?.id || App.user?.id;
  const cls=id('rekClass')?.value, dt=id('rekDate')?.value, type=id('rekType')?.value;
  if(!dt) return showToast('Pilih tanggal!','warning');
  const dk=dt.replace(/-/g,'_');
  const tbodySekolah=id('rekTbodySekolah');
  const tbodyMapel=id('rekTbodyMapel');
  
  if(tbodySekolah) tbodySekolah.innerHTML=`<tr><td colspan="6" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  if(tbodyMapel) tbodyMapel.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  
  let query = supabase.from('attendance').select('*').eq('date_key', dk);
  if(cls) query = query.eq('class_id', cls);
  
  if(isSiswa) {
    let stuNisn = App.user?.user_metadata?.nisn;
    if (!stuNisn) {
      const { data: stu } = await supabase.from('students').select('nisn').eq('user_id', uid).single();
      if (stu) stuNisn = stu.nisn;
    }
    if (stuNisn) query = query.eq('nisn', stuNisn);
    else query = query.eq('student_user_id', uid);
  }
  
  const { data: rows, error } = await query;
  let list = Array.isArray(rows) ? rows : [];
  
  let listSekolah = list.filter(r => r.subject === 'Absensi Sekolah');
  let listMapel = list.filter(r => r.subject !== 'Absensi Sekolah');

  if(type === 'sekolah') listMapel = [];
  if(type === 'mapel') listSekolah = [];

  const visibleList = [...listSekolah, ...listMapel];

  const sum={hadir:0,terlambat:0,izin:0,sakit:0,alpha:0};
  visibleList.forEach(r => { if(sum[r.status]!==undefined) sum[r.status]++; });

  const tot=Object.values(sum).reduce((a,b)=>a+b,0)||1;
  Object.entries(sum).forEach(([k,v])=>{
    const b=id('rr_'+k); if(b) b.style.width=Math.round(v/tot*100)+'%';
    const n=id('rn_'+k); if(n) n.textContent=v;
  });

  // Render Sekolah
  listSekolah.sort((a,b)=>(a.time||0)-(b.time||0));
  if(tbodySekolah) {
    if(!listSekolah.length) {
      tbodySekolah.innerHTML=`<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--tx3)">${isSiswa ? 'Anda belum memiliki riwayat absensi sekolah pada tanggal ini' : 'Tidak ada data absensi sekolah'}</td></tr>`;
    } else {
      tbodySekolah.innerHTML=listSekolah.map(r=>{
        const adminCols = !isSiswa ? `
          <td style="font-weight:700">${r.name||'—'}</td>
          <td class="t2">${r.nisn||'—'}</td>
          <td><span class="bdg bb">${r.class_name||'—'}</span></td>
        ` : '';
        return `<tr>
          ${adminCols}
          <td>${ftm(r.time)}</td>
          <td class="t2 txs">${r.teacher_name||'Sistem (AI)'}</td>
          <td>${mkBadge(r.status)}</td>
        </tr>`;
      }).join('');
    }
  }

  // Render Mapel
  listMapel.sort((a,b)=>(a.time||0)-(b.time||0));
  if(tbodyMapel) {
    if(!listMapel.length) {
      tbodyMapel.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--tx3)">${isSiswa ? 'Anda belum memiliki riwayat absensi mapel pada tanggal ini' : 'Tidak ada data absensi mapel'}</td></tr>`;
    } else {
      tbodyMapel.innerHTML=listMapel.map(r=>{
        const adminCols = !isSiswa ? `
          <td style="font-weight:700">${r.name||'—'}</td>
          <td class="t2">${r.nisn||'—'}</td>
          <td><span class="bdg bb">${r.class_name||'—'}</span></td>
        ` : '';
        return `<tr>
          ${adminCols}
          <td class="t2" style="font-weight:600;color:var(--v)"><div style="display:flex;align-items:center"><span class="bdg bb" style="font-size:10px;padding:2px 6px;margin-right:5px"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> MAPEL</span> ${r.subject||'—'}</div></td>
          <td>${ftm(r.time)}</td>
          <td class="t2 txs">${r.teacher_name||'Sistem (AI)'}</td>
          <td>${mkBadge(r.status)}</td>
        </tr>`;
      }).join('');
    }
  }

  window._rekapData=visibleList;
}

function exportRekap(){
  const d=window._rekapData; if(!d?.length) return showToast('Load rekap dulu!','warning');
  const h='Nama,NISN,Kelas,Mapel,Jam,Guru,Status\n';
  const rows=d.map(r=>`${r.name||''},${r.nisn||''},${r.class_name||''},${r.subject||''},${ftm(r.time)},${r.teacher_name||''},${r.status||''}`).join('\n');
  dl(h+rows,'rekap_'+Date.now()+'.csv');
}
