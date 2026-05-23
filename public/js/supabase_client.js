/* ═══════════════════════════════════════════════
   SiAbsen - Supabase Client Initialization
   ═══════════════════════════════════════════════ */

const SUPABASE_URL = 'https://whxeftkyxtsllmfzcabm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qHDfEFXyPS8xI8L_ZttdAg_vB6Rm7kP';

// Inisialisasi client
// Menggunakan destructuring agar tidak bentrok dengan nama variabel
const { createClient } = supabase;
const supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY);

// Ekspos ke global agar bisa digunakan di script lain
window.supabase = supabaseInstance;

// Helper untuk mengecek konfigurasi
function isSupabaseConfigured() {
  return SUPABASE_URL.includes('.supabase.co') && SUPABASE_KEY.startsWith('sb_');
}
