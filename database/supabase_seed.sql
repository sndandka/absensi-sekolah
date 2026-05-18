-- ╔══════════════════════════════════════════════════════════╗
-- ║  SiAbsen — Seed Data Supabase (PostgreSQL)               ║
-- ║  Gunakan script ini di SQL Editor Supabase untuk         ║
-- ║  menginisialisasi data awal sekolah.                     ║
-- ╚══════════════════════════════════════════════════════════╝

-- 1. Pengaturan Sekolah (Settings)
INSERT INTO public.settings (setting_key, setting_value) VALUES
('schoolName', 'SMK Pusat Keunggulan Digital'),
('schoolAddress', 'Jl. Industri Teknologi No. 45'),
('schoolPhone', '021-99887766'),
('schoolEmail', 'info@smk-pk-digital.sch.id'),
('principalName', 'Dr. Ing. Heru Wijaya, M.T.'),
('academicYear', '2025/2026'),
('attendanceRadius', '100'), -- Radius dalam meter
('schoolLat', '-6.200000'), -- Koordinat sekolah (sesuaikan)
('schoolLng', '106.816666')
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- 2. Daftar Mata Pelajaran (Subjects)
INSERT INTO public.subjects (name, code, color, emoji) VALUES
('Matematika', 'MAT', '#ef4444', '📐'),
('Bahasa Indonesia', 'BIN', '#3b82f6', '📖'),
('Bahasa Inggris', 'BIG', '#10b981', '🌎'),
('Dasar Desain Grafis', 'DDG', '#8b5cf6', '🎨'),
('Pemrograman Web', 'WEB', '#f59e0b', '💻'),
('Basis Data', 'DB', '#06b6d4', '🗄️'),
('Pendidikan Jasmani', 'PJOK', '#f43f5e', '⚽'),
('Fisika', 'FIS', '#84cc16', '⚡')
ON CONFLICT DO NOTHING;

-- 3. Daftar Kelas (Classes)
INSERT INTO public.classes (name, grade, major, room, capacity) VALUES
('X RPL 1', 'X', 'RPL', 'R.101', 36),
('X RPL 2', 'X', 'RPL', 'R.102', 36),
('XI RPL 1', 'XI', 'RPL', 'R.201', 36),
('XI RPL 2', 'XI', 'RPL', 'R.202', 36),
('XII RPL 1', 'XII', 'RPL', 'R.301', 36),
('X TKJ 1', 'X', 'TKJ', 'Lab.1', 32),
('XI TKJ 1', 'XI', 'TKJ', 'Lab.2', 32)
ON CONFLICT DO NOTHING;

-- 4. Pengumuman Awal (Announcements)
INSERT INTO public.announcements (title, body, priority, author) VALUES
('Selamat Datang di SiAbsen SMK', 'Selamat datang di sistem absensi digital baru sekolah kita. Silakan lakukan registrasi wajah bagi seluruh siswa.', 'info', 'Admin Sistem'),
('Jadwal Ujian Tengah Semester', 'UTS akan dilaksanakan mulai tanggal 20 Oktober 2025. Harap persiapkan diri dengan baik.', 'penting', 'Kurikulum')
ON CONFLICT DO NOTHING;
