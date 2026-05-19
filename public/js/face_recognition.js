/* ═══════════════════════════════════════════════════════════
   SiAbsen — Face Recognition Module (face-api.js SSD Mobilenet v1)
   ═══════════════════════════════════════════════════════════ */

// ── Global State ────────────────────────────────────────────
let faceModelsLoaded = false;
let faceStream = null;
let faceDetectionLoop = null;
let allFaceDescriptors = []; // cached from DB
let geoPosition = null;
const MATCH_THRESHOLD = 0.4; // euclidean distance ≤ 0.4 ≈ ≥60% match

// ── Helper: update enrollment status on Profil page ─────────
function enrollMsg(html, type) {
  const el = id('faceStatus');
  if (!el) return;
  const color = type === 'ok' ? 'var(--grn)' : type === 'err' ? 'var(--red)' : type === 'warn' ? '#b45309' : 'var(--tx2)';
  el.innerHTML = '<span style="color:' + color + ';display:flex;align-items:center;gap:6px">' + html + '</span>';
}

// ── Load face-api.js Models (SSD Mobilenet v1) ──────────────
// CDN fallback URL for when local models can't be loaded (e.g. file:// protocol)
const FACE_MODEL_CDN = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';

function getModelUri() {
  // If opened from file:// protocol, local fetch() won't work — use CDN
  if (window.location.protocol === 'file:') {
    console.log('[FaceAPI] Detected file:// protocol → using CDN models');
    return FACE_MODEL_CDN;
  }
  return 'public/models';
}

async function loadFaceModels() {
  if (faceModelsLoaded) return true;

  // Show progress on whatever page we're on
  enrollMsg('⏳ Memuat AI Model (SSD Mobilenet v1)...', '');
  scanMsg('⏳ Memuat AI Model (SSD Mobilenet v1)...', '');
  showToast('Memuat AI Face Recognition Model...', 'info');

  // Try local first, fallback to CDN
  const uris = [getModelUri()];
  // If local path selected, add CDN as fallback
  if (uris[0] !== FACE_MODEL_CDN) uris.push(FACE_MODEL_CDN);

  for (const modelUri of uris) {
    try {
      const isLocal = modelUri !== FACE_MODEL_CDN;
      const src = isLocal ? 'lokal' : 'CDN';
      console.log(`[FaceAPI] Memuat model dari ${src}: ${modelUri}`);
      if (!isLocal) {
        showToast('⏳ Memuat model AI dari CDN (internet)...', 'info');
        scanMsg('⏳ Memuat AI Model dari CDN (butuh internet)...', '');
        enrollMsg('⏳ Memuat AI Model dari CDN (butuh internet)...', '');
      }

      console.log('[FaceAPI] Loading SSD Mobilenet v1...');
      await faceapi.nets.ssdMobilenetv1.loadFromUri(modelUri);
      console.log('[FaceAPI] SSD Mobilenet v1 loaded ✓');

      console.log('[FaceAPI] Loading Tiny Face Detector...');
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelUri);
      console.log('[FaceAPI] Tiny Face Detector loaded ✓');

      console.log('[FaceAPI] Loading Face Landmark 68...');
      await faceapi.nets.faceLandmark68Net.loadFromUri(modelUri);
      console.log('[FaceAPI] Face Landmark 68 loaded ✓');

      console.log('[FaceAPI] Loading Face Recognition Net...');
      await faceapi.nets.faceRecognitionNet.loadFromUri(modelUri);
      console.log('[FaceAPI] Face Recognition Net loaded ✓');

      faceModelsLoaded = true;
      showToast(`✅ AI Model siap! (${src})`, 'success');
      enrollMsg('✅ AI Model siap! Klik "Ambil Foto" untuk mulai.', 'ok');
      return true;

    } catch (err) {
      console.warn(`[FaceAPI] Gagal memuat dari ${modelUri}:`, err.message);
      // If there's another URI to try, continue; otherwise fail
      if (modelUri === uris[uris.length - 1]) {
        console.error('[FaceAPI] Semua sumber model gagal.');
        showToast('❌ Gagal memuat AI Model. Pastikan koneksi internet aktif.', 'error');
        scanMsg('❌ Gagal memuat model AI. Cek koneksi internet & refresh.', 'err');
        enrollMsg('❌ Gagal memuat AI Model. Cek koneksi internet & refresh.', 'err');
        return false;
      }
      console.log('[FaceAPI] Mencoba sumber alternatif...');
    }
  }
  return false;
}

// ── Load User Descriptor from Database (1:1 Verification) ──────────────────────
async function loadMyDescriptor() {
  try {
    const uid = App.profile?.id;
    if (!uid) return [];

    const { data: r, error } = await supabase
      .from('students')
      .select('id, user_id, name, nisn, class_id, class_name, face_data')
      .eq('user_id', uid)
      .single();

    if (error) throw error;

    allFaceDescriptors = [];
    if (r && r.face_data) {
      try {
        const parsed = JSON.parse(r.face_data);
        let descriptors = [];
        if (parsed.length > 0 && Array.isArray(parsed[0])) {
          descriptors = parsed.map(arr => new Float32Array(arr));
        } else if (parsed.length === 128) {
          descriptors = [new Float32Array(parsed)];
        }
        if (descriptors.length > 0) {
          allFaceDescriptors.push({
            id: r.id,
            user_id: r.user_id,
            name: r.name,
            nisn: r.nisn,
            class_id: r.class_id,
            class_name: r.class_name,
            descriptors: descriptors
          });
        }
      } catch (e) { /* skip invalid */ }
    }
    return allFaceDescriptors;
  } catch (e) {
    console.error('Failed to load descriptor:', e);
    return [];
  }
}

// ── Match a descriptor against all saved descriptors ────────
function findBestMatch(inputDescriptor) {
  let bestMatch = null;
  let bestDistance = 1.0;

  for (const student of allFaceDescriptors) {
    for (const saved of student.descriptors) {
      const dist = faceapi.euclideanDistance(saved, inputDescriptor);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestMatch = student;
      }
    }
  }

  const matchPercent = Math.max(0, Math.round((1 - bestDistance) * 100));
  const passed = bestDistance <= MATCH_THRESHOLD;

  return {
    student: bestMatch,
    distance: bestDistance,
    percent: matchPercent,
    passed: passed
  };
}

// ══════════════════════════════════════════════════════════════
//  HALAMAN REGISTRASI WAJAH (di Profil Siswa)
// ══════════════════════════════════════════════════════════════

let enrollStream = null;

async function startFaceEnroll() {
  const btnStart = id('btnStartEnroll');
  if (btnStart) { btnStart.disabled = true; btnStart.innerHTML = '<div class="spin"></div> Memuat...'; }

  enrollMsg('⏳ Memuat AI model & kamera...', '');

  const ok = await loadFaceModels();
  if (!ok) {
    if (btnStart) { btnStart.disabled = false; btnStart.innerHTML = '<img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Daftarkan Wajah'; }
    return;
  }

  try {
    enrollStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
    });
    const vid = id('pVid');
    if (vid) {
      vid.srcObject = enrollStream;
      // Ensure video is playing before we show the capture button
      await new Promise((resolve) => {
        vid.onloadedmetadata = () => { vid.play().then(resolve).catch(resolve); };
        // Fallback timeout
        setTimeout(resolve, 2000);
      });
    }
    id('camWrap').style.display = 'block';
    if (btnStart) btnStart.style.display = 'none';
    id('btnSnap').style.display = 'inline-flex';
    id('btnSnap').disabled = false;
    const btnStop = id('btnStopEnroll'); if (btnStop) btnStop.style.display = 'inline-flex';
    enrollMsg('📸 Kamera siap! Klik "Ambil Foto" untuk mulai registrasi 4 pose.', '');

  } catch (err) {
    console.error('[FaceEnroll] Camera error:', err);
    showToast('Gagal mengakses kamera: ' + err.message, 'error');
    enrollMsg('❌ Tidak bisa membuka kamera. Izinkan akses kamera di browser.', 'err');
    if (btnStart) { btnStart.disabled = false; btnStart.style.display = 'inline-flex'; btnStart.innerHTML = '<img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle"> Daftarkan Wajah'; }
  }
}

// ── Head Pose Estimation from 68-point Landmarks ────────────
// Calculates horizontal face angle using nose position relative to eye centers.
// Returns a ratio: 0.5 = centered, <0.45 = turned right, >0.55 = turned left
function estimateHeadYaw(landmarks) {
  const pts = landmarks.positions;
  // Eye centers (landmarks: left eye 36-41, right eye 42-47)
  const leftEye = { x: (pts[36].x + pts[39].x) / 2, y: (pts[36].y + pts[39].y) / 2 };
  const rightEye = { x: (pts[42].x + pts[45].x) / 2, y: (pts[42].y + pts[45].y) / 2 };
  // Nose tip (landmark 30)
  const nose = pts[30];
  // Calculate where nose falls between the two eyes (0 = at left eye, 1 = at right eye)
  const eyeSpan = rightEye.x - leftEye.x;
  if (Math.abs(eyeSpan) < 1) return 0.5; // safety
  const ratio = (nose.x - leftEye.x) / eyeSpan;
  return ratio;
}

function estimateMouthOpen(landmarks) {
  const pts = landmarks.positions;
  // Inner lips top (62) and bottom (66)
  const topLip = pts[62];
  const bottomLip = pts[66];
  // Inner lips left (60) and right (64)
  const leftMouth = pts[60];
  const rightMouth = pts[64];
  
  const height = bottomLip.y - topLip.y;
  const width = rightMouth.x - leftMouth.x;
  if (width < 1) return 0;
  return height / width;
}

// Pose validation ranges
const POSE_RULES = {
  depan: { min: 0.35, max: 0.65, direction: 'Tatap LURUS ke depan' },
  kiri: { min: 0.55, max: 0.95, direction: 'Tengok kepala ke KIRI Anda' },
  kanan: { min: 0.05, max: 0.45, direction: 'Tengok kepala ke KANAN Anda' },
  mulut: { direction: 'Buka MULUT Anda' }
};

async function snapFace() {
  const vid = id('pVid');
  const btn = id('btnSnap');
  if (!vid || !btn) return;
  btn.disabled = true;
  const btnStop = id('btnStopEnroll');
  if (btnStop) btnStop.style.display = 'none'; // hide cancel during capture

  const poses = [
    { key: 'depan', icon: '👤', label: 'Depan', samplesNeeded: 2 },
    { key: 'kiri', icon: '👈', label: 'Kiri', samplesNeeded: 2 },
    { key: 'kanan', icon: '👉', label: 'Kanan', samplesNeeded: 2 },
    { key: 'mulut', icon: '😮', label: 'Mulut Terbuka', samplesNeeded: 2 }
  ];

  try {
    let allDescriptors = [];

    for (let i = 0; i < poses.length; i++) {
      const pose = poses[i];
      const rule = POSE_RULES[pose.key];
      const poseNum = (i + 1) + '/' + poses.length;

      // ── Show instruction ──
      btn.innerHTML = pose.icon + ' Pose ' + poseNum + ' — ' + rule.direction;
      enrollMsg('🔄 <b>Pose ' + poseNum + ' (' + pose.label + ')</b>: ' + rule.direction, '');

      // Wait for user to adjust
      await wait(1000);

      let samples = [];
      let attempts = 0;
      const maxAttempts = 50; // ~10 seconds per pose

      while (samples.length < pose.samplesNeeded && attempts < maxAttempts) {
        attempts++;

        try {
          const det = await faceapi
            .detectSingleFace(vid, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!det) {
            btn.innerHTML = '⚠️ Wajah tidak terdeteksi... (' + attempts + ')';
            await wait(100);
            continue;
          }

          if (det.detection.score < 0.5) {
            btn.innerHTML = '⚠️ Kualitas rendah, perbaiki posisi...';
            await wait(100);
            continue;
          }

          // ── Validate head orientation using landmarks ──
          const yawRatio = estimateHeadYaw(det.landmarks);
          const yawPct = (yawRatio * 100).toFixed(0);

          if (pose.key === 'mulut') {
            const mouthRatio = estimateMouthOpen(det.landmarks);
            if (mouthRatio < 0.12) {
              btn.innerHTML = '🔄 Buka MULUT Anda lebih lebar!';
              await wait(100);
              continue;
            }
          } else if (yawRatio < rule.min || yawRatio > rule.max) {
            // Wrong angle — guide the user
            let hint = '';
            if (pose.key === 'depan') {
              hint = yawRatio < rule.min ? 'Miring ke KANAN, luruskan ke tengah' : 'Miring ke KIRI, luruskan ke tengah';
            } else if (pose.key === 'kiri') {
              hint = yawRatio < rule.min ? 'Tengok kepala LEBIH ke KIRI...' : 'Terlalu jauh! Luruskan sedikit';
            } else {
              hint = yawRatio > rule.max ? 'Tengok kepala LEBIH ke KANAN...' : 'Terlalu jauh! Luruskan sedikit';
            }
            btn.innerHTML = '🔄 ' + hint + ' (' + yawPct + '%)';
            await wait(100);
            continue;
          }

          // ── Pose angle validated! Capture this sample ──
          samples.push(det.descriptor);
          const sampleNum = samples.length + '/' + pose.samplesNeeded;
          btn.innerHTML = '📸 Pose ' + pose.label + ' sample ' + sampleNum + ' captured!';
          enrollMsg('📸 Pose ' + poseNum + ' (' + pose.label + ') — sample ' + sampleNum + ' ✓ (score: ' + (det.detection.score * 100).toFixed(0) + '%, yaw: ' + yawPct + '%)', 'ok');

          if (samples.length < pose.samplesNeeded) {
            // Wait a bit before capturing next sample (slight movement)
            await wait(300);
          }

        } catch (detErr) {
          console.error('[FaceEnroll] Detection error:', detErr);
          await wait(100);
        }
      }

      if (samples.length < pose.samplesNeeded) {
        throw new Error(
          'Gagal menangkap pose "' + pose.label + '". ' +
          (samples.length > 0 ? 'Hanya ' + samples.length + ' sample terekam.' : 'Tidak ada sample.') +
          ' Pastikan: 1) Wajah terlihat jelas, 2) Cahaya cukup, 3) ' + rule.direction
        );
      }

      // Add all samples for this pose
      allDescriptors = allDescriptors.concat(samples);

      // Show success for this pose
      btn.innerHTML = '✅ Pose ' + pose.label + ' lengkap! (' + samples.length + ' sample)';
      enrollMsg('✅ <b>Pose ' + poseNum + ' (' + pose.label + ')</b> berhasil! ' + samples.length + ' sample terekam.', 'ok');
      showToast('✅ Pose ' + pose.label + ' berhasil!', 'success');
      await wait(1000);
    }

    // ── All poses captured — save to Supabase ──
    btn.innerHTML = '💾 Menyimpan ' + allDescriptors.length + ' descriptor ke database...';
    enrollMsg('💾 Menyimpan data wajah (' + poses.length + ' pose × ' + poses[0].samplesNeeded + ' sample = ' + allDescriptors.length + ' descriptor)...', '');

    const faceData = JSON.stringify(allDescriptors.map(d => Array.from(d)));
    console.log('[FaceEnroll] Saving', allDescriptors.length, 'descriptors');

    // Periksa apakah row data siswa sudah ada
    const { data: existing } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', App.user.id)
      .single();

    if (!existing) {
      // Insert baru jika row belum ada (karena mendaftar sebelum trigger aktif)
      const { error: errInsert } = await supabase
        .from('students')
        .insert({
          user_id: App.user.id,
          name: App.profile?.name || 'Siswa',
          email: App.profile?.email,
          face_data: faceData,
          auth_linked: true
        });
      if (errInsert) throw new Error('Gagal membuat profil siswa baru (terblokir RLS Insert): ' + errInsert.message);
    } else {
      // Update data wajah ke row yang sudah ada
      const { data: updatedRows, error } = await supabase
        .from('students')
        .update({ face_data: faceData })
        .eq('user_id', App.user.id)
        .select();

      if (error) throw error;
      if (!updatedRows || updatedRows.length === 0) {
        throw new Error('Data gagal disimpan! Pastikan Anda telah menjalankan perintah SQL UPDATE Policies di Supabase.');
      }
    }

    showToast('✅ Data wajah (' + allDescriptors.length + ' descriptor, 4 pose) berhasil didaftarkan!', 'success');
    enrollMsg(
      '<img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle"> ' +
      'Wajah Terdaftar (' + allDescriptors.length + ' Descriptor — Depan + Kiri + Kanan + Mulut Buka)', 'ok'
    );
    stopEnrollCam();

  } catch (err) {
    console.error('[FaceEnroll] Error:', err);
    showToast('Registrasi gagal: ' + err.message, 'error');
    enrollMsg('❌ ' + err.message, 'err');
    btn.disabled = false;
    btn.innerHTML = '🔄 Ulangi Ambil Foto';
    if (btnStop) btnStop.style.display = 'inline-flex';
  }
}

function stopEnrollCam() {
  if (enrollStream) {
    enrollStream.getTracks().forEach(t => t.stop());
    enrollStream = null;
  }
  const wrap = id('camWrap');
  if (wrap) wrap.style.display = 'none';

  const btnStart = id('btnStartEnroll');
  if (btnStart) {
    btnStart.style.display = 'inline-flex';
    btnStart.disabled = false;
    btnStart.innerHTML = '<img src="image/add.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Daftarkan Ulang';
  }

  const btnSnap = id('btnSnap');
  if (btnSnap) {
    btnSnap.style.display = 'none';
    btnSnap.disabled = false;
    btnSnap.textContent = '📸 Ambil Foto';
  }

  const btnStop = id('btnStopEnroll');
  if (btnStop) btnStop.style.display = 'none';

  const vid = id('pVid');
  if (vid) vid.srcObject = null;
}

// ══════════════════════════════════════════════════════════════
//  HALAMAN PRESENSI REAL-TIME (Absensi Sekolah)
// ══════════════════════════════════════════════════════════════

async function camera() {
  setHdr('Absensi Sekolah', 'Scan wajah untuk absensi pagi');
  const uid = App.profile.id;

  // Check if already attended today in Supabase
  const today = key();
  const { data: existing, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('date_key', today)
    .eq('student_user_id', uid)
    .eq('subject_key', 'pagi')
    .maybeSingle();

  if (existing) {
    scanMsg('✅ Anda sudah absen hari ini! (' + existing.status.toUpperCase() + ' pukul ' + ftm(existing.time) + ')', 'ok');
    id('btnCatatHdr').style.display = 'inline-flex';
    id('btnCatatHdr').innerHTML = '✅ Sudah Absen Hari Ini';
    id('btnCatatHdr').disabled = true;
    id('btnStartCam').style.display = 'none';
    id('btnCapture').style.display = 'none';
    id('livenessVal').textContent = 'Verified';
    return;
  }

  // Check face registration from students table
  const { data: stu } = await supabase.from('students').select('face_data').eq('user_id', uid).single();
  if (!stu?.face_data) {
    scanMsg('⚠️ Wajah belum terdaftar! Daftarkan di menu Profil Saya terlebih dahulu.', 'err');
    id('btnStartCam').disabled = true;
    id('btnCapture').style.display = 'none';
    return;
  }

  // Reset UI
  geoPosition = null;
  scanMsg('Klik "Buka Kamera" untuk mulai', '');
  id('btnStartCam').style.display = 'inline-flex';
  id('btnStartCam').disabled = false;
  id('btnStopCam').style.display = 'none';
  id('btnCapture').style.display = 'none';
  id('btnCatatHdr').disabled = true;
  id('livenessVal').textContent = '—';

  // Mulai watchPosition agar GPS terus diperbarui (bukan hanya sekali)
  if (navigator.geolocation) {
    // Hentikan watcher lama jika ada
    if (window._geoWatchId != null) {
      navigator.geolocation.clearWatch(window._geoWatchId);
    }
    const el = id('geoStat');
    if (el) el.innerHTML = '<span class="bdg bn">📍 Mendapatkan GPS...</span>';

    window._geoWatchId = navigator.geolocation.watchPosition(
      p => {
        geoPosition = { lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy };
        if (el) el.innerHTML = '<span class="bdg bg">📍 GPS OK (' +
          geoPosition.lat.toFixed(5) + ', ' + geoPosition.lng.toFixed(5) +
          ' ±' + Math.round(geoPosition.accuracy) + 'm)</span>';
      },
      err => {
        console.warn('[GPS] Error:', err.message);
        if (el) el.innerHTML = '<span class="bdg br">📍 GPS tidak tersedia — aktifkan lokasi</span>';
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );
  }
}

async function startCam() {
  const ok = await loadFaceModels();
  if (!ok) return;

  // Load user's descriptor for matching (1:1)
  scanMsg('📡 Memuat data wajah Anda dari database...', '');
  await loadMyDescriptor();
  if (allFaceDescriptors.length === 0) {
    scanMsg('⚠️ Data wajah Anda belum terdaftar. Silakan registrasi di Profil Saya.', 'err');
    return;
  }
  scanMsg('✅ Data wajah siap. Membuka kamera...', '');

  try {
    faceStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
    });
    const v = id('scanVid');
    if (v) { v.srcObject = faceStream; v.play(); }
    id('btnStartCam').style.display = 'none';
    id('btnStopCam').style.display = 'inline-flex';
    id('btnCapture').style.display = 'none';
    scanMsg('📸 Kamera aktif. Memulai pemindaian wajah otomatis...', '');
    
    // Auto start scanning after a short delay to allow video stream to initialize
    setTimeout(doCapture, 1000);
  } catch (e) {
    scanMsg('❌ Gagal akses kamera: ' + e.message, 'err');
    showToast('Tidak bisa akses kamera: ' + e.message, 'error');
  }
}

// ── Face Scan (triggered by button) ─────────────────────────
let isScanning = false;

async function doCapture() {
  if (isScanning || !faceStream) return;
  isScanning = true;

  const v = id('scanVid');
  const uid = App.profile.id;
  const captureBtn = id('btnCapture');
  if (captureBtn) { captureBtn.style.display = 'none'; }

  scanMsg('🔍 Mendeteksi dan mencocokkan wajah...', '');
  id('livenessVal').textContent = 'Memproses...';

  let bestResult = null;

  // Keep scanning as long as faceStream is active and no best match
  while (faceStream && !bestResult?.passed) {
    try {
      const det = await faceapi
        .detectSingleFace(v, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (det) {
        const result = findBestMatch(det.descriptor);
        id('livenessVal').textContent = result.percent + '% (Dist: ' + result.distance.toFixed(3) + ')';

        if (result.passed && result.student) {
          // Verify it's the logged-in student
          if (result.student.user_id == uid) {
            bestResult = result;
            break;
          } else {
            scanMsg('⚠️ Wajah terdeteksi sebagai: ' + result.student.name + ' (bukan Anda)', 'err');
          }
        } else if (result.student) {
          scanMsg('🔄 Kecocokan: ' + result.percent + '% — perlu ≥60%. Coba ubah posisi...', '');
        }
      } else {
        scanMsg('👤 Wajah tidak terdeteksi. Posisikan wajah di lingkaran.', '');
      }
    } catch (e) {
      console.error('Detection error:', e);
    }
    await wait(100); // Wait between frames reduced to increase scanning speed
  }

  if (bestResult && bestResult.passed) {
    scanMsg('✅ Identitas COCOK! (' + bestResult.percent + '%) — ' + bestResult.student.name, 'ok');
    id('btnCatatHdr').disabled = false;
    id('btnCatatHdr').innerHTML = '🚀 Catat Kehadiran Sekarang';
    id('btnCatatHdr').classList.add('pulse');
    // Store match result for recording
    window._lastFaceMatch = bestResult;
  } else {
    id('livenessVal').textContent = '—';
    if (!faceStream) {
      scanMsg('Kamera dihentikan.', '');
    } else {
      scanMsg('❌ Gagal mencocokkan wajah. Pastikan wajah terdaftar dan cahaya cukup.', 'err');
    }
  }

  isScanning = false;
}

// ── Haversine Distance (meters) ─────────────────────────────
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const p1 = lat1 * Math.PI / 180, p2 = lat2 * Math.PI / 180;
  const dp = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Record Attendance ───────────────────────────────────────
async function catatHadir() {
  const uid = App.profile?.id;
  if (!uid) return;

  id('btnCatatHdr').disabled = true;
  id('btnCatatHdr').innerHTML = '⏳ Menyimpan...';

  try {
    // 1. Get settings from Supabase
    const { data: rows } = await supabase.from('settings').select('*');
    const sett = {};
    rows.forEach(r => sett[r.setting_key] = r.setting_value);

    const schoolLat = parseFloat(sett.schoolLat);
    const schoolLng = parseFloat(sett.schoolLng);
    const maxRadius = parseFloat(sett.maxRadius) || 100; // Default 100m

    // 2. Geolocation Validation
    if (!isNaN(schoolLat) && !isNaN(schoolLng)) {
      // Jika GPS belum tersedia, tunggu hingga 10 detik
      if (!geoPosition) {
        scanMsg('⏳ Menunggu sinyal GPS...', '');
        await new Promise(resolve => {
          let waited = 0;
          const check = setInterval(() => {
            waited += 500;
            if (geoPosition || waited >= 10000) {
              clearInterval(check);
              resolve();
            }
          }, 500);
          // Juga coba getCurrentPosition sebagai fallback
          navigator.geolocation?.getCurrentPosition(
            p => {
              geoPosition = { lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy };
              const el = id('geoStat');
              if (el) el.innerHTML = '<span class="bdg bg">📍 GPS OK (' +
                geoPosition.lat.toFixed(5) + ', ' + geoPosition.lng.toFixed(5) +
                ' ±' + Math.round(geoPosition.accuracy) + 'm)</span>';
              clearInterval(check);
              resolve();
            },
            () => { clearInterval(check); resolve(); },
            { enableHighAccuracy: true, timeout: 9000, maximumAge: 0 }
          );
        });
      }

      if (!geoPosition) {
        id('btnCatatHdr').disabled = false;
        id('btnCatatHdr').innerHTML = '🚀 Catat Kehadiran Sekarang';
        return showToast('❌ GPS tidak ditemukan! Aktifkan lokasi dan coba lagi.', 'error');
      }

      const dist = getDistance(schoolLat, schoolLng, geoPosition.lat, geoPosition.lng);
      const accuracy = geoPosition.accuracy || 0;
      console.log(`[GPS] Jarak ke sekolah: ${dist.toFixed(1)}m | Akurasi GPS: ±${accuracy.toFixed(0)}m | MaxRadius: ${maxRadius}m`);
      console.log(`[GPS] Posisi Anda: ${geoPosition.lat}, ${geoPosition.lng}`);
      console.log(`[GPS] Posisi Sekolah: ${schoolLat}, ${schoolLng}`);

      // Tampilkan info jarak di UI
      const geoEl = id('geoStat');
      if (geoEl) geoEl.innerHTML = '<span class="bdg ' + (dist <= maxRadius ? 'bg' : 'br') + '">📍 ' +
        Math.round(dist) + 'm dari sekolah (maks ' + maxRadius + 'm) ±' + Math.round(accuracy) + 'm</span>';

      if (dist > maxRadius) {
        scanMsg('❌ Anda ' + Math.round(dist) + 'm dari sekolah. Maks ' + maxRadius + 'm. (Akurasi GPS: ±' + Math.round(accuracy) + 'm)', 'err');
        id('btnCatatHdr').disabled = false;
        id('btnCatatHdr').innerHTML = '🚀 Catat Kehadiran Sekarang';
        return showToast('Gagal: Jarak ' + Math.round(dist) + 'm dari sekolah (maks ' + maxRadius + 'm)!', 'error');
      }
    }

    // 3. Get Student Data from Supabase
    const { data: stu } = await supabase.from('students').select('*').eq('user_id', uid).single();
    if (!stu?.class_id) {
      id('btnCatatHdr').disabled = false;
      return showToast('Data kelas tidak ditemukan! Lengkapi profil.', 'error');
    }

    // 4. Determine status (hadir/terlambat)
    const [sh, sm] = (sett.startHour || '07:00').split(':').map(Number);
    const now = new Date();
    const batas = new Date();
    batas.setHours(sh, sm + (parseInt(sett.lateThreshold) || 15), 0);
    const status = now > batas ? 'terlambat' : 'hadir';

    // Get match score
    const matchResult = window._lastFaceMatch;
    const score = matchResult ? matchResult.percent / 100 : 1;

    // 5. Save attendance with timestamp to Supabase
    const { error: attErr } = await supabase.from('attendance').insert([{
      date_key: key(),
      class_id: stu.class_id,
      class_name: stu.class_name || '',
      student_id: stu.id,
      student_user_id: uid,
      name: stu.name,
      nisn: stu.nisn || '',
      subject_key: 'pagi',
      subject: 'Absensi Sekolah',
      status: status,
      time: Date.now(),
      lat: geoPosition?.lat || null,
      lng: geoPosition?.lng || null,
      self_checkin: 1,
      liveness_score: score
    }]);

    if (attErr) throw attErr;

    await logAct('selfcheckin', 'Absen ' + status + ' via Face Recognition');

    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    scanMsg('✅ Kehadiran tercatat! Status: ' + status.toUpperCase() + ' | Waktu: ' + timeStr, 'ok');
    showToast('🎉 Absensi berhasil!', 'success');
    id('btnCatatHdr').innerHTML = '✅ Berhasil — ' + status.toUpperCase();
    stopCam();

  } catch (err) {
    console.error(err);
    showToast('Gagal menyimpan absensi: ' + err.message, 'error');
    id('btnCatatHdr').disabled = false;
    id('btnCatatHdr').innerHTML = '🚀 Catat Kehadiran Sekarang';
  }
}

function stopCam() {
  if (faceStream) { faceStream.getTracks().forEach(t => t.stop()); faceStream = null; }
  if (faceDetectionLoop) { clearInterval(faceDetectionLoop); faceDetectionLoop = null; }
  // Hentikan GPS watcher saat kamera ditutup
  if (window._geoWatchId != null) {
    navigator.geolocation?.clearWatch(window._geoWatchId);
    window._geoWatchId = null;
  }
  const v = id('scanVid'); if (v) v.srcObject = null;
  id('btnStopCam').style.display = 'none';
  id('btnStartCam').style.display = 'inline-flex';
  id('btnCapture').style.display = 'none';
}

function scanMsg(msg, type) {
  const el = id('scanMsg');
  if (el) {
    el.innerHTML = msg;
    el.style.color = type === 'ok' ? 'var(--grn)' : type === 'err' ? 'var(--red)' : 'var(--tx2)';
  }
}

const wait = ms => new Promise(r => setTimeout(r, ms));
