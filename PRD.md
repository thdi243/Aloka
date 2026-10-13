Product Requirement Document (PRD)

1. Ikhtisar Produk (Product Overview)
   - Nama Proyek / Aplikasi: Aloka
   - Deskripsi: Aplikasi manajemen anggaran dan pencatatan keuangan pribadi (personal budgeting) berbasis web yang ringan, responsif, dan mudah digunakan.
   - Tujuan Utama: Membantu pengguna memonitor arus kas harian/bulanan, mengalokasikan anggaran per pos belanja, dan memahami pola pengeluaran melalui visualisasi data ringkas.
   - Target Pengguna: Mahasiswa, pekerja awal karir (fresh graduate), maupun profesional muda yang membutuhkan pencatatan keuangan tanpa kompleksitas akuntansi korporat.

2. Tech Stack & Infrastruktur
   Frontend Framework: Next.js (App Router, TypeScript)
   Styling & UI Components: Tailwind CSS + shadcn/ui + Lucide Icons
   State & Data Fetching: React Server Components + TanStack Query (opsional) / Server Actions
   Backend, Auth & Database: Supabase
   PostgreSQL Database
   Supabase Auth (Email Password + Google OAuth)
   Row Level Security (RLS) untuk keamanan isolasi data per user
   Grafik & Visualisasi Data: Recharts
   Deployment & Hosting: Vercel (Hobby Tier - Gratis) & Supabase Free Tier

3. Scope & Batasan (Scope & Constraints)
   In-Scope (MVP):
   - Autentikasi pengguna & proteksi route.
   - CRUD transaksi (pemasukan & pengeluaran).
   - Manajemen pos anggaran & batas belanja (budget limit)
   - Dashboard visualisasi grafik & sisa saldo bulan berjalan.- Filter & pencarian riwayat transaksi.
     Out-of-Scope (Fase Lanjutan):
   - Sinkronisasi mutasi rekening bank otomatis via Open Banking API.
   - Multi-mata uang (multi-currency real-time conversion).
   - OCR struk belanja menggunakan AI/Vision.

4. Fitur Utama & Kebutuhan Fungsional (Functional Requirements)
   4.1. Modul Autentikasi & Akun Pengguna
   - FR-01 (Registrasi & Login): Pengguna dapat mendaftar dan login menggunakan email & kata sandi atau akun Google via Supabase Auth.
   - FR-02 (Sesi & Keamanan): Proteksi halaman internal (dashboard) menggunakan Next.js Middleware. Data di Supabase dibatasi hanya untuk user terkait via RLS (auth.uid() = user_id).FR-03 (Profil): Pengguna dapat mengatur mata uang default(IDR) dan nama profil.
     4.2. Manajemen Kategori & Dompet/Akun (Wallets/Accounts)
   - FR-04 (Akun/Dompet): Pengguna dapat membuat beberapa sumber dana (misal: Rekening Bank, E-Wallet, Tunai).
   - FR-05 (Kategori Transaksi): Pengguna memiliki kategori bawaan (default categories seperti Makanan, Transportasi, Belanja, Gaji, Investasi) dan dapat menambah/mengedit kategori kustom.
     4.3. Pencatatan Transaksi (Income & Expense) - FR-06 (Tambah/Ubah/Hapus Transaksi):
     Input nominal (format mata uang otomatis).
     Tipe transaksi: Pemasukan (Income), Pengeluaran (Expense), atau Transfer Antar Dompet.
     Pemilihan tanggal, kategori, dompet, dan catatan opsional. - FR-07 (Daftar & Filter Transaksi):
     Tabel/daftar transaksi dengan paginasi atau infinite scroll.
     Fitur pencarian berdasarkan catatan/nama kategori.
     Filter berdasarkan rentang tanggal dan kategori.
     4.4. Budgeting / Alokasi Anggaran
     FR-08 (Target Anggaran Bulanan):
     Pengguna dapat menetapkan limit anggaran per kategori untuk bulan berjalan (misal: "Makanan & Minuman: Rp 2.000.000").
     FR-09 (Indikator Budget):
     Progress bar (shadcn/ui Progress) menunjukkan persentase pemakaian anggaran.
     Peringatan visual warna (Kuning: >80%, Merah: >100% / overbudget).
     4.5. Dashboard & Laporan Visual
     FR-10 (Kartu Ringkasan): Menampilkan Total Saldo, Total Pemasukan Bulan Ini, Total Pengeluaran Bulan Ini, dan Tingkat Tabungan (Savings Rate).
     FR-11 (Pie/Donut Chart): Visualisasi breakdown pengeluaran berdasarkan kategori.
     FR-12 (Bar/Line Chart): Tren perbandingan arus kas (Pemasukan vs Pengeluaran) per bulan.

5. Skema Basis Data (Database Schema - Supabase/PostgreSQL)
   -- 1. Profiles
   create table public.profiles (
   id uuid references auth.users on delete cascade primary key,
   full_name text,
   currency text default 'IDR',
   created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

-- 2. Wallets / Accounts
create table public.wallets (
id uuid default gen_random_uuid() primary key,
user_id uuid references auth.users not null,
name text not null, -- misal: BCA, GoPay, Cash
balance numeric(15, 2) default 0 not null,
created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Categories
create table public.categories (
id uuid default gen_random_uuid() primary key,
user_id uuid references auth.users not null,
name text not null,
type text check (type in ('income', 'expense')) not null,
icon text, -- nama icon Lucide
created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Budgets
create table public.budgets (
id uuid default gen_random_uuid() primary key,
user_id uuid references auth.users not null,
category_id uuid references public.categories on delete cascade not null,
month_year date not null, -- misal: '2026-10-01'
allocated_amount numeric(15, 2) not null,
created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Transactions
create table public.transactions (
id uuid default gen_random_uuid() primary key,
user_id uuid references auth.users not null,
wallet_id uuid references public.wallets on delete cascade not null,
category_id uuid references public.categories on delete set null,
type text check (type in ('income', 'expense', 'transfer')) not null,
amount numeric(15, 2) not null,
transaction_date date default current_date not null,
notes text,
created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
(Catatan: Semua tabel di atas wajib menerapkan Supabase RLS Policy dengan aturan: user_id = auth.uid())

6. Desain UI/UX & Komponen shadcn/ui
   Layout:

Sidebar navigasi responsif (Collapsible di layar mobile).

Dark mode / Light mode toggle menggunakan next-themes.

Daftar Komponen shadcn/ui yang Digunakan:

Button, Card, Dialog (Modal tambah transaksi).

Form, Input, Select, Calendar & Popover (Form input transaksi dengan DatePicker).

Table, Badge, Progress (Indikator batas budget).

DropdownMenu, Tabs, Sonner / Toast (Notifikasi feedback transaksi berhasil).

7. Kebutuhan Non-Fungsional (Non-Functional Requirements)
   Performa: Page load pertama < 1.5 detik menggunakan Static Generation & Server Components di Next.js.

Responsivitas: Mobile-first design, nyaman dibuka di smartphone maupun desktop.

Keamanan: Zero-leakage antar user via Supabase RLS; validasi form ketat di sisi server (Zod + Server Actions).

Biaya Operasional: Rp 0 (Memanfaatkan kuota gratis Vercel Hobby + Supabase Free Tier).

8. Milestone Pelaksanaan (Roadmap)
   Sprint 1 (Setup & Auth): Inisialisasi Next.js, shadcn/ui, integrasi Supabase Auth & setup skema database + RLS.

Sprint 2 (Core Transaction): CRUD Dompet, Kategori, dan Form Transaksi dengan validasi Zod.

Sprint 3 (Dashboard & Analytics): Integrasi Recharts, kalkulasi saldo, dan kartu ringkasan.

Sprint 4 (Budgeting & Refinement): Fitur alokasi budget, progress bar peringatan, dark mode, dan deployment ke Vercel.
