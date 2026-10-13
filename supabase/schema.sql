-- ==========================================
-- ALOKA DATABASE SCHEMA
-- ==========================================

-- 1. Profiles Table
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    currency text default 'IDR' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Wallets Table
create table if not exists public.wallets (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null, -- misal: BCA, GoPay, Tunai
    balance numeric(15, 2) default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Categories Table
create table if not exists public.categories (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null,
    type text check (type in ('income', 'expense')) not null,
    icon text, -- Nama icon Lucide (misal: Utensils, Briefcase, Car)
    color text default '#64748b', -- Hex color untuk grafik/badge
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Budgets Table
create table if not exists public.budgets (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    category_id uuid references public.categories on delete cascade not null,
    month_year date not null, -- Format tanggal awal bulan: '2026-10-01'
    allocated_amount numeric(15, 2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, category_id, month_year)
);

-- 5. Transactions Table
create table if not exists public.transactions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    wallet_id uuid references public.wallets on delete cascade not null,
    to_wallet_id uuid references public.wallets on delete set null, -- Dompet tujuan (khusus transfer)
    category_id uuid references public.categories on delete set null,
    type text check (type in ('income', 'expense', 'transfer')) not null,
    amount numeric(15, 2) not null,
    transaction_date date default current_date not null,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================
create index if not exists idx_wallets_user_id on public.wallets(user_id);
create index if not exists idx_categories_user_id on public.categories(user_id);
create index if not exists idx_budgets_user_date on public.budgets(user_id, month_year);
create index if not exists idx_transactions_user_date on public.transactions(user_id, transaction_date);
create index if not exists idx_transactions_wallet on public.transactions(wallet_id);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.categories enable row level security;
alter table public.budgets enable row level security;
alter table public.transactions enable row level security;

-- Profiles Policies
create policy "Users can view own profile" on public.profiles
    for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
    for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
    for insert with check (auth.uid() = id);

-- Wallets Policies
create policy "Users can manage own wallets" on public.wallets
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Categories Policies
create policy "Users can manage own categories" on public.categories
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Budgets Policies
create policy "Users can manage own budgets" on public.budgets
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Transactions Policies
create policy "Users can manage own transactions" on public.transactions
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ==========================================
-- TRIGGER: ONBOARDING DATA UNTUK USER BARU
-- ==========================================
create or replace function public.handle_new_user()
returns trigger as $$
declare
    new_user_id uuid := new.id;
    user_name text := coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));
begin
    -- 1. Insert Profile
    insert into public.profiles (id, full_name, currency)
    values (new_user_id, user_name, 'IDR');

    -- 2. Insert Default Wallet
    insert into public.wallets (user_id, name, balance)
    values (new_user_id, 'Dompet Utama', 0);

    -- 3. Insert Default Categories (Expense)
    insert into public.categories (user_id, name, type, icon, color) values
        (new_user_id, 'Makanan & Minuman', 'expense', 'Utensils', '#f59e0b'),
        (new_user_id, 'Transportasi', 'expense', 'Car', '#3b82f6'),
        (new_user_id, 'Belanja', 'expense', 'ShoppingBag', '#ec4899'),
        (new_user_id, 'Tagihan & Utilitas', 'expense', 'Receipt', '#ef4444'),
        (new_user_id, 'Hiburan', 'expense', 'Film', '#8b5cf6'),
        (new_user_id, 'Kesehatan', 'expense', 'HeartPulse', '#10b981'),
        (new_user_id, 'Lain-lain', 'expense', 'MoreHorizontal', '#64748b');

    -- 4. Insert Default Categories (Income)
    insert into public.categories (user_id, name, type, icon, color) values
        (new_user_id, 'Gaji', 'income', 'Briefcase', '#10b981'),
        (new_user_id, 'Freelance / Bisnis', 'income', 'Laptop', '#06b6d4'),
        (new_user_id, 'Investasi', 'income', 'TrendingUp', '#8b5cf6'),
        (new_user_id, 'Bonus & Hadiah', 'income', 'Gift', '#f59e0b'),
        (new_user_id, 'Pemasukan Lainnya', 'income', 'PlusCircle', '#64748b');

    return new;
end;
$$ language plpgsql security definer;

-- Trigger hook on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
