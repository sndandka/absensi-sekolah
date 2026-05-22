/* ═══════════════════════════════════════════════
   SiAbsen SMK - Dashboard  (dashboard.js) - Supabase Version
   ═══════════════════════════════════════════════ */

async function dashboard() {
  const r = App.profile?.role || 'siswa';
  
  let sub = 'Ringkasan aktivitas Anda hari ini';
  if (r === 'admin') sub = 'Ringkasan aktivitas sistem absensi hari ini';
  else if (r === 'guru') sub = 'Ringkasan aktivitas mengajar hari ini';
  else if (r === 'siswa') sub = 'Portal Kehadiran Siswa SiAbsen';
  setHdr('Dashboard', sub);

  if(r === 'admin') await dashAdmin();
  else if(r === 'guru') await dashGuru();
  else if(r === 'siswa') await dashSiswa();
}

async function dashGuru() {
  const nm = id('dashGuruName'), ph = id('dashGuruPhoto'), mp = id('dashGuruMapel');
  if (nm) nm.textContent = App.profile.name || 'Guru';
  if (ph) ph.src = App.profile.photo || 'image/user.png';
  
  const tId = await getTeacherId();
  if (tId && mp) {
    const { data: tea } = await supabase.from('teachers').select('subject').eq('id', tId).single();
    if (tea && tea.subject) mp.textContent = 'Guru ' + tea.subject;
  }

  await updateGuruDash();
  await renderAnnounces('dashAnnGuru');
  renderMiniCal('miniCalGuru');
}

/* ── ADMIN / GURU DASHBOARD ─────────────────────────────── */
async function dashAdmin(){
  const today = key();
  
  const updateStats = async () => {
    // Hadir
    const { count: h } = await supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('date_key', today).eq('subject_key', 'pagi').eq('status', 'hadir');
    sv('dH', h || 0);
    // Alpha
    const { count: a } = await supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('date_key', today).eq('subject_key', 'pagi').eq('status', 'alpha');
    sv('dA', a || 0);
    // Izin/Sakit
    const { count: i } = await supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('date_key', today).eq('subject_key', 'pagi').in('status', ['izin', 'sakit']);
    sv('dI', i || 0);
    // Terlambat
    const { count: t } = await supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('date_key', today).eq('subject_key', 'pagi').eq('status', 'terlambat');
    sv('dT', t || 0);

    // Recent
    const { data: recent } = await supabase.from('attendance').select('*').eq('date_key', today).eq('subject_key', 'pagi').order('time', { ascending: false }).limit(8);
    renderRecentAtt(recent);
  };

  await updateStats();
  
  // total siswa
  const { count: sCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
  sv('dSiswa', sCount || 0);

  // pending permits
  const { count: pc } = await supabase.from('permits').select('*', { count: 'exact', head: true }).eq('status', 'pending');
  sv('dIzin', pc || 0);
  const bdg=id('izinBdg'); if(bdg){bdg.textContent=pc||0; bdg.style.display=(pc && pc>0)?'':'none';}

  await drawWeekChart();
  await renderAnnounces('dashAnnAdmin');
  renderMiniCal('miniCalAdmin');
  
  // Auto-refresh every 30s
  const iv = setInterval(updateStats, 30000);
  App.listeners.push(()=>clearInterval(iv));
}

function sv(elId,val){ const e=id(elId); if(e) e.textContent=val; }

async function drawWeekChart(){
  const wrap=id('weekChart'); if(!wrap) return;
  
  // Fetch last 7 days of attendance
  // Note: For a real app, this should be a grouped query. 
  // Here we'll do a simple mock or fetch last 50 and group by day.
  const { data: rows } = await supabase.from('attendance').select('date_key, status').eq('subject_key', 'pagi').limit(200);
  
  const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  const chartData = [];
  const now = new Date();
  for(let i=6; i>=0; i--) {
    const d = new Date(); d.setDate(now.getDate() - i);
    const dk = d.getFullYear() + '_' + String(d.getMonth()+1).padStart(2,'0') + '_' + String(d.getDate()).padStart(2,'0');
    const count = (rows || []).filter(r => r.date_key === dk && (r.status === 'hadir' || r.status === 'terlambat')).length;
    chartData.push({ lbl: days[d.getDay()], count });
  }

  const counts = chartData.map(d=>d.count);
  const mx=Math.max(...counts,1);
  const clrs=['#8b5cf6','#6366f1','#8b5cf6','#3b82f6','#8b5cf6','#10b981','#10b981'];
  wrap.innerHTML=`
    <div class="bars">
      ${counts.map((c,i)=>`<div class="bar" style="height:${Math.max(4,c/mx*100)}%;background:${clrs[i]}">
        <div class="brtip">${chartData[i].lbl}: ${c} hadir</div>
      </div>`).join('')}
    </div>
    <div class="brlbls">${chartData.map(d=>`<div class="brlbl">${d.lbl}</div>`).join('')}</div>`;
}

function renderRecentAtt(rows){
  const tbody=id('dashTbody'); if(!tbody) return;
  if(!Array.isArray(rows)) rows=[];
  const top=rows.slice(0,8);
  if(!top.length){ tbody.innerHTML=`<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--tx3)">Belum ada absensi hari ini</td></tr>`; return; }
  tbody.innerHTML=top.map(r=>`<tr>
    <td><div class="flex gap1" style="align-items:center">
      <div class="att-av ${r.status||'none'} av-${r.status||'default'}" style="width:30px;height:30px;font-size:.72rem;flex-shrink:0">${(r.name||'?').substring(0,2).toUpperCase()}</div>
      <span style="font-weight:600">${r.name||'-'}</span>
    </div></td>
    <td class="t2">${r.class_name||'-'}</td>
    <td>${ftm(r.time)}</td>
    <td class="t2 tsm">${r.subject||'-'}</td>
    <td>${mkBadge(r.status)}</td>
  </tr>`).join('');
}

/* ── SISWA DASHBOARD ───────────────────────────────────── */
async function dashSiswa(){
  const uid=App.profile.id;
  const { data: stu } = await supabase.from('students').select('*').eq('user_id', uid).single();
  
  // Get settings
  const { data: sRows } = await supabase.from('settings').select('*');
  const sets = {}; if (sRows) sRows.forEach(r => sets[r.setting_key] = r.setting_value);
  
  // Fill Header
  if (stu) {
    const gn = id('dashSiswaGreeting');
    const fullName = stu.name || App.profile.name || '';
    const firstName = fullName.split(' ')[0];
    if (gn) gn.textContent = `Halo, ${firstName}!`;
  }
  id('dashSchoolStart').textContent = sets.startHour || '07:00';

  // Today Attendance
  const today=key();
  const { data: ta } = await supabase
    .from('attendance')
    .select('*')
    .eq('date_key', today)
    .eq('student_user_id', uid)
    .eq('subject_key', 'pagi')
    .maybeSingle();
  
  const stEl = id('dashSiswaStatus');
  const tmEl = id('dashSiswaTime');
  if(ta) {
    stEl.textContent = 'Sudah Absen';
    stEl.className = 'bdg bg';
    tmEl.textContent = ftm(ta.time);
  } else {
    stEl.textContent = 'Belum Absen';
    stEl.className = 'bdg br';
    tmEl.textContent = '--:--';
  }

  // Hitung Hadir Bulan Ini
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const fromKey = `${y}_${m}_01`;
  const toKey = `${y}_${m}_31`;
  const { count: hadirCount } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('student_user_id', uid)
    .in('status', ['hadir', 'terlambat'])
    .gte('date_key', fromKey)
    .lte('date_key', toKey);
  const hadirEl = id('dashSiswaHadir');
  if (hadirEl) hadirEl.textContent = hadirCount || 0;

  await renderAnnounces('dashAnnSiswa');
  renderMiniCal('miniCalSiswa');
}




/* ── ANNOUNCEMENTS ──────────────────────────────────────── */
async function renderAnnounces(wrId){
  const wrap=id(wrId); if(!wrap) return;
  const { data: items, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  if(!Array.isArray(items) || !items.length){ wrap.innerHTML=`<div class="t3 tsm">Belum ada pengumuman</div>`; return; }
  wrap.innerHTML=items.map(a=>`
    <div class="ann ${a.priority==='penting'?'warn':a.priority==='info'?'info':''}">
      <div class="ann-t">${a.title}</div>
      <div class="ann-b">${a.body}</div>
      <div class="ann-m"><span><img src="image/jadwal_pelajaran.png" style="width:1.2em;height:1.2em;vertical-align:middle"> ${fdt(a.created_at)}</span><span><img src="image/user.png" style="width:1.2em;height:1.2em;vertical-align:middle"> ${a.author||'Admin'}</span></div>
    </div>`).join('');
}

/* ── MINI CALENDAR ─────────────────────────────────────── */
let calDate=new Date();
async function renderMiniCal(elId = 'miniCal'){
  const wrap=id(elId); if(!wrap) return;
  const y=calDate.getFullYear(),m=calDate.getMonth();
  const today=new Date();
  const mn=calDate.toLocaleDateString('id-ID',{month:'long',year:'numeric'});
  const fd=new Date(y,m,1).getDay(), dim=new Date(y,m+1,0).getDate();
  
  let attMap = {};
  if(elId === 'miniCalSiswa' && App.profile?.role === 'siswa') {
    const from = `${y}_${String(m+1).padStart(2,'0')}_01`;
    const to = `${y}_${String(m+1).padStart(2,'0')}_${dim}`;
    const { data } = await supabase
      .from('attendance')
      .select('date_key, status')
      .eq('student_user_id', App.profile.id)
      .gte('date_key', from)
      .lte('date_key', to);
      
    if(Array.isArray(data)) data.forEach(a => attMap[a.date_key] = a.status);
  }

  const dows=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  let g=dows.map(d=>`<div class="mcal-dow">${d}</div>`).join('');
  for(let i=0;i<fd;i++) g+=`<div class="mcal-day other"></div>`;
  for(let d=1;d<=dim;d++){
    const isTd=d===today.getDate()&&m===today.getMonth()&&y===today.getFullYear();
    const dk = `${y}_${String(m+1).padStart(2,'0')}_${String(d).padStart(2,'0')}`;
    const status = attMap[dk];
    let dot = '';
    if(status) {
        const colors = {hadir:'var(--grn)', terlambat:'var(--amb)', izin:'var(--v)', sakit:'var(--amb)', alpha:'var(--red)'};
        dot = `<div style="width:4px;height:4px;border-radius:50%;background:${colors[status]||'#ccc'};margin:2px auto 0"></div>`;
    }
    g+=`<div class="mcal-day${isTd?' today':''}">${d}${dot}</div>`;
  }
  wrap.innerHTML=`
    <div class="mcal-head">
      <button class="mcal-nav" onclick="shiftCal(-1, '${elId}')">‹</button>
      <div class="mcal-month">${mn}</div>
      <button class="mcal-nav" onclick="shiftCal(1, '${elId}')">›</button>
    </div>
    <div class="mcal-grid">${g}</div>`;
}

function shiftCal(v, elId){
  calDate.setMonth(calDate.getMonth()+v);
  renderMiniCal(elId);
}
