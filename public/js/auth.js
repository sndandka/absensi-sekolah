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
      const { data: rpcData, error: rpcErr } = await supabase.rpc('get_email_by_nisn', { p_nisn: nisn });

      let email = rpcData;
      if (Array.isArray(rpcData)) {
        email = rpcData.length > 0 ? (rpcData[0].email || rpcData[0]) : null;
      } else if (rpcData && typeof rpcData === 'object') {
        email = rpcData.email;
      }

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
      const { data: rpcData, error: rpcErr } = await supabase.rpc('get_email_by_nip', { p_nip: nip });

      let email = rpcData;
      if (Array.isArray(rpcData)) {
        email = rpcData.length > 0 ? (rpcData[0].email || rpcData[0]) : null;
      } else if (rpcData && typeof rpcData === 'object') {
        email = rpcData.email;
      }

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
        pass=id('rPass').value, passConfirm=id('rPassConfirm').value, role=id('rRole').value;
  const btn=id('regBtn');
  
  if(!name||!email||!pass||!passConfirm) return showToast('Lengkapi semua field!','warning');
  if(pass.length<6) return showToast('Password minimal 6 karakter','warning');
  if(pass !== passConfirm) return showToast('Verifikasi kata sandi tidak cocok!','warning');
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
    id('rName').value=''; id('rEmail').value=''; id('rPass').value=''; id('rPassConfirm').value='';
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
    <div class="mdl" style="max-width:420px; border-radius:1.5rem; overflow:hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
      <div style="background: linear-gradient(135deg, var(--v), var(--v1)); padding: 2.5rem 1.5rem 1.5rem; text-align: center; position: relative;">
        <button class="mdl-x" style="position: absolute; top: 1rem; right: 1rem; color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.2); border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 1rem;" onmouseover="this.style.background='rgba(255,255,255,0.3)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.2)';this.style.color='rgba(255,255,255,0.8)'" onclick="this.closest('.ov').remove()">✕</button>
        <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3); box-shadow: 0 8px 16px rgba(0,0,0,0.1); font-size: 2.2rem; line-height: 1;">
          ✉️
        </div>
        <h2 style="color: #fff; margin: 0; font-family: 'Nunito', sans-serif; font-size: 1.5rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Lupa Kata Sandi?</h2>
        <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem; margin-top: 0.5rem; font-weight: 500;">Jangan khawatir, kami akan membantu Anda.</p>
      </div>
      <div class="mdl-b" style="padding: 2rem; background: var(--card);">
        <p style="margin-bottom: 1.5rem; color: var(--tx2); line-height: 1.6; text-align: center; font-size: 0.95rem;">
          Masukkan alamat email yang terdaftar. Kami akan mengirimkan tautan aman untuk mereset kata sandi Anda.
        </p>
        <div class="fg" style="margin-bottom: 2rem; position: relative;">
          <label class="fl" style="font-weight: 700; margin-bottom: 0.6rem; color: var(--tx1); font-size: 0.9rem;">Alamat Email</label>
          <div style="position: relative;">
            <div style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--tx3); font-size: 1.1rem; line-height: 1;">📧</div>
            <input id="forgotEmail" type="email" class="fi" placeholder="Contoh: siswa@sekolah.com" required style="padding: 0.8rem 1rem 0.8rem 2.8rem; font-size: 0.95rem; border-radius: 0.8rem; border: 2px solid var(--brd); background: var(--bg2); transition: all 0.2s; width: 100%; box-sizing: border-box; outline: none;" onfocus="this.style.borderColor='var(--v)'; this.style.boxShadow='0 0 0 4px rgba(99,102,241,0.1)'; this.style.background='#fff'" onblur="this.style.borderColor='var(--brd)'; this.style.boxShadow='none'; this.style.background='var(--bg2)'">
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <button id="btnSendReset" class="btn btn-pri" style="width: 100%; justify-content: center; padding: 0.9rem; font-size: 1rem; border-radius: 0.8rem; font-weight: 700; box-shadow: 0 4px 12px rgba(99,102,241,0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(99,102,241,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(99,102,241,0.3)'" onclick="sendResetEmail()">
            Kirim Tautan Reset
          </button>
          <button class="btn btn-out" style="width: 100%; justify-content: center; padding: 0.9rem; font-size: 0.95rem; border-radius: 0.8rem; font-weight: 600; border: none; background: transparent; color: var(--tx2); transition: all 0.2s;" onmouseover="this.style.background='var(--bg2)'; this.style.color='var(--tx1)'" onmouseout="this.style.background='transparent'; this.style.color='var(--tx2)'" onclick="this.closest('.ov').remove()">
            Kembali ke Login
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
    // Use the current URL as the redirect destination (e.g. for Vercel or local development)
    const redirectToUrl = window.location.origin + window.location.pathname;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectToUrl
    });
    
    if(error) throw error;
    
    showToast('Email reset password telah dikirim! Silakan cek inbox/spam Anda.', 'success', 5000);
    
    // Close modal
    document.querySelector('.ov.on')?.remove();
    
  } catch(err) { 
    showToast('Gagal mengirim email: ' + err.message, 'error');
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
}

// Listen for password recovery event from Supabase
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'PASSWORD_RECOVERY') {
    // Show reset password modal when user clicks recovery link
    showResetPasswordModal();
  }
});

function showResetPasswordModal() {
  const modal = document.createElement('div');
  modal.className = 'ov on';
  modal.innerHTML = `
    <div class="mdl" style="max-width:420px; border-radius:1.5rem; overflow:hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
      <div style="background: linear-gradient(135deg, var(--grn), #10b981); padding: 2.5rem 1.5rem 1.5rem; text-align: center; position: relative;">
        <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3); box-shadow: 0 8px 16px rgba(0,0,0,0.1); font-size: 2.2rem; line-height: 1;">
          🔐
        </div>
        <h2 style="color: #fff; margin: 0; font-family: 'Nunito', sans-serif; font-size: 1.5rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Buat Sandi Baru</h2>
        <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem; margin-top: 0.5rem; font-weight: 500;">Silakan amankan akun Anda.</p>
      </div>
      <div class="mdl-b" style="padding: 2rem; background: var(--card);">
        <p style="margin-bottom: 1.5rem; color: var(--tx2); line-height: 1.6; text-align: center; font-size: 0.95rem;">
          Masukkan kata sandi baru Anda. Gunakan kombinasi huruf dan angka (minimal 6 karakter).
        </p>
        <div class="fg" style="margin-bottom: 1.2rem; position: relative;">
          <label class="fl" style="font-weight: 700; margin-bottom: 0.6rem; color: var(--tx1); font-size: 0.9rem;">Kata Sandi Baru</label>
          <div style="position: relative;">
            <div style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--tx3); font-size: 1.1rem; line-height: 1;">🔒</div>
            <input id="newPassword" type="password" class="fi" placeholder="Minimal 6 karakter" required style="padding: 0.8rem 1rem 0.8rem 2.8rem; font-size: 0.95rem; border-radius: 0.8rem; border: 2px solid var(--brd); background: var(--bg2); transition: all 0.2s; width: 100%; box-sizing: border-box; outline: none;" onfocus="this.style.borderColor='var(--grn)'; this.style.boxShadow='0 0 0 4px rgba(16, 185, 129, 0.1)'; this.style.background='#fff'" onblur="this.style.borderColor='var(--brd)'; this.style.boxShadow='none'; this.style.background='var(--bg2)'">
          </div>
        </div>
        <div class="fg" style="margin-bottom: 2rem; position: relative;">
          <label class="fl" style="font-weight: 700; margin-bottom: 0.6rem; color: var(--tx1); font-size: 0.9rem;">Konfirmasi Kata Sandi</label>
          <div style="position: relative;">
            <div style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--tx3); font-size: 1.1rem; line-height: 1;">🛡️</div>
            <input id="confirmPassword" type="password" class="fi" placeholder="Ketik ulang kata sandi" required style="padding: 0.8rem 1rem 0.8rem 2.8rem; font-size: 0.95rem; border-radius: 0.8rem; border: 2px solid var(--brd); background: var(--bg2); transition: all 0.2s; width: 100%; box-sizing: border-box; outline: none;" onfocus="this.style.borderColor='var(--grn)'; this.style.boxShadow='0 0 0 4px rgba(16, 185, 129, 0.1)'; this.style.background='#fff'" onblur="this.style.borderColor='var(--brd)'; this.style.boxShadow='none'; this.style.background='var(--bg2)'">
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <button id="btnUpdatePassword" class="btn btn-pri" style="width: 100%; justify-content: center; padding: 0.9rem; font-size: 1rem; border-radius: 0.8rem; font-weight: 700; background: var(--grn); border-color: var(--grn); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.3)'" onclick="updatePassword()">
            Perbarui Kata Sandi
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

function togglePasswordVisibility(inputId, buttonEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  const eyeIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  const eyeOffIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

  if (input.type === 'password') {
    input.type = 'text';
    buttonEl.innerHTML = eyeIcon;
  } else {
    input.type = 'password';
    buttonEl.innerHTML = eyeOffIcon;
  }
}
