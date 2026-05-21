/* ═══════════════════════════════════════════════════════════
   SiAbsen — Modul Absensi & Rekap (MySQL Version)
   ═══════════════════════════════════════════════════════════ */

/* ╔══════════════════════════════════╗
   ║  1. ABSENSI KELAS (Guru/Admin)   ║
   ╚══════════════════════════════════╝ */
let attStudents=[], attClassId='', attClassName='', attSubject='', attSubjectKey='', attDate='';

async function absensi(){
  setHdr('Absensi Mata Pelajaran','Input kehadiran siswa per kelas & mata pelajaran');
  await fillClassSel('absClass'); await fillSubjSel('absSubj');
  const d=new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  id('absDate').value = d.toISOString().slice(0,10);
  
  if(window._absensiPrefill) {
    id('absClass').value = window._absensiPrefill.classId;
    id('absSubj').value = window._absensiPrefill.subjectId;
    window._absensiPrefill = null;
    setTimeout(loadAttStudents, 300);
  } else {
    renderAttEmpty();
  }
}

function renderAttEmpty(){
  const w=id('attGrid'); if(!w) return;
  w.innerHTML=`<div style="text-align:center;padding:3rem;color:var(--tx3);grid-column:1/-1">
    <div style="font-size:3rem;margin-bottom:.8rem;color:var(--tx2)"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"></div>
    <div style="font-weight:700;margin-bottom:.3rem">Pilih Kelas & Mata Pelajaran</div>
    <div style="font-size:.83rem">Klik "Muat Siswa" untuk memulai</div>
  </div>`;
}

async function loadAttStudents(){
  attClassId = id('absClass')?.value;
  attSubjectKey = id('absSubj')?.value;
  attDate = id('absDate')?.value?.replace(/-/g,'_');
  if(!attClassId||!attSubjectKey||!attDate) return showToast('Pilih kelas, mapel & tanggal!','warning');

  // ── VALIDASI JADWAL MENGAJAR GURU ──
  const isGuru = App.profile?.role === 'guru';
  if(isGuru) {
    const tId = await getTeacherId();
    if(tId) {
      // Get current day and time
      const selectedDate = new Date(attDate.replace(/_/g,'-'));
      const dayOfWeek = selectedDate.toLocaleDateString('id-ID', { weekday: 'long' });
      const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      // Check if teacher has schedule for this class, subject, and day
      const { data: schedules } = await supabase
        .from('schedules')
        .select('*')
        .eq('teacher_id', tId)
        .eq('class_id', attClassId)
        .eq('subject_id', attSubjectKey)
        .eq('day', dayOfWeek);
      
      if(!schedules || schedules.length === 0) {
        const btn=id('btnLoad'); 
        if(btn){btn.innerHTML='<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Muat Data Siswa';btn.disabled=false;}
        return showToast(`Anda tidak memiliki jadwal mengajar untuk kelas dan mapel ini pada hari ${dayOfWeek}!`, 'error', 5000);
      }
      
      // Check if current time is within schedule time
      const schedule = schedules[0];
      const startTime = schedule.start_time;
      const endTime = schedule.end_time;
      
      // Allow 15 minutes before and 30 minutes after schedule
      const scheduleStart = new Date(`2000-01-01 ${startTime}`);
      scheduleStart.setMinutes(scheduleStart.getMinutes() - 15);
      const scheduleEnd = new Date(`2000-01-01 ${endTime}`);
      scheduleEnd.setMinutes(scheduleEnd.getMinutes() + 30);
      const currentDateTime = new Date(`2000-01-01 ${currentTime}`);
      
      if(currentDateTime < scheduleStart || currentDateTime > scheduleEnd) {
        const btn=id('btnLoad'); 
        if(btn){btn.innerHTML='<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Muat Data Siswa';btn.disabled=false;}
        return showToast(`Jadwal mengajar Anda: ${startTime} - ${endTime}. Anda hanya bisa absen 15 menit sebelum hingga 30 menit setelah jadwal.`, 'warning', 6000);
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
      <div style="flex-shrink:0;min-width:180px;">
        <select class="fi" id="sel_${s.id}" onchange="setStFromSelect('${s.id}')" style="padding:0.65rem 1rem;font-size:0.88rem;font-weight:600;border:2px solid ${st ? statusColor[st] : 'var(--brd)'};border-radius:8px;background:${st ? statusColor[st]+'15' : 'var(--bg)'};color:${st ? statusColor[st] : 'var(--tx2)'};cursor:pointer;width:100%;">
          <option value="" ${!st?'selected':''}>-- Pilih Status --</option>
          <option value="hadir" ${st==='hadir'?'selected':''}>Hadir</option>
          <option value="izin" ${st==='izin'?'selected':''}>Izin</option>
          <option value="sakit" ${st==='sakit'?'selected':''}>Sakit</option>
          <option value="alpha" ${st==='alpha'?'selected':''}>Alpha</option>
          <option value="terlambat" ${st==='terlambat'?'selected':''}>Terlambat</option>
        </select>
      </div>
    </div>`;
  }).join('');
}

function setStFromSelect(sid){
  const sel = id('sel_'+sid);
  if(!sel) return;
  const status = sel.value;
  if(!status) return;
  setSt(sid, status);
}

function setSt(sid,status){
  App.attBuf[sid]=status;
  const c=id('ac_'+sid), av=id('av_'+sid), sel=id('sel_'+sid);
  
  const statusColor = {
    hadir: 'var(--grn)',
    izin: 'var(--v)',
    sakit: 'var(--amb)',
    alpha: 'var(--red)',
    terlambat: 'var(--pnk)'
  };
  
  // Update card class
  if(c) c.className=`att-card-horizontal ${status}`;
  
  // Update avatar
  if(av) {
    av.className=`att-av av-${status}`;
    av.style.background = statusColor[status] || 'var(--bg2)';
  }
  
  // Update select styling
  if(sel) {
    sel.style.borderColor = statusColor[status] || 'var(--brd)';
    sel.style.background = (statusColor[status] || 'var(--bg)') + '15';
    sel.style.color = statusColor[status] || 'var(--tx2)';
    sel.value = status;
  }
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
  const cls=id('rekSekolahClass')?.value, dt=id('rekSekolahDate')?.value;
  if(!dt) return showToast('Pilih tanggal!','warning');
  const dk=dt.replace(/-/g,'_');
  const tbody=id('rekTbodySekolah');
  
  if(tbody) tbody.innerHTML=`<tr><td colspan="6" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  
  let query = supabase.from('attendance').select('*').eq('date_key', dk).eq('subject', 'Absensi Sekolah');
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
  
  const sum={hadir:0,terlambat:0,izin:0,sakit:0,alpha:0};
  list.forEach(r => { if(sum[r.status]!==undefined) sum[r.status]++; });

  const tot=Object.values(sum).reduce((a,b)=>a+b,0)||1;
  Object.entries(sum).forEach(([k,v])=>{
    const b=id('rrs_'+k); if(b) b.style.width=Math.round(v/tot*100)+'%';
    const n=id('rns_'+k); if(n) n.textContent=v;
  });

  list.sort((a,b)=>(a.time||0)-(b.time||0));
  if(tbody) {
    if(!list.length) {
      tbody.innerHTML=`<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--tx3)">${isSiswa ? 'Anda belum memiliki riwayat absensi sekolah pada tanggal ini' : 'Tidak ada data absensi sekolah'}</td></tr>`;
    } else {
      tbody.innerHTML=list.map(r=>{
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
  const cls=id('rekMapelClass')?.value, dt=id('rekMapelDate')?.value, subj=id('rekMapelSubject')?.value;
  if(!dt) return showToast('Pilih tanggal!','warning');
  const dk=dt.replace(/-/g,'_');
  const tbody=id('rekTbodyMapel');
  
  if(tbody) tbody.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  
  let query = supabase.from('attendance').select('*').eq('date_key', dk).neq('subject', 'Absensi Sekolah');
  if(cls) query = query.eq('class_id', cls);
  if(subj) query = query.eq('subject', subj);
  
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
  
  const sum={hadir:0,terlambat:0,izin:0,sakit:0,alpha:0};
  list.forEach(r => { if(sum[r.status]!==undefined) sum[r.status]++; });

  const tot=Object.values(sum).reduce((a,b)=>a+b,0)||1;
  Object.entries(sum).forEach(([k,v])=>{
    const b=id('rrm_'+k); if(b) b.style.width=Math.round(v/tot*100)+'%';
    const n=id('rnm_'+k); if(n) n.textContent=v;
  });

  list.sort((a,b)=>(a.time||0)-(b.time||0));
  if(tbody) {
    if(!list.length) {
      tbody.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--tx3)">${isSiswa ? 'Anda belum memiliki riwayat absensi mapel pada tanggal ini' : 'Tidak ada data absensi mapel'}</td></tr>`;
    } else {
      tbody.innerHTML=list.map(r=>{
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
