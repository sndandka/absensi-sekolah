-- ══════════════════════════════════════════════════════════════
-- SiAbsen SMK — Fix RLS Policies untuk Admin CRUD
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ── HELPER FUNCTION: Cek role dari JWT token ─────────────────
-- Fungsi ini membaca role dari tabel profiles berdasarkan user yang login
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;


-- ══════════════════════════════════════════════════════════════
-- TABEL: classes
-- ══════════════════════════════════════════════════════════════
-- Hapus policy lama
DROP POLICY IF EXISTS "classes_select" ON public.classes;
DROP POLICY IF EXISTS "classes_insert" ON public.classes;
DROP POLICY IF EXISTS "classes_update" ON public.classes;
DROP POLICY IF EXISTS "classes_delete" ON public.classes;
DROP POLICY IF EXISTS "Allow all for admin" ON public.classes;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.classes;

-- Aktifkan RLS (jika belum)
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Semua user yang login bisa READ
CREATE POLICY "classes_select" ON public.classes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Hanya admin bisa INSERT
CREATE POLICY "classes_insert" ON public.classes
  FOR INSERT WITH CHECK (public.get_my_role() = 'admin');

-- Hanya admin bisa UPDATE
CREATE POLICY "classes_update" ON public.classes
  FOR UPDATE USING (public.get_my_role() = 'admin');

-- Hanya admin bisa DELETE
CREATE POLICY "classes_delete" ON public.classes
  FOR DELETE USING (public.get_my_role() = 'admin');


-- ══════════════════════════════════════════════════════════════
-- TABEL: students
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "students_select" ON public.students;
DROP POLICY IF EXISTS "students_insert" ON public.students;
DROP POLICY IF EXISTS "students_update" ON public.students;
DROP POLICY IF EXISTS "students_delete" ON public.students;
DROP POLICY IF EXISTS "Allow all for admin" ON public.students;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.students;

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "students_select" ON public.students
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "students_insert" ON public.students
  FOR INSERT WITH CHECK (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "students_update" ON public.students
  FOR UPDATE USING (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "students_delete" ON public.students
  FOR DELETE USING (public.get_my_role() = 'admin');


-- ══════════════════════════════════════════════════════════════
-- TABEL: teachers
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "teachers_select" ON public.teachers;
DROP POLICY IF EXISTS "teachers_insert" ON public.teachers;
DROP POLICY IF EXISTS "teachers_update" ON public.teachers;
DROP POLICY IF EXISTS "teachers_delete" ON public.teachers;
DROP POLICY IF EXISTS "Allow all for admin" ON public.teachers;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.teachers;

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teachers_select" ON public.teachers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "teachers_insert" ON public.teachers
  FOR INSERT WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "teachers_update" ON public.teachers
  FOR UPDATE USING (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "teachers_delete" ON public.teachers
  FOR DELETE USING (public.get_my_role() = 'admin');


-- ══════════════════════════════════════════════════════════════
-- TABEL: subjects (mata pelajaran)
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "subjects_select" ON public.subjects;
DROP POLICY IF EXISTS "subjects_insert" ON public.subjects;
DROP POLICY IF EXISTS "subjects_update" ON public.subjects;
DROP POLICY IF EXISTS "subjects_delete" ON public.subjects;
DROP POLICY IF EXISTS "Allow all for admin" ON public.subjects;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.subjects;

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subjects_select" ON public.subjects
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "subjects_insert" ON public.subjects
  FOR INSERT WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "subjects_update" ON public.subjects
  FOR UPDATE USING (public.get_my_role() = 'admin');

CREATE POLICY "subjects_delete" ON public.subjects
  FOR DELETE USING (public.get_my_role() = 'admin');


-- ══════════════════════════════════════════════════════════════
-- TABEL: teaching_schedules (jadwal pelajaran)
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "schedules_select" ON public.teaching_schedules;
DROP POLICY IF EXISTS "schedules_insert" ON public.teaching_schedules;
DROP POLICY IF EXISTS "schedules_update" ON public.teaching_schedules;
DROP POLICY IF EXISTS "schedules_delete" ON public.teaching_schedules;
DROP POLICY IF EXISTS "Allow all for admin" ON public.teaching_schedules;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.teaching_schedules;

ALTER TABLE public.teaching_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "schedules_select" ON public.teaching_schedules
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "schedules_insert" ON public.teaching_schedules
  FOR INSERT WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "schedules_update" ON public.teaching_schedules
  FOR UPDATE USING (public.get_my_role() = 'admin');

CREATE POLICY "schedules_delete" ON public.teaching_schedules
  FOR DELETE USING (public.get_my_role() = 'admin');


-- ══════════════════════════════════════════════════════════════
-- TABEL: attendance (data absensi)
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "attendance_select" ON public.attendance;
DROP POLICY IF EXISTS "attendance_insert" ON public.attendance;
DROP POLICY IF EXISTS "attendance_update" ON public.attendance;
DROP POLICY IF EXISTS "attendance_delete" ON public.attendance;
DROP POLICY IF EXISTS "Allow all for admin" ON public.attendance;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.attendance;

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "attendance_select" ON public.attendance
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "attendance_insert" ON public.attendance
  FOR INSERT WITH CHECK (public.get_my_role() IN ('admin', 'guru', 'siswa'));

CREATE POLICY "attendance_update" ON public.attendance
  FOR UPDATE USING (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "attendance_delete" ON public.attendance
  FOR DELETE USING (public.get_my_role() IN ('admin', 'guru'));


-- ══════════════════════════════════════════════════════════════
-- TABEL: profiles
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "Allow all for admin" ON public.profiles;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.profiles;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Semua bisa membaca
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- User bisa update profil sendiri, admin bisa update siapapun
CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id OR public.get_my_role() = 'admin'
  );


-- ══════════════════════════════════════════════════════════════
-- TABEL: settings
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "settings_select" ON public.settings;
DROP POLICY IF EXISTS "settings_insert" ON public.settings;
DROP POLICY IF EXISTS "settings_update" ON public.settings;
DROP POLICY IF EXISTS "Allow all for admin" ON public.settings;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.settings;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "settings_select" ON public.settings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "settings_upsert" ON public.settings
  FOR ALL USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');


-- ══════════════════════════════════════════════════════════════
-- TABEL: permits (izin/sakit)
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "permits_select" ON public.permits;
DROP POLICY IF EXISTS "permits_insert" ON public.permits;
DROP POLICY IF EXISTS "permits_update" ON public.permits;
DROP POLICY IF EXISTS "permits_delete" ON public.permits;
DROP POLICY IF EXISTS "Allow all for admin" ON public.permits;

ALTER TABLE public.permits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "permits_select" ON public.permits
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "permits_insert" ON public.permits
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "permits_update" ON public.permits
  FOR UPDATE USING (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "permits_delete" ON public.permits
  FOR DELETE USING (public.get_my_role() IN ('admin', 'guru'));


-- ══════════════════════════════════════════════════════════════
-- TABEL: teaching_journals (agenda mengajar)
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "journals_select" ON public.teaching_journals;
DROP POLICY IF EXISTS "journals_insert" ON public.teaching_journals;
DROP POLICY IF EXISTS "journals_update" ON public.teaching_journals;
DROP POLICY IF EXISTS "journals_delete" ON public.teaching_journals;
DROP POLICY IF EXISTS "Allow all for admin" ON public.teaching_journals;

ALTER TABLE public.teaching_journals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "journals_select" ON public.teaching_journals
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "journals_insert" ON public.teaching_journals
  FOR INSERT WITH CHECK (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "journals_update" ON public.teaching_journals
  FOR UPDATE USING (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "journals_delete" ON public.teaching_journals
  FOR DELETE USING (public.get_my_role() IN ('admin', 'guru'));


-- ══════════════════════════════════════════════════════════════
-- TABEL: announcements (pengumuman)
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "ann_select" ON public.announcements;
DROP POLICY IF EXISTS "ann_insert" ON public.announcements;
DROP POLICY IF EXISTS "ann_update" ON public.announcements;
DROP POLICY IF EXISTS "ann_delete" ON public.announcements;
DROP POLICY IF EXISTS "Allow all for admin" ON public.announcements;

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ann_select" ON public.announcements
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "ann_insert" ON public.announcements
  FOR INSERT WITH CHECK (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "ann_update" ON public.announcements
  FOR UPDATE USING (public.get_my_role() IN ('admin', 'guru'));

CREATE POLICY "ann_delete" ON public.announcements
  FOR DELETE USING (public.get_my_role() IN ('admin', 'guru'));


-- ══════════════════════════════════════════════════════════════
-- SELESAI - Semua RLS policies sudah dikonfigurasi
-- ══════════════════════════════════════════════════════════════
