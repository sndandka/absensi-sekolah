-- ╔══════════════════════════════════════════════════════════╗
-- ║  SiAbsen — Skema Database Supabase (PostgreSQL)         ║
-- ║  Migrasi dari MySQL ke PostgreSQL                       ║
-- ╚══════════════════════════════════════════════════════════╝

-- ── 1. USERS (Profiles linked to Supabase Auth) ────────────────
-- Supabase handles authentication in the 'auth' schema.
-- We create a 'profiles' table in 'public' to store extra info.
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT CHECK (role IN ('admin','guru','siswa','ortu')) NOT NULL DEFAULT 'siswa',
  photo TEXT DEFAULT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ── 2. STUDENTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.students (
  id SERIAL PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  nisn TEXT DEFAULT NULL,
  no INTEGER DEFAULT 0,
  gender TEXT CHECK (gender IN ('L','P')) NOT NULL DEFAULT 'L',
  phone TEXT DEFAULT NULL,
  parent_name TEXT DEFAULT NULL,
  parent_phone TEXT DEFAULT NULL,
  class_id INTEGER DEFAULT NULL,
  class_name TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  face_data TEXT DEFAULT NULL,
  auth_linked BOOLEAN DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- ── 3. TEACHERS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.teachers (
  id SERIAL PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  nip TEXT DEFAULT NULL,
  subject TEXT DEFAULT NULL,
  homeroom TEXT DEFAULT NULL,
  phone TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- ── 4. CLASSES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.classes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  grade TEXT DEFAULT NULL,
  major TEXT DEFAULT NULL,
  room TEXT DEFAULT NULL,
  capacity INTEGER NOT NULL DEFAULT 36,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- ── 5. SUBJECTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subjects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT DEFAULT NULL,
  color TEXT DEFAULT '#6366f1',
  emoji TEXT DEFAULT '📚',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- ── 6. ATTENDANCE ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.attendance (
  id SERIAL PRIMARY KEY,
  date_key TEXT NOT NULL, -- Format: YYYY_MM_DD
  class_id INTEGER REFERENCES public.classes(id) ON DELETE SET NULL,
  class_name TEXT DEFAULT NULL,
  student_id INTEGER REFERENCES public.students(id) ON DELETE CASCADE,
  student_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT NULL,
  nisn TEXT DEFAULT NULL,
  subject_key TEXT DEFAULT NULL,
  subject TEXT DEFAULT NULL,
  status TEXT CHECK (status IN ('hadir','izin','sakit','alpha','terlambat')) NOT NULL DEFAULT 'alpha',
  time BIGINT DEFAULT NULL,
  teacher_id INTEGER REFERENCES public.teachers(id) ON DELETE SET NULL,
  teacher_name TEXT DEFAULT NULL,
  lat DECIMAL(10,6) DEFAULT NULL,
  lng DECIMAL(10,6) DEFAULT NULL,
  self_checkin BOOLEAN DEFAULT false,
  liveness_score DECIMAL(5,3) DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (date_key, class_id, student_user_id, subject_key)
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- ── 7. PERMITS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.permits (
  id SERIAL PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT DEFAULT NULL,
  class_name TEXT DEFAULT NULL,
  nisn TEXT DEFAULT NULL,
  type TEXT CHECK (type IN ('izin','sakit')) NOT NULL DEFAULT 'izin',
  start_date DATE NOT NULL,
  end_date DATE DEFAULT NULL,
  reason TEXT DEFAULT NULL,
  evidence TEXT DEFAULT NULL,
  status TEXT CHECK (status IN ('pending','approved','rejected')) NOT NULL DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ DEFAULT NULL,
  rejection_reason TEXT DEFAULT NULL,
  rejected_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.permits ENABLE ROW LEVEL SECURITY;

-- ── 8. ANNOUNCEMENTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.announcements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  priority TEXT DEFAULT NULL,
  author TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- ── 9. NOTIFICATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT DEFAULT NULL,
  type TEXT DEFAULT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ── 10. ACTIVITY_LOG ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activity_log (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT DEFAULT NULL,
  role TEXT DEFAULT NULL,
  action TEXT DEFAULT NULL,
  detail TEXT DEFAULT NULL,
  ts TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ── 11. SETTINGS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.settings (
  setting_key TEXT PRIMARY KEY,
  setting_value TEXT DEFAULT NULL
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- ── 12. TEACHING_JOURNALS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.teaching_journals (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES public.teachers(id) ON DELETE CASCADE,
  teacher_name TEXT DEFAULT NULL,
  class_id INTEGER REFERENCES public.classes(id) ON DELETE CASCADE,
  class_name TEXT DEFAULT NULL,
  subject_id INTEGER REFERENCES public.subjects(id) ON DELETE CASCADE,
  subject_name TEXT DEFAULT NULL,
  date_key TEXT NOT NULL,
  material TEXT NOT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.teaching_journals ENABLE ROW LEVEL SECURITY;

-- ── 13. TEACHING_SCHEDULES ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.teaching_schedules (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES public.teachers(id) ON DELETE CASCADE,
  class_id INTEGER REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id INTEGER REFERENCES public.subjects(id) ON DELETE CASCADE,
  day INTEGER NOT NULL, -- 0=Minggu, 1=Senin, ...
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.teaching_schedules ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════
-- BASIC RLS POLICIES (Allow all for development, refine later)
-- ══════════════════════════════════════════════════════════

-- For simplicity, we allow all authenticated users to do everything in dev.
-- In production, you MUST restrict these!

CREATE POLICY "Allow authenticated users to read everything" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.students FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.teachers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.classes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.subjects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.attendance FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.permits FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.announcements FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.notifications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.activity_log FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.settings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.teaching_journals FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read everything" ON public.teaching_schedules FOR SELECT USING (auth.role() = 'authenticated');

-- INSERT Policies (Allow authenticated users)
CREATE POLICY "Allow authenticated insert" ON public.profiles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.students FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.teachers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.classes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.subjects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.attendance FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.permits FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.announcements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.activity_log FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.teaching_journals FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.teaching_schedules FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- UPDATE Policies (Allow authenticated users)
CREATE POLICY "Allow authenticated update" ON public.profiles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.students FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.teachers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.classes FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.subjects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.attendance FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.permits FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.announcements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.notifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.activity_log FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.teaching_journals FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.teaching_schedules FOR UPDATE USING (auth.role() = 'authenticated');

-- DELETE Policies (Allow authenticated users)
CREATE POLICY "Allow authenticated delete" ON public.profiles FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.students FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.teachers FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.classes FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.subjects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.attendance FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.permits FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.announcements FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.notifications FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.activity_log FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.settings FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.teaching_journals FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.teaching_schedules FOR DELETE USING (auth.role() = 'authenticated');

-- ══════════════════════════════════════════════════════════
-- AUTH TRIGGER (Sync Supabase Auth with Profiles)
-- ══════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_nisn TEXT;
  v_student_id INTEGER;
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'User'), NEW.email, COALESCE(NEW.raw_user_meta_data->>'role', 'siswa'));
  
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'siswa') = 'siswa' THEN
    v_nisn := NEW.raw_user_meta_data->>'nisn';
    
    IF v_nisn IS NULL OR v_nisn = '' THEN
      RAISE EXCEPTION 'NISN wajib diisi untuk registrasi siswa.';
    END IF;

    -- Cek apakah admin sudah mendaftarkan siswa dengan NISN ini
    SELECT id INTO v_student_id FROM public.students WHERE nisn = v_nisn LIMIT 1;
    
    IF v_student_id IS NOT NULL THEN
      -- Link (hubungkan) akun Auth ke data siswa yang sudah ada
      UPDATE public.students 
      SET user_id = NEW.id, email = NEW.email, auth_linked = true 
      WHERE id = v_student_id;
    ELSE
      -- Tolak registrasi jika NISN belum didaftarkan oleh admin
      RAISE EXCEPTION 'Registrasi ditolak: NISN % tidak terdaftar! Hubungi Admin.', v_nisn;
    END IF;
  ELSIF COALESCE(NEW.raw_user_meta_data->>'role', 'siswa') = 'guru' THEN
    DECLARE
      v_nip TEXT;
      v_teacher_id INTEGER;
    BEGIN
      v_nip := NEW.raw_user_meta_data->>'nip';
      IF v_nip IS NULL OR v_nip = '' THEN
        RAISE EXCEPTION 'NIP wajib diisi untuk registrasi guru.';
      END IF;

      -- Cek apakah admin sudah mendaftarkan guru dengan NIP ini
      SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = v_nip LIMIT 1;
      
      IF v_teacher_id IS NOT NULL THEN
        UPDATE public.teachers 
        SET user_id = NEW.id, email = NEW.email 
        WHERE id = v_teacher_id;
      ELSE
        -- Tolak registrasi jika NIP belum didaftarkan oleh admin
        RAISE EXCEPTION 'Registrasi ditolak: NIP % tidak terdaftar! Hubungi Admin.', v_nip;
      END IF;
    END;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
