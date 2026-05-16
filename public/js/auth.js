/* ═══════════════════════════════════════════════
   SiAbsen — Auth (auth.js) — Supabase Version
   ═══════════════════════════════════════════════ */

async function handleLogin(e){
  e.preventDefault();
  const email = id('lEmail').value.trim(), pass = id('lPass').value;
  const btn = id('loginBtn');
  if(!email||!pass) return showToast('Isi email dan password!','warning');
  btn.innerHTML='<div class="spin"></div>'; btn.disabled=true;
  try{
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if(error) throw error;
    
    // Login success — reload session
    await checkSession();
  }catch(err){
    showToast('Login gagal: '+err.message,'error');
    btn.innerHTML='Masuk →'; btn.disabled=false;
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
  const email = prompt('Masukkan email Anda:');
  if(!email) return;
  try{
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    if(error) throw error;
    showToast('Email reset password telah dikirim.','info');
  }catch(err){ 
    showToast('Gagal: '+err.message,'error'); 
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
