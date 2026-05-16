-- ╔══════════════════════════════════════════════════════════╗
-- ║  SiAbsen — Seed Jadwal Pelajaran (Schedules)             ║
-- ╚══════════════════════════════════════════════════════════╝

DO $$
DECLARE
    v_class_id INTEGER;
    v_subject_id INTEGER;
    v_teacher_id INTEGER;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'X RPL 1') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('X RPL 1', 'X', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'X RPL 2') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('X RPL 2', 'X', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'X TKJ 1') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('X TKJ 1', 'X', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'X TKJ 2') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('X TKJ 2', 'X', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XI RPL 1') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XI RPL 1', 'XI', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XI RPL 2') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XI RPL 2', 'XI', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XI TKJ 1') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XI TKJ 1', 'XI', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XI TKJ 2') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XI TKJ 2', 'XI', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XII RPL 1') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XII RPL 1', 'XII', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XII RPL 2') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XII RPL 2', 'XII', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XII TKJ 1') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XII TKJ 1', 'XII', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.classes WHERE name = 'XII TKJ 2') THEN
        INSERT INTO public.classes (name, grade, capacity) VALUES ('XII TKJ 2', 'XII', 36);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'BK') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('BK', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'BK / Mapel Pilihan') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('BK / Mapel Pilihan', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Bahasa Indonesia') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Bahasa Indonesia', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Bahasa Indonesia (Lanj)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Bahasa Indonesia (Lanj)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Bahasa Inggris') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Bahasa Inggris', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Bahasa Inggris (Lanj)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Bahasa Inggris (Lanj)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Dasar Kejuruan (Logika)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Dasar Kejuruan (Logika)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Dasar Kejuruan (Praktik)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Dasar Kejuruan (Praktik)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Dasar TJKT (Bengkel)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Dasar TJKT (Bengkel)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Dasar TJKT (Teori)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Dasar TJKT (Teori)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'IPAS') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('IPAS', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Informatika') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Informatika', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Adv Web') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Adv Web', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Basis Data') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Basis Data', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Infrastruktur') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Infrastruktur', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Integrasi Sistem') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Integrasi Sistem', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Keamanan Jaringan') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Keamanan Jaringan', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: PBO / Mobile') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: PBO / Mobile', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Pemrograman Web') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Pemrograman Web', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Sistem Jaringan') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Sistem Jaringan', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: WAN') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: WAN', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Kejuruan: Wireless/FO') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Kejuruan: Wireless/FO', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Mata Pelajaran Pilihan') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Mata Pelajaran Pilihan', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Matematika') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Matematika', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Mentoring Tugas Akhir/UKK') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Mentoring Tugas Akhir/UKK', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Mentoring UKK / Sertifikasi') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Mentoring UKK / Sertifikasi', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'P5') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('P5', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'PJOK') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('PJOK', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'PJOK (Olahraga)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('PJOK (Olahraga)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'PKK / Pendidikan Pancasila') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('PKK / Pendidikan Pancasila', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Pendidikan Agama') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Pendidikan Agama', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Pendidikan Pancasila') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Pendidikan Pancasila', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Pendidikan Pancasila / PKK') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Pendidikan Pancasila / PKK', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Pramuka') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Pramuka', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Produk Kreatif & Kewirausahaan (PKK)') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Produk Kreatif & Kewirausahaan (PKK)', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Sejarah') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Sejarah', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Senam/Jumat Bersih') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Senam/Jumat Bersih', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Seni Budaya') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Seni Budaya', '#3b82f6', '📚');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas') THEN
        INSERT INTO public.subjects (name, color, emoji) VALUES ('Upacara & Jam Wali Kelas', '#3b82f6', '📚');
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PJOK (Olahraga)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0030' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar Kejuruan (Logika)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0008' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Seni Budaya' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0039' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar Kejuruan (Praktik)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0009' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar Kejuruan (Praktik)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0009' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Informatika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0013' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'IPAS' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0012' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Sejarah' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0037' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pramuka' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0035' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Informatika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0013' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pramuka' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0035' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar Kejuruan (Praktik)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0009' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar Kejuruan (Logika)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0008' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PJOK (Olahraga)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0030' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar Kejuruan (Praktik)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0009' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Seni Budaya' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0039' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'IPAS' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0012' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Sejarah' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0037' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0007' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Basis Data' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0015' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Basis Data' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0015' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PJOK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0029' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Pemrograman Web' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0020' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: PBO / Mobile' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0019' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: PBO / Mobile' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0019' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'BK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0002' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PKK / Pendidikan Pancasila' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0031' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: PBO / Mobile' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0019' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: PBO / Mobile' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0019' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Pemrograman Web' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0020' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'BK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0002' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Pemrograman Web' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0020' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Pancasila / PKK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0034' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Basis Data' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0015' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Basis Data' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0015' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0007' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Integrasi Sistem' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0017' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Integrasi Sistem' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0017' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mata Pelajaran Pilihan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0024' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Adv Web' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0014' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Pancasila' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0033' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Produk Kreatif & Kewirausahaan (PKK)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0036' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mentoring Tugas Akhir/UKK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0026' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Adv Web' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0014' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0005' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mentoring Tugas Akhir/UKK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0026' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Integrasi Sistem' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0017' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Adv Web' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0014' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mata Pelajaran Pilihan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0024' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0005' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Produk Kreatif & Kewirausahaan (PKK)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0036' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Integrasi Sistem' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0017' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII RPL 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Adv Web' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0014' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Sejarah' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0037' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar TJKT (Teori)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0011' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar TJKT (Bengkel)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0010' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pramuka' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0035' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'IPAS' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0012' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar TJKT (Bengkel)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0010' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Seni Budaya' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0039' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PJOK (Olahraga)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0030' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Informatika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0013' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Informatika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0013' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar TJKT (Bengkel)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0010' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Seni Budaya' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0039' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Sejarah' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0037' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PJOK (Olahraga)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0030' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pramuka' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0035' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar TJKT (Teori)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0011' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'IPAS' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0012' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Dasar TJKT (Bengkel)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0010' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'X TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Infrastruktur' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0016' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'BK / Mapel Pilihan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0003' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0007' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Wireless/FO' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0023' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Wireless/FO' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0023' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Infrastruktur' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0016' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PJOK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0029' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'PKK / Pendidikan Pancasila' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0031' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Sistem Jaringan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0021' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0007' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Wireless/FO' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0023' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Sistem Jaringan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0021' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Infrastruktur' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0016' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'BK / Mapel Pilihan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0003' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Infrastruktur' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0016' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Sistem Jaringan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0021' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Pancasila / PKK' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0034' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Wireless/FO' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0023' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XI TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0005' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: WAN' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0022' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Pancasila' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0033' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mentoring UKK / Sertifikasi' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0027' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Keamanan Jaringan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0018' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mata Pelajaran Pilihan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0024' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Keamanan Jaringan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0018' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: WAN' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0022' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 1' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Produk Kreatif & Kewirausahaan (PKK)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0036' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '07:00:00', '08:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Matematika' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0025' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'P5' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0028' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: WAN' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0022' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia (Lanj)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0005' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Upacara & Jam Wali Kelas' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0040' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 3 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 3, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Keamanan Jaringan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0018' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '07:00:00', '09:15:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Indonesia' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0004' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '13:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '13:30:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Senam/Jumat Bersih' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0038' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 2 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 2, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Produk Kreatif & Kewirausahaan (PKK)' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0036' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: WAN' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0022' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '13:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '13:00:00', '15:30:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Bahasa Inggris' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0006' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '07:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '07:00:00', '08:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Kejuruan: Keamanan Jaringan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0018' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '08:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '08:30:00', '10:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mentoring UKK / Sertifikasi' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0027' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 1 AND start_time = '10:15:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 1, '10:15:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Mata Pelajaran Pilihan' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0024' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 4 AND start_time = '09:30:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 4, '09:30:00', '12:00:00');
        END IF;
    END IF;
    SELECT id INTO v_class_id FROM public.classes WHERE name = 'XII TKJ 2' LIMIT 1;
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Pendidikan Agama' LIMIT 1;
    SELECT id INTO v_teacher_id FROM public.teachers WHERE nip = '0032' LIMIT 1;
    IF v_class_id IS NOT NULL AND v_subject_id IS NOT NULL AND v_teacher_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.teaching_schedules WHERE class_id = v_class_id AND day = 5 AND start_time = '08:00:00') THEN
            INSERT INTO public.teaching_schedules (teacher_id, class_id, subject_id, day, start_time, end_time)
            VALUES (v_teacher_id, v_class_id, v_subject_id, 5, '08:00:00', '11:00:00');
        END IF;
    END IF;
END $$;