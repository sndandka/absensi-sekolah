# 🎓 SiAbsen — Sistem Absensi Sekolah Digital (Supabase Cloud Version)

Aplikasi absensi digital modern yang telah dimigrasi dari PHP/MySQL ke arsitektur **Serverless** menggunakan **Supabase (PostgreSQL & Auth)**.
Mendukung **4 role**: Admin, Guru, Siswa, dan Orang Tua.

---

## 🚀 Fitur Utama (Versi Supabase)

- **Supabase Auth**: Autentikasi aman dengan session management otomatis.
- **Row Level Security (RLS)**: Keamanan data di tingkat database (PostgreSQL).
- **Face Recognition**: Absensi mandiri menggunakan AI (face-api.js) yang terhubung ke cloud database.
- **Real-time Activity Log**: Pencatatan aktivitas user langsung ke tabel log.
- **Serverless Architecture**: Tidak perlu lagi menjalankan Apache atau file PHP. Cukup jalankan di browser atau hosting statis.

---

## 🛠️ Setup Cepat

### 1. Persiapan Supabase
1. Buat proyek baru di [Supabase Dashboard](https://supabase.com/dashboard).
2. Buka **SQL Editor** di dashboard Supabase.
3. Jalankan script SQL dari file `database/supabase_schema.sql` untuk membuat tabel, RLS, dan trigger.

### 2. Konfigurasi Client
1. Dapatkan **Project URL** dan **Anon Key** dari menu `Project Settings > API` di Supabase.
2. Edit file `public/js/supabase_client.js` dan masukkan konfigurasi Anda:
   ```javascript
   const supabaseUrl = 'https://your-project-id.supabase.co';
   const supabaseKey = 'your-anon-key';
   const supabase = supabase.createClient(supabaseUrl, supabaseKey);
   ```

### 3. Jalankan Aplikasi
1. Cukup buka `index.html` di browser Anda (disarankan menggunakan Live Server di VS Code).
2. Lakukan registrasi user baru melalui menu **Register** di halaman login.

---

## 👥 Role & Fitur

### 1. Role: Admin (Pengelola Sistem)
*   **Dashboard**: Statistik real-time kehadiran seluruh siswa (Hadir, Izin, Sakit, Alpha).
*   **Manajemen User**: Pengelolaan profil pengguna yang terintegrasi dengan `auth.users`.
*   **Data Master**: Manajemen Kelas, Mata Pelajaran, dan Guru.

### 2. Role: Guru (Verifikator & Wali Kelas)
*   **Jurnal Mengajar**: Pencatatan materi ajar yang dilakukan secara real-time.
*   **Verifikasi Izin**: Menyetujui atau menolak pengajuan izin/sakit siswa.
*   **Absensi Manual**: Melakukan absensi batch untuk satu kelas.

### 3. Role: Siswa (Pengguna Utama)
*   **Presensi Mandiri**: Absensi menggunakan **Face Recognition** dengan validasi lokasi (GPS Geofencing).
*   **Registrasi Wajah**: Pendaftaran 3 pose wajah (Depan, Kiri, Kanan) untuk meningkatkan akurasi AI.
*   **Riwayat Kehadiran**: Kalender interaktif untuk memantau status kehadiran pribadi.

---

## 📊 Struktur Database Supabase

| Tabel | Deskripsi |
|-------|-----------|
| `profiles` | Data profil tambahan user (id dari `auth.users`) |
| `students` | Data detail siswa, termasuk `face_data` (JSON descriptors) |
| `teachers` | Data detail guru |
| `classes` | Data kelas |
| `subjects` | Mata pelajaran |
| `attendance` | Record absensi harian |
| `permits` | Pengajuan izin & sakit |
| `announcements` | Pengumuman sekolah |
| `activity_log` | Log aktivitas sistem |
| `settings` | Pengaturan sekolah (key-value) |

---

## 📁 Struktur Proyek (Terupdate)

```
absensi-sekolah/
├── index.html              ← Halaman utama (SPA)
├── database/
│   └── supabase_schema.sql ← Skema PostgreSQL (RLS + Triggers)
├── public/
│   ├── css/app.css          ← Styling
│   ├── models/              ← Model AI face-api.js
│   └── js/
│       ├── supabase_client.js  ← Inisialisasi Supabase SDK
│       ├── app.js              ← Core logic & Helper
│       ├── auth.js             ← Login/register (Supabase Auth)
│       ├── face_recognition.js ← AI logic & Self-checkin
│       ├── dashboard.js        ← Visualisasi data dashboard
│       ├── modules_absensi.js  ← Modul Input Absensi & Rekap
│       ├── modules_data.js     ← Manajemen Siswa, Guru, Kelas
│       ├── modules_guru.js     ← Jurnal & Jadwal Guru
│       └── modules_profil.js   ← Profil & Pengaturan
```

---

## 🤖 AI & Keamanan

- **Face-api.js**: Menggunakan model `SSD Mobilenet v1` untuk deteksi wajah dan `Face Recognition Net` untuk ekstraksi fitur 128-dimensi.
- **Geofencing**: Validasi koordinat GPS saat absensi mandiri untuk memastikan siswa berada di area sekolah (radius dapat diatur di Settings).
- **RLS Policies**: Memastikan data hanya dapat diakses/diubah oleh user yang berwenang (misal: siswa hanya bisa melihat datanya sendiri).

---

SiAbsen Cloud © 2025 — Sistem Absensi Sekolah Berbasis Supabase
