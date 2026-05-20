/* SiAbsen — Modul Profil, Settings, Log, Camera (MySQL) */

/* 10. PROFIL */
/* 10. PROFIL */
async function profil() {
  setHdr('Profil Saya', 'Akun & data pribadi');
  const uid = App.profile?.id; if (!uid) return;

  // Fetch profile from Supabase
  const { data: u, error: uErr } = await supabase.from('profiles').select('*').eq('id', uid).single();
  if (uErr) return console.error('Fetch profile error:', uErr);

  let extra = {}, classes = [];
  if (u.role === 'siswa') {
    const { data: stu } = await supabase.from('students').select('*').eq('user_id', uid).single();
    extra = stu || {};
    const { data: cList } = await supabase.from('classes').select('*').eq('active', true);
    classes = Array.isArray(cList) ? cList : [];
  } else if (u.role === 'guru') {
    const { data: tea } = await supabase.from('teachers').select('*').eq('user_id', uid).single();
    extra = tea || {};
  }

  const w = id('profilWrap'); if (!w) return;
  const isSiswa = u.role === 'siswa';
  w.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--v),var(--v1));border-radius:1.5rem;padding:2rem;color:#fff;display:flex;align-items:center;gap:1.5rem;box-shadow:var(--s2);margin-bottom:2rem;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-20px;right:-20px;font-size:8rem;opacity:0.1;pointer-events:none"><img src="image/user.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"></div>
      <div style="position:relative;flex-shrink:0;">
        <div class="prof-av" id="profAvatar" style="background:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.4);width:100px;height:100px;font-size:2.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;" onclick="document.getElementById('pPhotoInput').click()">
          ${u.photo ? `<img src="${u.photo}" style="width:100%;height:100%;object-fit:cover">` : (u.name || '?').substring(0, 2).toUpperCase()}
        </div>
        <div style="position:absolute;bottom:0;right:0;background:var(--amb);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:3px solid var(--v);cursor:pointer" onclick="document.getElementById('pPhotoInput').click()"><img src="image/camera.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"></div>
        <input type="file" id="pPhotoInput" style="display:none" accept="image/*" onchange="previewAndSavePhoto(this)">
      </div>
      <div style="z-index:1">
        <div style="font-size:1.5rem;font-weight:900;">${u.name || 'Pengguna'}</div>
        <div style="font-size:0.9rem;opacity:0.9;">${u.email}</div>
        <div class="bdg bv" style="margin-top:0.5rem;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.3);color:#fff;display:inline-block;">${roleLbl(u.role)}</div>
      </div>
    </div>
    <div class="g2">
      <div class="card"><div class="card-h"><div class="card-t"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Data Diri</div></div><div class="card-b">
        <form onsubmit="saveStudentProfil(event)">
          <div class="fg"><label class="fl">Nama Lengkap</label><input id="pName" type="text" class="fi" value="${u.name || ''}" required></div>
          ${isSiswa ? `<div class="fg"><label class="fl">Kelas (Informasi)</label><select id="pClsId" class="fi" disabled><option value="">Pilih Kelas</option>${classes.map(c => `<option value="${c.id}" ${extra.class_id == c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>
          <div class="fg"><label class="fl">Nomor Absen (Informasi)</label><input id="pNo" type="number" class="fi" value="${extra.no || ''}" disabled></div>
          <div class="fg"><label class="fl">NISN (Informasi)</label><input type="text" class="fi" value="${extra.nisn || ''}" disabled></div>` : ''}
          ${u.role === 'guru' ? `<div class="fg"><label class="fl">NIP (Informasi)</label><input type="text" class="fi" value="${extra.nip || ''}" disabled></div>
          <div class="fg"><label class="fl">Mata Pelajaran (Informasi)</label><input type="text" class="fi" value="${extra.subject || ''}" disabled></div>` : ''}
          <button type="submit" class="btn btn-pri wf mt1"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Simpan Perubahan</button>
        </form>
      </div></div>
      <div class="card"><div class="card-h"><div class="card-t"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Keamanan</div></div><div class="card-b">
        <div class="card-t mb2" style="font-size:1rem">Ganti Password</div>
        <form onsubmit="changePw(event)">
          <div class="fg"><label class="fl">Password Baru</label><input id="pwNew" type="password" class="fi" placeholder="Min. 6 karakter" required></div>
          <div class="fg"><label class="fl">Konfirmasi</label><input id="pwConf" type="password" class="fi" placeholder="Ulangi password" required></div>
          <button type="submit" class="btn btn-out wf">Update Password</button>
        </form>
      </div></div>
    </div>
    ${isSiswa ? `<div class="card mt2" style="border:2px dashed var(--v2);background:var(--v3);">
      <div class="card-h"><div class="card-t"><img src="image/camera.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Verifikasi Wajah (AI Face Recognition)</div></div>
      <div class="card-b">
        <div class="fcen" style="flex-direction:column;gap:1.5rem;padding:1.5rem 0;">
          <!-- Face Status Badge -->
          <div id="faceStatus" class="flex gap1" style="align-items:center;background:#fff;padding:0.8rem 1.2rem;border-radius:1rem;box-shadow:var(--s1);text-align:center;">
            ${extra.face_data
        ? '<span style="color:var(--grn);display:flex;align-items:center;gap:6px"><img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Wajah Terdaftar (' + (function () { try { var p = JSON.parse(extra.face_data); return Array.isArray(p[0]) ? p.length + ' Pose' : '1 Pose'; } catch (e) { return '?'; } })() + ')</span>'
        : '<span style="color:var(--red);display:flex;align-items:center;gap:6px"><span style="font-weight:bold;margin:0 4px">✕</span> Wajah Belum Terdaftar</span>'
      }
          </div>

          <!-- Instructional Text -->
          <div style="text-align:center;max-width:340px;font-size:0.8rem;color:var(--tx3);line-height:1.6;">
            Sistem akan merekam wajah dari <b>3 sudut</b> (Depan, Kiri, Kanan) menggunakan AI Tiny Face Detector untuk kecepatan optimal.
          </div>

          <!-- Camera Viewport -->
          <div id="camWrap" style="display:none;position:relative;width:100%;max-width:320px;aspect-ratio:3/4;background:#111;border-radius:1.5rem;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.2);">
            <video id="pVid" autoplay muted playsinline style="width:100%;height:100%;object-fit:cover;transform:scaleX(-1);"></video>
            <canvas id="pCan" style="display:none"></canvas>
            <!-- Face Guide Overlay -->
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;">
              <div style="width:80%;aspect-ratio:1;border:3px dashed rgba(255,255,255,0.4);border-radius:50%;box-shadow:0 0 0 9999px rgba(0,0,0,0.25);"></div>
            </div>
            <!-- Pose indicator at bottom -->
            <div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.6);color:#fff;padding:4px 14px;border-radius:20px;font-size:0.72rem;font-weight:600;backdrop-filter:blur(4px);">
              Posisikan wajah di lingkaran
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap1" style="flex-wrap:wrap;justify-content:center;">
            <button id="btnStartEnroll" class="btn btn-pri" onclick="startFaceEnroll()"><img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> ${extra.face_data ? 'Daftarkan Ulang' : 'Daftarkan Wajah'}</button>
            <button id="btnSnap" class="btn btn-amb" style="display:none" onclick="snapFace()"><img src="image/camera.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Ambil Foto (4 Pose)</button>
            <button id="btnStopEnroll" class="btn btn-red btn-sm" style="display:none" onclick="stopEnrollCam()">✕ Batal</button>
          </div>
        </div>
      </div>
    </div>`: ''}`;
}

async function saveStudentProfil(e) {
  e.preventDefault();
  const uid = App.profile.id, name = id('pName').value.trim(), role = App.profile.role;
  try {
    // Update public.profiles
    const { error: err1 } = await supabase.from('profiles').update({ name }).eq('id', uid);
    if (err1) throw err1;

    if (role === 'siswa') {
      const { error: err2 } = await supabase.from('students').update({ name }).eq('user_id', uid);
      if (err2) throw err2;
    }

    App.profile.name = name; renderSbUser();
    showToast('Profil berhasil diperbarui!', 'success');
  } catch (err) { showToast(err.message, 'error'); }
}

async function previewAndSavePhoto(input) {
  const file = input.files[0]; if (!file) return;
  if (!file.type.startsWith('image/')) return showToast('Harus berupa gambar!', 'warning');
  if (file.size > 1024 * 1024) return showToast('File terlalu besar! Maks 1MB', 'warning');
  try {
    const base64 = await fileToBase64(file);
    id('profAvatar').innerHTML = `<img src="${base64}" style="width:100%;height:100%;object-fit:cover">`;

    const { error } = await supabase.from('profiles').update({ photo: base64 }).eq('id', App.profile.id);
    if (error) throw error;

    App.profile.photo = base64; renderSbUser();
    showToast('Foto profil berhasil diubah!', 'success');
  } catch (err) { showToast('Gagal: ' + err.message, 'error'); }
}

async function changePw(e) {
  e.preventDefault();
  const np = id('pwNew').value, cp = id('pwConf').value;
  if (np !== cp) return showToast('Password tidak cocok!', 'warning');
  if (np.length < 6) return showToast('Min. 6 karakter', 'warning');

  const { error } = await supabase.auth.updateUser({ password: np });
  if (error) return showToast(error.message, 'error');

  showToast('Password berhasil diubah!', 'success');
  id('pwNew').value = ''; id('pwConf').value = '';
}

/* 11. PENGATURAN */
let _settingsMap = null;
let _schoolMarker = null;
let _radiusCircle = null;

async function settings() {
  setHdr('Konfigurasi Sistem', 'Pengaturan global & parameter aplikasi');

  const { data: rows, error } = await supabase.from('settings').select('*');
  if (error) return console.error('Fetch settings error:', error);

  const s = {};
  rows.forEach(r => s[r.setting_key] = r.setting_value);

  id('setSchool').value = s.schoolName || ''; id('setAddr').value = s.schoolAddress || '';
  id('setPhone').value = s.schoolPhone || ''; id('setEmail').value = s.schoolEmail || '';
  id('setPrincipal').value = s.principalName || ''; id('setYear').value = s.academicYear || '';
  id('setSem').value = s.semester || 'Ganjil'; id('setStart').value = s.startHour || '07:00';
  id('setEnd').value = s.endHour || '15:30'; id('setLate').value = s.lateThreshold || 15;
  id('setLat').value = s.schoolLat || ''; id('setLng').value = s.schoolLng || '';
  id('setRadius').value = s.maxRadius || 50;

  const h = s.holidays ? s.holidays.split(',') : ['0'];
  Array.from(id('setHolidays').options).forEach(opt => opt.selected = h.includes(opt.value));

  // Initialize map — use longer delay so page CSS animation finishes first
  setTimeout(() => initSettingsMap(s.schoolLat, s.schoolLng, s.maxRadius || 50), 350);
}

async function saveSettings(e) {
  e.preventDefault();
  const holidays = Array.from(id('setHolidays').selectedOptions).map(opt => opt.value).join(',');
  const payload = {
    schoolName: id('setSchool').value.trim(), schoolAddress: id('setAddr').value.trim(),
    schoolPhone: id('setPhone').value.trim(), schoolEmail: id('setEmail').value.trim(),
    principalName: id('setPrincipal').value.trim(), academicYear: id('setYear').value.trim(),
    semester: id('setSem').value, startHour: id('setStart').value,
    endHour: id('setEnd').value, lateThreshold: id('setLate').value,
    schoolLat: id('setLat').value.trim(), schoolLng: id('setLng').value.trim(),
    maxRadius: id('setRadius').value, holidays
  };

  for (const key in payload) {
    await supabase.from('settings').upsert({ setting_key: key, setting_value: payload[key] });
  }

  showToast('Pengaturan disimpan!', 'success'); logAct('settings', 'Update pengaturan');
}

// ── Leaflet Map Helpers ─────────────────────────────────────
function initSettingsMap(lat, lng, radius) {
  const mapEl = id('settingsMap');
  if (!mapEl || typeof L === 'undefined') return;

  // Default: center of Indonesia if no coords yet
  const defLat = parseFloat(lat) || -6.2;
  const defLng = parseFloat(lng) || 106.816;
  const defRadius = parseFloat(radius) || 50;
  const hasCoords = !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));

  // Destroy old map instance if exists (page re-visits)
  if (_settingsMap) {
    _settingsMap.remove();
    _settingsMap = null;
    _schoolMarker = null;
    _radiusCircle = null;
  }

  // Init Leaflet map
  _settingsMap = L.map('settingsMap', { zoomControl: true }).setView([defLat, defLng], hasCoords ? 16 : 12);

  // OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(_settingsMap);

  // Custom school marker icon
  const schoolIcon = L.divIcon({
    html: `<div style="background:linear-gradient(135deg,#4b6636,#6a9a42);width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
             <span style="transform:rotate(45deg);font-size:16px;display:block;text-align:center;line-height:30px">🏫</span>
           </div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -40]
  });

  // Add draggable marker
  _schoolMarker = L.marker([defLat, defLng], { icon: schoolIcon, draggable: true })
    .addTo(_settingsMap)
    .bindPopup('<b>Titik Pusat Sekolah</b><br>Seret untuk memindahkan')
    .openPopup();

  // Add radius circle
  _radiusCircle = L.circle([defLat, defLng], {
    radius: defRadius,
    color: '#4b6636',
    fillColor: '#4b6636',
    fillOpacity: 0.12,
    weight: 2,
    dashArray: '6 4'
  }).addTo(_settingsMap);

  // Update info bar
  _updateMapDisplay(defLat, defLng, defRadius);

  // CRITICAL: call invalidateSize multiple times to handle slow container renders
  // This forces Leaflet to re-calculate its dimensions and reload tiles
  [100, 300, 600, 1200].forEach(delay => {
    setTimeout(() => {
      if (_settingsMap) {
        _settingsMap.invalidateSize(true);
      }
    }, delay);
  });

  // --- Events ---
  // Drag marker
  _schoolMarker.on('dragend', function(e) {
    const pos = e.target.getLatLng();
    _setMapCoords(pos.lat, pos.lng);
  });

  // Click on map to move marker
  _settingsMap.on('click', function(e) {
    const { lat, lng } = e.latlng;
    _setMapCoords(lat, lng);
    // Hide hint after first click
    const hint = id('mapHint');
    if (hint) hint.style.display = 'none';
  });

  // Hide hint after 4 seconds
  setTimeout(() => { const h = id('mapHint'); if (h) h.style.display = 'none'; }, 4000);
}

function _setMapCoords(lat, lng) {
  const radius = parseFloat(id('setRadius').value) || 50;
  id('setLat').value = lat.toFixed(6);
  id('setLng').value = lng.toFixed(6);
  if (_schoolMarker) _schoolMarker.setLatLng([lat, lng]);
  if (_radiusCircle) _radiusCircle.setLatLng([lat, lng]);
  _updateMapDisplay(lat, lng, radius);
}

function syncMapFromInputs() {
  const lat = parseFloat(id('setLat').value);
  const lng = parseFloat(id('setLng').value);
  if (isNaN(lat) || isNaN(lng)) return;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return;
  const radius = parseFloat(id('setRadius').value) || 50;
  if (_settingsMap) {
    _settingsMap.setView([lat, lng], _settingsMap.getZoom());
    if (_schoolMarker) _schoolMarker.setLatLng([lat, lng]);
    if (_radiusCircle) { _radiusCircle.setLatLng([lat, lng]); _radiusCircle.setRadius(radius); }
  }
  _updateMapDisplay(lat, lng, radius);
}

function updateRadiusCircle() {
  const radius = parseFloat(id('setRadius').value) || 50;
  if (_radiusCircle) _radiusCircle.setRadius(radius);
  const lat = parseFloat(id('setLat').value);
  const lng = parseFloat(id('setLng').value);
  _updateMapDisplay(isNaN(lat) ? null : lat, isNaN(lng) ? null : lng, radius);
}

function _updateMapDisplay(lat, lng, radius) {
  const coordEl = id('mapCoordDisplay');
  const radEl = id('mapRadiusDisplay');
  if (coordEl) coordEl.textContent = (lat != null && lng != null) ? lat.toFixed(5) + ', ' + lng.toFixed(5) : 'Belum ditentukan';
  if (radEl) radEl.textContent = radius + ' m';
}

function autoDetectLocation() {
  if (!navigator.geolocation) {
    return showToast('Geolocation tidak didukung oleh browser Anda', 'error');
  }
  
  const btn = event.currentTarget;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<div class="spin" style="width:1.2em;height:1.2em;border-width:2px;display:inline-block;vertical-align:middle;margin-right:5px"></div> Mendeteksi...';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      id('setLat').value = lat;
      id('setLng').value = lng;
      
      // Update map if it's initialized
      if (_settingsMap) {
        _settingsMap.setView([lat, lng], 17);
        _setMapCoords(lat, lng);
      }
      
      btn.innerHTML = originalText;
      btn.disabled = false;
      showToast('✅ Lokasi berhasil dideteksi & peta diperbarui!', 'success');
    },
    (error) => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      let msg = 'Gagal mendeteksi lokasi.';
      if(error.code === 1) msg = 'Akses lokasi ditolak. Izinkan akses lokasi di browser Anda.';
      else if(error.code === 2) msg = 'Posisi lokasi tidak tersedia.';
      else if(error.code === 3) msg = 'Waktu deteksi lokasi habis (timeout).';
      showToast(msg, 'error');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

/* 12. ACTIVITY LOG */
async function activityLog() {
  setHdr('Activity Log', 'Rekam jejak aktivitas sistem');
  const { data: rows, error } = await supabase
    .from('activity_log')
    .select('*')
    .order('ts', { ascending: false })
    .limit(50);

  const list = Array.isArray(rows) ? rows : [];
  const tb = id('logTbody'); if (!tb) return;
  tb.innerHTML = list.map(r => `<tr>
    <td class="t2 tsm">${new Date(r.ts).toLocaleString('id-ID')}</td>
    <td style="font-weight:600">${r.user_name || '—'}</td>
    <td><span class="bdg bv">${r.role || '—'}</span></td>
    <td><span class="bdg bb">${r.action}</span></td>
    <td class="t2 tsm">${r.detail || '—'}</td>
  </tr>`).join('') || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--tx3)">Belum ada log</td></tr>`;
}

/* 13. ABSENSI MANDIRI & FACE ENROLLMENT
   ──────────────────────────────────────
   Semua logika ada di face_recognition.js:
   - startFaceEnroll(), snapFace(), stopEnrollCam()
   - camera(), startCam(), doCapture(), catatHadir(), stopCam()
   - scanMsg(), wait(), getDistance(), loadFaceModels()
   - loadAllDescriptors(), findBestMatch()
*/
