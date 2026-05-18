-- ╔══════════════════════════════════════════════════════════╗
-- ║  SiAbsen — Seed Data Guru (1 Guru/Mapel)                 ║
-- ╚══════════════════════════════════════════════════════════╝

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0002') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru BK', '0002', 'BK', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0003') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru BK / Mapel Pilihan', '0003', 'BK / Mapel Pilihan', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0004') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Bahasa Indonesia', '0004', 'Bahasa Indonesia', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0005') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Bahasa Indonesia (Lanj)', '0005', 'Bahasa Indonesia (Lanj)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0006') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Bahasa Inggris', '0006', 'Bahasa Inggris', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0007') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Bahasa Inggris (Lanj)', '0007', 'Bahasa Inggris (Lanj)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0008') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Dasar Kejuruan (Logika)', '0008', 'Dasar Kejuruan (Logika)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0009') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Dasar Kejuruan (Praktik)', '0009', 'Dasar Kejuruan (Praktik)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0010') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Dasar TJKT (Bengkel)', '0010', 'Dasar TJKT (Bengkel)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0011') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Dasar TJKT (Teori)', '0011', 'Dasar TJKT (Teori)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0012') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru IPAS', '0012', 'IPAS', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0013') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Informatika', '0013', 'Informatika', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0014') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Adv Web', '0014', 'Kejuruan: Adv Web', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0015') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Basis Data', '0015', 'Kejuruan: Basis Data', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0016') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Infrastruktur', '0016', 'Kejuruan: Infrastruktur', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0017') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Integrasi Sistem', '0017', 'Kejuruan: Integrasi Sistem', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0018') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Keamanan Jaringan', '0018', 'Kejuruan: Keamanan Jaringan', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0019') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: PBO / Mobile', '0019', 'Kejuruan: PBO / Mobile', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0020') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Pemrograman Web', '0020', 'Kejuruan: Pemrograman Web', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0021') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Sistem Jaringan', '0021', 'Kejuruan: Sistem Jaringan', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0022') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: WAN', '0022', 'Kejuruan: WAN', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0023') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Kejuruan: Wireless/FO', '0023', 'Kejuruan: Wireless/FO', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0024') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Mata Pelajaran Pilihan', '0024', 'Mata Pelajaran Pilihan', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0025') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Matematika', '0025', 'Matematika', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0026') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Mentoring Tugas Akhir/UKK', '0026', 'Mentoring Tugas Akhir/UKK', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0027') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Mentoring UKK / Sertifikasi', '0027', 'Mentoring UKK / Sertifikasi', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0028') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru P5', '0028', 'P5', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0029') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru PJOK', '0029', 'PJOK', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0030') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru PJOK (Olahraga)', '0030', 'PJOK (Olahraga)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0031') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru PKK / Pendidikan Pancasila', '0031', 'PKK / Pendidikan Pancasila', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0032') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Pendidikan Agama', '0032', 'Pendidikan Agama', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0033') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Pendidikan Pancasila', '0033', 'Pendidikan Pancasila', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0034') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Pendidikan Pancasila / PKK', '0034', 'Pendidikan Pancasila / PKK', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0035') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Pramuka', '0035', 'Pramuka', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0036') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Produk Kreatif & Kewirausahaan (PKK)', '0036', 'Produk Kreatif & Kewirausahaan (PKK)', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0037') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Sejarah', '0037', 'Sejarah', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0038') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Senam/Jumat Bersih', '0038', 'Senam/Jumat Bersih', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0039') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Seni Budaya', '0039', 'Seni Budaya', '081234567890', true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.teachers WHERE nip = '0040') THEN
        INSERT INTO public.teachers (name, nip, subject, phone, active)
        VALUES ('Guru Upacara & Jam Wali Kelas', '0040', 'Upacara & Jam Wali Kelas', '081234567890', true);
    END IF;
END $$;