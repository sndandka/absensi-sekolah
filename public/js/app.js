/* ═══════════════════════════════════════════════
   SiAbsen — Core App  (app.js) — Supabase Version
   ═══════════════════════════════════════════════ */

const id = i => document.getElementById(i);
const key = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10).replace(/-/g, '_'); };
const ftm = (ms) => ms ? new Date(ms).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '—';
const fdt = (ms) => ms ? new Date(ms).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const App = { user: null, profile: null, page: '', listeners: [], attBuf: {} };

// ── Supabase is initialized in supabase_client.js ───────────


// ── SESSION CHECK (using Supabase Auth) ──────────────
async function checkSession() {
  const ld = id('loading');
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured yet. Please check public/js/supabase_client.js');
    ld?.classList.add('off');
    return;
  }

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (session && session.user) {
      App.user = session.user;

      // Fetch profile from public.profiles
      const { data: profile, error: profErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        App.profile = { ...profile, uid: profile.id };
        ld?.classList.add('off');
        id('authWrap').style.display = 'none';
        id('appWrap').style.display = 'flex';
        bootApp();
      } else {
        // Fallback if profile not found
        App.user = App.profile = null;
        ld?.classList.add('off');
        id('authWrap').style.display = 'flex';
      }
    } else {
      App.user = App.profile = null;
      ld?.classList.add('off');
      id('authWrap').style.display = 'flex';
      id('appWrap').style.display = 'none';
    }
  } catch (e) {
    console.error('Session check error:', e);
    // ── Refresh token invalid/not found — clear stale session ──
    const isTokenError = e?.code === 'refresh_token_not_found' ||
      e?.message?.toLowerCase().includes('refresh token');
    if (isTokenError) {
      console.warn('Invalid refresh token detected — signing out and clearing session.');
      await supabase.auth.signOut().catch(() => {});
    }
    App.user = App.profile = null;
    ld?.classList.add('off');
    id('authWrap').style.display = 'flex';
    id('appWrap').style.display = 'none';
  }
}
// Run on page load
checkSession();

// ── Auth state listener — handles mid-session token expiry ──
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
    // Session expired or refresh token was invalidated
    App.user = App.profile = null;
    id('authWrap').style.display = 'flex';
    id('appWrap').style.display = 'none';
    showToast('Sesi Anda telah berakhir. Silakan login kembali.', 'warning', 5000);
  }
});

function bootApp() {
  renderSbUser();
  applyRoles();
  loadSchoolName();
  navigateTo('dashboard');
  watchNotifs();
  tick(); setInterval(tick, 1000);
}

// ── SIDEBAR USER ────────────────────────────────────────
function renderSbUser() {
  const p = App.profile; if (!p) return;
  
  // Sidebar User (Legacy)
  const el = id('sbUser');
  if (el) {
    const init = (p.name || 'U').substring(0, 2).toUpperCase();
    const cls = { admin: 'a', guru: 'g' }[p.role] || '';
    el.innerHTML = `
      <div class="sb-av ${cls}" style="${p.photo ? `background:none;border:none;padding:0;overflow:hidden;` : ''}">
        ${p.photo ? `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover">` : init}
      </div>
      <div style="flex:1;min-width:0">
        <div class="sb-uname">${p.name || 'Pengguna'}</div>
        <div class="sb-urole">${roleLbl(p.role)}</div>
      </div>
      <button class="sb-out" onclick="doLogout()" title="Keluar">⏻</button>`;
  }

  // Topbar User (New Tasko UI)
  const tbAvatar = id('tbAvatar');
  if (tbAvatar && p.photo) tbAvatar.src = p.photo;
  const tbName = id('tbName');
  if (tbName) tbName.textContent = p.name || 'Pengguna';
  const tbEmail = id('tbEmail');
  if (tbEmail && App.user) tbEmail.textContent = App.user.email || p.role || '';
}

function roleLbl(r) {
  return { admin: '<img src="image/user.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Administrator', guru: '<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Guru/Wali Kelas', siswa: '<img src="image/user.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Siswa' }[r] || r || '—';
}

async function loadSchoolName() {
  const { data, error } = await supabase
    .from('settings')
    .select('setting_value')
    .eq('setting_key', 'schoolName')
    .single();

  const name = (data && data.setting_value) || 'SiAbsen Sekolah';
  const el = id('sbSchoolName'); if (el) el.textContent = name;
}

// ── ROLE VISIBILITY ────────────────────────────────────
function applyRoles() {
  const r = App.profile?.role || 'siswa';
  document.querySelectorAll('[data-r]').forEach(el => {
    const allowed = el.dataset.r.split(',').map(x => x.trim());
    el.style.display = allowed.includes(r) ? '' : 'none';
  });
}

// ── ROUTING ────────────────────────────────────────────
function navigateTo(pg) {
  if (App.page === 'camera' && pg !== 'camera') { try { stopCam(); } catch (e) { } }
  App.listeners.forEach(f => f()); App.listeners = [];
  App.attBuf = {};

  document.querySelectorAll('.nav').forEach(el =>
    el.classList.toggle('on', el.dataset.pg === pg));
  document.querySelectorAll('.page').forEach(el =>
    el.classList.toggle('on', el.id === 'pg-' + pg));

  App.page = pg; closeSb();

  const handlers = {
    dashboard, absensi, rekap, siswa, guru, kelas, mapel,
    izin, pengumuman, profil, settings, camera, verifikasi,
    users: fetchUsers, jurnal, jadwal,
    rekap_sekolah: rekapSekolah,
    rekap_mapel: rekapMapel
  };
  handlers[pg]?.();
}

// ── REKAP SEKOLAH PAGE HANDLER ─────────────────────────
async function rekapSekolah() {
  setHdr('Rekap Absensi Sekolah', 'Pantau kehadiran siswa pada absensi pagi');
  
  // Populate class filter
  const selCls = id('rekSekolahClass');
  if (selCls && !selCls.dataset.loaded) {
    const { data: classes } = await supabase.from('classes').select('*').order('name');
    if (Array.isArray(classes)) {
      selCls.innerHTML = '<option value="">Semua Kelas</option>' +
        classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
    selCls.dataset.loaded = 'true';
  }
  
  // Set default date to today
  const dtInput = id('rekSekolahDate');
  if (dtInput && !dtInput.value) {
    dtInput.value = new Date().toISOString().split('T')[0];
  }
  
  // Auto load data
  loadRekapSekolah();
}

// ── REKAP MAPEL PAGE HANDLER ───────────────────────────
async function rekapMapel() {
  setHdr('Rekap Absensi Mapel', 'Pantau kehadiran siswa pada mata pelajaran');
  
  // Populate class filter
  const selCls = id('rekMapelClass');
  if (selCls && !selCls.dataset.loaded) {
    const { data: classes } = await supabase.from('classes').select('*').order('name');
    if (Array.isArray(classes)) {
      selCls.innerHTML = '<option value="">Semua Kelas</option>' +
        classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
    selCls.dataset.loaded = 'true';
  }
  
  // Populate subject filter
  const selSubj = id('rekMapelSubject');
  if (selSubj && !selSubj.dataset.loaded) {
    const { data: subjects } = await supabase.from('subjects').select('*').order('name');
    if (Array.isArray(subjects)) {
      selSubj.innerHTML = '<option value="">Semua Mapel</option>' +
        subjects.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
    }
    selSubj.dataset.loaded = 'true';
  }
  
  // Set default date to today
  const dtInput = id('rekMapelDate');
  if (dtInput && !dtInput.value) {
    dtInput.value = new Date().toISOString().split('T')[0];
  }
  
  // Auto load data
  loadRekapMapel();
}

// ── LOGOUT (using Supabase) ──────────────────────────
async function doLogout() {
  if (!confirm('Yakin ingin keluar?')) return;
  try {
    await logAct('logout', 'User logout');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    App.user = App.profile = null;
    id('authWrap').style.display = 'flex';
    id('appWrap').style.display = 'none';
    showToast('Berhasil keluar.', 'success');
  } catch (e) {
    showToast('Gagal keluar: ' + e.message, 'error');
  }
}

// ── CLOCK ───────────────────────────────────────────────
function tick() {
  const el = id('clock'); if (!el) return;
  const n = new Date();
  el.textContent = n.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    + ' · ' + n.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ── NOTIFICATIONS ───────────────────────────────────────
async function watchNotifs() {
  if (!App.user) return;
  const update = async () => {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', App.user.id)
        .eq('is_read', false);

      const pip = id('notifPip'); if (!pip) return;
      pip.style.display = (count && count > 0) ? 'block' : 'none';
    } catch (e) { }
  };
  update();
  const iv = setInterval(update, 30000); // Poll every 30s
  App.listeners.push(() => clearInterval(iv));
}

// ── TOAST ───────────────────────────────────────────────
function showToast(msg, type = 'info', ms = 3500) {
  const ico = { success: '<img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))">', error: '<span style="font-weight:bold;margin:0 4px">✕</span>', warning: '<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))">', info: '<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))">' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span style="font-size:1.15rem">${ico[type] || '•'}</span><span>${msg}</span>`;
  id('toasts').appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 380); }, ms);
}

// ── ACTIVITY LOG ────────────────────────────────────────
async function logAct(action, detail) {
  if (!App.user) return;
  try {
    await supabase.from('activity_log').insert([{
      user_id: App.user.id,
      user_name: App.profile?.name || 'User',
      role: App.profile?.role || 'siswa',
      action,
      detail,
      ts: new Date().toISOString()
    }]);
  } catch (e) { }
}

// ── UTILS ────────────────────────────────────────────────
const SLbl = { hadir: 'Hadir', izin: 'Izin', sakit: 'Sakit', alpha: 'Alpha', terlambat: 'Terlambat' };
const SBdg = { hadir: 'bg', izin: 'bv', sakit: 'ba', alpha: 'br', terlambat: 'bp' };
const SIco = { hadir: '<img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))">', izin: '<img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))">', sakit: '<img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))">', alpha: '<span style="font-weight:bold;margin:0 4px">✕</span>', terlambat: '<img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))">' };

function mkBadge(s) {
  return `<span class="bdg ${SBdg[s] || 'bn'}">${SIco[s] || ''} ${SLbl[s] || s || '—'}</span>`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function setHdr(title, sub = '') {
  const t = id('tbTitle'), s = id('tbSub');
  if (t) t.textContent = title; if (s) s.textContent = sub;
}

async function getTeacherId() {
  if (App.profile?.role !== 'guru' && App.profile?.role !== 'admin') return null;
  if (App.profile?._tId) return App.profile._tId;
  
  let guruNip = App.user?.user_metadata?.nip;
  let query = supabase.from('teachers').select('id');
  
  if (guruNip) query = query.eq('nip', guruNip);
  else query = query.eq('user_id', App.profile.id);
  
  const { data } = await query.maybeSingle();
  if (data) App.profile._tId = data.id;
  return data ? data.id : null;
}

// ── MODAL ────────────────────────────────────────────────
function openMdl(x) { id(x)?.classList.add('on'); }
function closeMdl(x) { id(x)?.classList.remove('on'); }

function dl(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('ov')) e.target.classList.remove('on');
});

// ── SIDEBAR TOGGLE ───────────────────────────────────────
function toggleSb() { id('sidebar')?.classList.toggle('on'); }
function closeSb() { id('sidebar')?.classList.remove('on'); }
document.addEventListener('click', e => {
  const sb = id('sidebar');
  if (sb?.classList.contains('on') && !sb.contains(e.target) && !e.target.closest('.sb-tgl'))
    sb.classList.remove('on');
});

// ── CLASS / SUBJECT SELECTS ──────────────────────────────
async function fillClassSel(selId, inclAll = false) {
  const { data: classes, error } = await supabase
    .from('classes')
    .select('*')
    .eq('active', true)
    .order('name', { ascending: true });

  const el = id(selId); if (!el) return;
  el.innerHTML = inclAll ? '<option value="">— Semua Kelas —</option>' : '<option value="">— Pilih Kelas —</option>';
  if (Array.isArray(classes)) {
    classes.forEach(c => { el.innerHTML += `<option value="${c.id}">${c.name}</option>`; });
  }
}
async function fillSubjSel(selId) {
  const { data: subjects, error } = await supabase
    .from('subjects')
    .select('*')
    .order('name', { ascending: true });

  const el = id(selId); if (!el) return;
  el.innerHTML = '<option value="">— Pilih Mapel —</option>';
  if (Array.isArray(subjects)) {
    subjects.forEach(s => { el.innerHTML += `<option value="${s.id}">${s.name}</option>`; });
  }
}
