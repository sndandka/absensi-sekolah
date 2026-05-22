/* ═══════════════════════════════════════════════
   SiAbsen - Auth (auth.js) - Supabase Version
   ═══════════════════════════════════════════════ */

async function handleLogin(e){
  e.preventDefault();
  const role = window._loginRole || 'siswa';
  const pass = id('lPass').value;
  const btn = id('loginBtn');

  if(role === 'siswa') {
    // Student login via NISN
    const nisn = id('lNisn')?.value.trim();
    if(!nisn || !pass) return showToast('Isi NISN dan password!','warning');
    btn.innerHTML='<div class="spin"></div>'; btn.disabled=true;

    try {
      const { data: email, error: rpcErr } = await supabase.rpc('get_email_by_nisn', { p_nisn: nisn });

      if(rpcErr || !email) {
        btn.innerHTML='Masuk'; btn.disabled=false;
        return showToast('NISN tidak ditemukan atau akun belum terhubung. Pastikan NISN sudah terdaftar dan sudah registrasi akun.','error');
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if(error) throw error;
      await checkSession();
    } catch(err) {
      showToast('Login gagal: '+err.message,'error');
      btn.innerHTML='Masuk'; btn.disabled=false;
    }
  } else if(role === 'guru') {
    // Teacher login via NIP
    const nip = id('lNip')?.value.trim();
    if(!nip || !pass) return showToast('Isi NIP dan password!','warning');
    btn.innerHTML='<div class="spin"></div>'; btn.disabled=true;

    try {
      const { data: email, error: rpcErr } = await supabase.rpc('get_email_by_nip', { p_nip: nip });

      if(rpcErr || !email) {
        btn.innerHTML='Masuk'; btn.disabled=false;
        return showToast('NIP tidak ditemukan atau akun belum terhubung. Pastikan NIP sudah terdaftar dan sudah registrasi akun.','error');
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if(error) throw error;
      await checkSession();
    } catch(err) {
      showToast('Login gagal: '+err.message,'error');
      btn.innerHTML='Masuk'; btn.disabled=false;
    }
  } else {
    // Admin login via email
    const email = id('lEmail')?.value.trim();
    if(!email || !pass) return showToast('Isi email dan password!','warning');
    btn.innerHTML='<div class="spin"></div>'; btn.disabled=true;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if(error) throw error;
      await checkSession();
    } catch(err) {
      showToast('Login gagal: '+err.message,'error');
      btn.innerHTML='Masuk'; btn.disabled=false;
    }
  }
}

async function handleRegister(e){
  e.preventDefault();
  const name=id('rName').value.trim(), email=id('rEmail').value.trim(),
        pass=id('rPass').value, role=id('rRole').value;
  const btn=id('regBtn');
  
  if(!name||!email||!pass) return showToast('Lengkapi semua field!','warning');
  if(pass.length<6) return showToast('Password minimal 6 karakter','warning');
  btn.innerHTML='<div class="spin"></div>'; btn.disabled=true;

  try {
    const meta = { name, role };
    
    if(role === 'siswa'){
      const nisn = id('rNisn').value.trim();
      if(!nisn) {
        btn.innerHTML='Daftar Sekarang →'; btn.disabled=false;
        return showToast('NISN wajib diisi untuk siswa!', 'warning');
      }
      meta.nisn = nisn;
    } else if (role === 'guru') {
      const nip = id('rNip').value.trim();
      if(!nip) {
        btn.innerHTML='Daftar Sekarang →'; btn.disabled=false;
        return showToast('NIP wajib diisi untuk guru!', 'warning');
      }
      meta.nip = nip;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: { data: meta }
    });
    
    if(error) throw error;
    
    showToast('Pendaftaran berhasil! Silakan cek email (jika konfirmasi aktif) atau login.','success');
    id('rName').value=''; id('rEmail').value=''; id('rPass').value='';
    if(id('rNisn')) id('rNisn').value = '';
    switchTab('login');

  } catch(err) {
    showToast(err.message,'error');
  }
  btn.innerHTML='Daftar Sekarang →'; btn.disabled=false;
}

async function handleForgot(){
  // Create modal for forgot password
  const modal = document.createElement('div');
  modal.className = 'ov on';
  modal.innerHTML = `
    <div class="mdl" style="max-width:450px;">
      <div class="mdl-h">
        <div class="mdl-t"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Reset Kata Sandi</div>
        <button class="mdl-x" onclick="this.closest('.ov').remove()">✕</button>
      </div>
      <div class="mdl-b">
        <p style="margin-bottom:1.5rem;color:var(--tx2);line-height:1.6;">
          Masukkan alamat email Anda. Kami akan mengirimkan link untuk mereset kata sandi Anda.
        </p>
        <div class="fg" style="margin-bottom:1.5rem;">
          <label class="fl" style="font-weight:600;margin-bottom:0.5rem;">Alamat Email</label>
          <input id="forgotEmail" type="email" class="fi" placeholder="email@smk-anda.sch.id" required style="padding:0.75rem 1rem;font-size:0.9rem;">
        </div>
        <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
          <button class="btn btn-out" onclick="this.closest('.ov').remove()">Batal</button>
          <button id="btnSendReset" class="btn btn-pri" onclick="sendResetEmail()">
            <img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Kirim Link Reset
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Focus on email input
  setTimeout(() => document.getElementById('forgotEmail')?.focus(), 100);
  
  // Handle Enter key
  document.getElementById('forgotEmail')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendResetEmail();
    }
  });
}

async function sendResetEmail(){
  const emailInput = document.getElementById('forgotEmail');
  const email = emailInput?.value.trim();
  
  if(!email) {
    showToast('Masukkan alamat email Anda!', 'warning');
    emailInput?.focus();
    return;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    showToast('Format email tidak valid!', 'warning');
    emailInput?.focus();
    return;
  }
  
  const btn = document.getElementById('btnSendReset');
  if(!btn) return;
  
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<div class="spin"></div> Mengirim...';
  btn.disabled = true;
  
  try {
    // Get current URL origin for redirect
    const redirectTo = `${window.location.origin}${window.location.pathname}#reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo
    });
    
    if(error) throw error;
    
    showToast('Email reset password telah dikirim! Silakan cek inbox Anda.', 'success', 5000);
    
    // Close modal
    document.querySelector('.ov.on')?.remove();
    
  } catch(err) { 
    showToast('Gagal mengirim email: ' + err.message, 'error');
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
}

// Handle password reset from email link
window.addEventListener('hashchange', handlePasswordReset);
window.addEventListener('load', handlePasswordReset);

async function handlePasswordReset() {
  const hash = window.location.hash;
  
  // Check if this is a password reset callback
  if (hash && hash.includes('type=recovery')) {
    // Show reset password modal
    showResetPasswordModal();
  }
}

function showResetPasswordModal() {
  const modal = document.createElement('div');
  modal.className = 'ov on';
  modal.innerHTML = `
    <div class="mdl" style="max-width:450px;">
      <div class="mdl-h">
        <div class="mdl-t"><img src="image/info.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Buat Kata Sandi Baru</div>
      </div>
      <div class="mdl-b">
        <p style="margin-bottom:1.5rem;color:var(--tx2);line-height:1.6;">
          Masukkan kata sandi baru Anda. Pastikan minimal 6 karakter.
        </p>
        <div class="fg" style="margin-bottom:1rem;">
          <label class="fl" style="font-weight:600;margin-bottom:0.5rem;">Kata Sandi Baru</label>
          <input id="newPassword" type="password" class="fi" placeholder="Minimal 6 karakter" required style="padding:0.75rem 1rem;font-size:0.9rem;">
        </div>
        <div class="fg" style="margin-bottom:1.5rem;">
          <label class="fl" style="font-weight:600;margin-bottom:0.5rem;">Konfirmasi Kata Sandi</label>
          <input id="confirmPassword" type="password" class="fi" placeholder="Ketik ulang kata sandi" required style="padding:0.75rem 1rem;font-size:0.9rem;">
        </div>
        <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
          <button id="btnUpdatePassword" class="btn btn-pri wf" onclick="updatePassword()">
            <img src="image/checkbox.png" style="width:1.2em;height:1.2em;vertical-align:middle;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.2))"> Perbarui Kata Sandi
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Focus on password input
  setTimeout(() => document.getElementById('newPassword')?.focus(), 100);
  
  // Clear hash
  history.replaceState(null, '', window.location.pathname);
}

async function updatePassword() {
  const newPass = document.getElementById('newPassword')?.value;
  const confirmPass = document.getElementById('confirmPassword')?.value;
  
  if(!newPass || !confirmPass) {
    showToast('Lengkapi semua field!', 'warning');
    return;
  }
  
  if(newPass.length < 6) {
    showToast('Kata sandi minimal 6 karakter!', 'warning');
    return;
  }
  
  if(newPass !== confirmPass) {
    showToast('Kata sandi tidak cocok!', 'warning');
    return;
  }
  
  const btn = document.getElementById('btnUpdatePassword');
  if(!btn) return;
  
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<div class="spin"></div> Memperbarui...';
  btn.disabled = true;
  
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPass
    });
    
    if(error) throw error;
    
    showToast('Kata sandi berhasil diperbarui! Silakan login dengan kata sandi baru.', 'success', 5000);
    
    // Close modal
    document.querySelector('.ov.on')?.remove();
    
    // Sign out to force re-login
    await supabase.auth.signOut();
    
  } catch(err) {
    showToast('Gagal memperbarui kata sandi: ' + err.message, 'error');
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
}

function switchTab(tab){
  id('boxLogin').style.display = tab==='login'?'block':'none';
  id('boxReg').style.display   = tab==='reg'?'block':'none';
  const tl=id('tabLogin'), tr=id('tabReg');
  if(tab==='login'){
    tl.style.background='linear-gradient(135deg,var(--v),var(--v1))'; tl.style.color='#fff';
    tr.style.background='transparent'; tr.style.color='var(--tx2)';
  } else {
    tr.style.background='linear-gradient(135deg,var(--v),var(--v1))'; tr.style.color='#fff';
    tl.style.background='transparent'; tl.style.color='var(--tx2)';
  }
}
