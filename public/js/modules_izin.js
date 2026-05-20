/* SiAbsen — Modul Izin, Laporan, Pengumuman (Supabase Version) */

/* 7. IZIN & SAKIT */
async function izin(){
  const isSiswa=App.profile?.role==='siswa';
  const uid=App.profile?.id;
  setHdr('Izin & Sakit',isSiswa?'Riwayat pengajuan izin & sakit Anda':'Kelola pengajuan surat izin dan sakit siswa');
  
  let query = supabase.from('permits').select('*').order('created_at', { ascending: false });
  if(isSiswa) query = query.eq('student_id', uid);
  
  const { data, error } = await query;
  let list = Array.isArray(data) ? data : [];

  if (App.profile?.role === 'guru') {
    const tId = await getTeacherId();
    if (tId) {
       const { data: t } = await supabase.from('teachers').select('homeroom').eq('id', tId).single();
       const homeroomName = t?.homeroom || '';
       const { data: sch } = await supabase.from('teaching_schedules').select('day, classes(name)').eq('teacher_id', tId);
       
       list = list.filter(p => {
          // If homeroom teacher, always visible
          if (homeroomName && p.class_name === homeroomName) return true;
          
          // If not homeroom, check if teacher teaches this class during the permit dates
          if (!sch) return false;
          const classSchedules = sch.filter(s => s.classes?.name === p.class_name);
          if (classSchedules.length === 0) return false; // Doesn't teach this class at all
          
          const sDate = new Date(p.start_date);
          const eDate = new Date(p.end_date || p.start_date);
          const permitDays = new Set();
          
          // Generate all days (0-6) between start and end date
          let curr = new Date(sDate);
          while (curr <= eDate) {
              permitDays.add(curr.getDay());
              curr.setDate(curr.getDate() + 1);
          }
          
          // Check if any schedule day overlaps with the permit days
          return classSchedules.some(s => permitDays.has(s.day));
       });
    } else {
       list = []; // No teacher profile found, can't verify anything
    }
  }
  
  const tb = id('izinTbody');
  const tableCard = id('izinTableCard');
  const cardsWrap = id('izinCardsWrap');
  if (!tb) return;

  if (isSiswa) {
    if (tableCard) tableCard.style.display = 'none';
    if (cardsWrap) {
      cardsWrap.style.display = 'flex';
      cardsWrap.style.flexDirection = 'column';
      cardsWrap.style.gap = '1rem';
    }
  } else {
    if (tableCard) tableCard.style.display = 'block';
    if (cardsWrap) cardsWrap.style.display = 'none';
  }

  if (isSiswa && cardsWrap) {
    const styleTag = `
      <style>
        .izin-list-card {
          display: flex;
          flex-direction: column;
          border: 1.5px solid var(--brd);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--s1);
          background: var(--card);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .izin-list-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--s2);
        }
        .izin-list-h {
          background: var(--bg2);
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid var(--brd);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .izin-list-b {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .izin-list-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        @media (min-width: 801px) {
          .izin-list-card {
            flex-direction: row;
            align-items: stretch;
          }
          .izin-list-h {
            border-bottom: none;
            border-right: 1px solid var(--brd);
            flex-direction: column;
            justify-content: center;
            min-width: 140px;
            gap: 0.5rem;
          }
          .izin-list-b {
            flex-direction: row;
            align-items: center;
            flex: 1;
            justify-content: space-between;
          }
          .izin-list-info {
            flex: 1;
            padding-right: 1rem;
          }
          .izin-list-action {
            min-width: 150px;
            text-align: right;
            justify-content: flex-end;
          }
        }
      </style>
    `;

    cardsWrap.innerHTML = list.length === 0 
      ? `<div class="card fcen" style="padding:2rem;color:var(--tx3);width:100%">Belum ada pengajuan</div>`
      : styleTag + list.map(r => {
          const typeBadge = `<span class="bdg ${r.type==='sakit'?'ba':'bv'}">${r.type==='sakit'?'<img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Sakit':'<img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Izin'}</span>`;
          const statusBadge = `<span class="bdg ${r.status==='approved'?'bg':r.status==='rejected'?'br':'ba'}">${r.status==='approved'?'<img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Disetujui':r.status==='rejected'?'<span style="font-weight:bold;margin:0 4px">✕</span> Ditolak':'<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Pending'}</span>`;
          const dateRange = `${r.start_date}${r.end_date&&r.end_date!==r.start_date?' → '+r.end_date:''}`;
          const buktiBtn = r.evidence ? `<button class="btn btn-xs btn-out" onclick="viewBukti('${r.id}')"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Lihat Bukti</button>` : '<span class="t3 txs">Tanpa Bukti</span>';

          return `<div class="izin-list-card">
            <div class="izin-list-h">
              ${typeBadge}
              <span class="tb7" style="color:var(--v);font-size:.9rem;text-align:center">${dateRange}</span>
            </div>
            <div class="izin-list-b">
              <div class="izin-list-info">
                <div style="font-size:1.15rem;font-weight:800;color:var(--tx1);">${r.reason||'—'}</div>
                <div class="t3 txs flex gap1" style="font-weight:600;align-items:center">Status: ${statusBadge}</div>
              </div>
              <div class="izin-list-action flex gap1" style="align-items:center;">
                ${buktiBtn}
              </div>
            </div>
          </div>`;
        }).join('');
  } else {
    tb.innerHTML=list.map(r=>`<tr>
      <td style="font-weight:700">${r.student_name||'—'}</td>
      <td class="t2">${r.class_name||'—'}</td>
      <td><span class="bdg ${r.type==='sakit'?'ba':'bv'}">${r.type==='sakit'?'<img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Sakit':'<img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Izin'}</span></td>
      <td>${r.start_date}${r.end_date&&r.end_date!==r.start_date?' → '+r.end_date:''}</td>
      <td class="t2 tsm" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.reason||'—'}</td>
      <td>${r.evidence?`<button class="btn btn-xs btn-out" onclick="viewBukti('${r.id}')"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Lihat</button>`:'<span class="t3 txs">Tanpa Bukti</span>'}</td>
      <td><span class="bdg ${r.status==='approved'?'bg':r.status==='rejected'?'br':'ba'}">${r.status==='approved'?'<img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Disetujui':r.status==='rejected'?'<span style="font-weight:bold;margin:0 4px">✕</span> Ditolak':'<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Pending'}</span></td>
      <td>${!isSiswa&&r.status==='pending'?`<div class="flex gap1">
        <button class="btn btn-xs btn-grn" onclick="approveIzin('${r.id}')"><img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle"></button>
        <button class="btn btn-xs btn-red" onclick="rejectIzin('${r.id}')"><span style="font-weight:bold;margin:0 4px">✕</span></button>
      </div>`:(isSiswa&&r.status==='pending'?'<span class="t3 txs">Menunggu...</span>':'—')}</td>
    </tr>`).join('')||`<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--tx3)">Belum ada pengajuan</td></tr>`;
  }
  
  const pc=list.filter(r=>r.status==='pending').length;
  const bdg=id('izinBdg'); if(bdg){bdg.textContent=pc;bdg.style.display=(!isSiswa&&pc>0)?'':'none';}
  const bdgS=id('izinBdgSiswa'); if(bdgS){bdgS.textContent=pc;bdgS.style.display=(isSiswa&&pc>0)?'':'none';}
  window._lastPermits=list;
}

function viewBukti(eid){
  const p = window._lastPermits?.find(x => x.id == eid);
  if(p && p.evidence){
    const win = window.open();
    win.document.write(`<iframe src="${p.evidence}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  } else {
    showToast('Bukti tidak ditemukan', 'warning');
  }
}

async function submitIzin(e){
  e.preventDefault();
  const uid=App.profile?.id;
  const { data: stu } = await supabase.from('students').select('*').eq('user_id', uid).single();
  const file=id('izinFile')?.files[0];
  let evidence=null;
  if(file){
    if(file.size>2*1024*1024) return showToast('File terlalu besar! Maks 2MB','warning');
    evidence=await fileToBase64(file);
  }

  const { error } = await supabase.from('permits').insert([{
    student_id: uid,
    student_name: App.profile?.name || stu?.name || '',
    class_name: stu?.class_name || '',
    nisn: stu?.nisn || '',
    type: id('izinType').value,
    start_date: id('izinStart').value,
    end_date: id('izinEnd').value || id('izinStart').value,
    reason: id('izinReason').value.trim(),
    evidence,
    status: 'pending'
  }]);

  if (!error) {
    showToast('Pengajuan berhasil dikirim!','success'); closeMdl('izinMdl'); izin();
  } else {
    showToast('Gagal mengirim: ' + error.message, 'error');
  }
}

async function approveIzin(eid){
  const { error } = await supabase.from('permits').update({ 
    status: 'approved',
    approved_by: App.profile.id,
    approved_at: new Date().toISOString()
  }).eq('id', eid);
  if (!error) {
    showToast('Disetujui!','success'); izin();
  } else {
    showToast('Gagal: ' + error.message, 'error');
  }
}

async function rejectIzin(eid){
  const r=prompt('Alasan penolakan:');
  if(r===null) return;
  const { error } = await supabase.from('permits').update({ 
    status: 'rejected', 
    rejection_reason: r,
    rejected_by: App.profile.id 
  }).eq('id', eid);
  if (!error) {
    showToast('Ditolak','warning'); izin();
  } else {
    showToast('Gagal: ' + error.message, 'error');
  }
}

/* 8. LAPORAN & EKSPOR */
async function laporan(){
  setHdr('Laporan Global','Rekapitulasi absensi sekolah keseluruhan');
  await fillClassSel('lapClass', true);
  const d=new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  const str = d.toISOString().slice(0,10);
  id('lapFrom').value = str;
  id('lapTo').value = str;
}

async function genLaporan(){
  const cls=id('lapClass')?.value,fr=id('lapFrom')?.value,to=id('lapTo')?.value;
  if(!fr||!to) return showToast('Pilih rentang tanggal!','warning');
  const tb=id('lapTbody');
  if(tb) tb.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem"><div class="spin" style="margin:auto"></div></td></tr>`;
  
  const fromKey=fr.replace(/-/g,'_'),toKey=to.replace(/-/g,'_');
  let query = supabase.from('attendance').select('*').gte('date_key', fromKey).lte('date_key', toKey);
  if(cls) query = query.eq('class_id', cls);
  
  const { data, error } = await query;
  const all = Array.isArray(data) ? data : [];
  
  const sum={hadir:0,terlambat:0,izin:0,sakit:0,alpha:0};
  all.forEach(v=>{if(sum[v.status]!==undefined)sum[v.status]++;});
  const tot=Object.values(sum).reduce((a,b)=>a+b,0)||1;
  Object.entries(sum).forEach(([k,v])=>{
    const b=id('br_'+k); if(b) b.style.width=Math.round(v/tot*100)+'%';
    const n=id('bn_'+k); if(n) n.textContent=v;
  });
  if(!tb) return; window._lapData=all;
  if(!all.length){tb.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--tx3)">Tidak ada data</td></tr>`;return;}
  tb.innerHTML=all.map(r=>`<tr>
    <td class="t2 tsm">${(r.date_key||'').replace(/_/g,'-')}</td>
    <td style="font-weight:600">${r.name||'—'}</td>
    <td class="t2">${r.nisn||'—'}</td><td>${r.class_name||''}</td>
    <td class="t2">${r.subject||'—'}</td><td>${ftm(r.time)}</td><td>${mkBadge(r.status)}</td>
  </tr>`).join('');
  showToast(`${all.length} data ditemukan`,'success');
}

function exportLaporan(){
  const d=window._lapData; if(!d?.length) return showToast('Generate laporan dulu!','warning');
  const h='Tanggal,Nama,NISN,Kelas,Mapel,Jam,Status\n';
  const rows=d.map(r=>`${(r.date_key||'').replace(/_/g,'-')},${r.name||''},${r.nisn||''},${r.class_name||''},${r.subject||''},${ftm(r.time)},${r.status||''}`).join('\n');
  dl(h+rows,'laporan_'+Date.now()+'.csv');
}

/* 9. PENGUMUMAN */
async function pengumuman(){
  setHdr('Pengumuman','Informasi penting untuk seluruh warga sekolah');
  const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
  const items = Array.isArray(data) ? data : [];
  const w=id('annWrap'); if(!w) return;
  w.innerHTML=items.map(a=>`
    <div class="ann ${a.priority==='penting'?'warn':a.priority==='info'?'info':''}">
      <div class="fbet mb1">
        <div class="ann-t">${a.title}</div>
        <button class="btn btn-xs btn-red" onclick="delAnn('${a.id}')" data-r="admin,guru"><img src="image/trash.png" style="width:1.2em;height:1.2em;vertical-align:middle"></button>
      </div>
      <div class="ann-b">${a.body}</div>
      <div class="ann-m"><span><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle"> ${fdt(a.created_at)}</span><span><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle"> ${a.author||'Admin'}</span><span class="bdg bn" style="font-size:.62rem">${a.priority||'Umum'}</span></div>
    </div>`).join('')||`<div class="t3 tsm">Belum ada pengumuman</div>`;
  applyRoles();
}

async function saveAnn(e){
  e.preventDefault();
  const { error } = await supabase.from('announcements').insert([{
    title: id('annTitle').value.trim(),
    body: id('annBody').value.trim(),
    priority: id('annPrio').value,
    author: App.profile?.name || 'Admin'
  }]);
  
  if (!error) {
    showToast('Pengumuman dipublikasikan!','success'); closeMdl('annMdl'); pengumuman();
  } else {
    showToast('Gagal: ' + error.message, 'error');
  }
}

async function delAnn(eid){ 
  if(!confirm('Hapus pengumuman?')) return; 
  const { error } = await supabase.from('announcements').delete().eq('id', eid);
  if (!error) {
    showToast('Dihapus','success'); pengumuman();
  } else {
    showToast('Gagal: ' + error.message, 'error');
  }
}
