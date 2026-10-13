import Link from "next/link";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  TrendingUp, 
  PieChart, 
  LogOut,
  SlidersHorizontal,
  CreditCard
} from "lucide-react";
import { signOut } from "@/app/auth/actions";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  // Mock initial dashboard view when Supabase DB credentials are not yet populated
  const totalBalance = 7500000;
  const incomeThisMonth = 12000000;
  const expenseThisMonth = 4500000;
  const savingsRate = Math.round(((incomeThisMonth - expenseThisMonth) / incomeThisMonth) * 100);

  const wallets = [
    { id: "1", name: "BCA Utama", balance: 5200000, type: "Bank" },
    { id: "2", name: "GoPay", balance: 800000, type: "E-Wallet" },
    { id: "3", name: "Uang Tunai", balance: 1500000, type: "Cash" },
  ];

  const recentTransactions = [
    { id: "t1", title: "Makan Siang & Kopi", category: "Makanan & Minuman", amount: 65000, type: "expense", date: "Hari ini" },
    { id: "t2", title: "Gaji Bulanan", category: "Gaji", amount: 12000000, type: "income", date: "Kemarin" },
    { id: "t3", title: "Bensin Motor", category: "Transportasi", amount: 50000, type: "expense", date: "11 Okt 2026" },
    { id: "t4", title: "Langganan Internet", category: "Tagihan & Utilitas", amount: 350000, type: "expense", date: "10 Okt 2026" },
  ];

  const budgets = [
    { category: "Makanan & Minuman", spent: 1450000, limit: 2000000, percentage: 72 },
    { category: "Transportasi", spent: 450000, limit: 500000, percentage: 90 },
    { category: "Belanja & Hiburan", spent: 1200000, limit: 1000000, percentage: 120 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Wallet className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
                Aloka
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Header Greeting & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Ringkasan Finansial</h1>
            <p className="text-sm text-slate-400">Periode Oktober 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all">
              <PlusCircle className="w-4 h-4" />
              Catat Transaksi
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-xs font-medium text-slate-400">Total Saldo Aktif</p>
            <p className="text-2xl font-bold text-white mt-1.5">{formatCurrency(totalBalance)}</p>
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Di 3 dompet tersimpan
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-xs font-medium text-slate-400">Pemasukan Bulan Ini</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1.5">{formatCurrency(incomeThisMonth)}</p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" /> Masuk ke kas
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-xs font-medium text-slate-400">Pengeluaran Bulan Ini</p>
            <p className="text-2xl font-bold text-rose-400 mt-1.5">{formatCurrency(expenseThisMonth)}</p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" /> Keluar dari pos belanja
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-xs font-medium text-slate-400">Savings Rate (Tingkat Tabungan)</p>
            <p className="text-2xl font-bold text-teal-400 mt-1.5">{savingsRate}%</p>
            <p className="text-xs text-emerald-400 mt-2">
              Kondisi finansial sangat sehat
            </p>
          </div>
        </div>

        {/* 2-Columns: Wallets & Budget limits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallets */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Dompet & Akun
              </h2>
              <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
                + Tambah
              </button>
            </div>
            <div className="space-y-3">
              {wallets.map((w) => (
                <div key={w.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{w.name}</p>
                    <p className="text-xs text-slate-400">{w.type}</p>
                  </div>
                  <p className="text-sm font-bold text-emerald-400">{formatCurrency(w.balance)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Limits & Progress */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-teal-400" />
                Target Anggaran (Budget Limits)
              </h2>
              <span className="text-xs text-slate-400">Oktober 2026</span>
            </div>
            <div className="space-y-4">
              {budgets.map((b, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{b.category}</span>
                    <span className="text-slate-400">
                      <strong className={b.percentage > 100 ? "text-rose-400" : "text-white"}>
                        {formatCurrency(b.spent)}
                      </strong>{" "}
                      / {formatCurrency(b.limit)} ({b.percentage}%)
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        b.percentage > 100
                          ? "bg-rose-500"
                          : b.percentage > 80
                          ? "bg-amber-400"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(b.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Transaksi Terakhir</h2>
            <Link href="/transactions" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
              Lihat Semua
            </Link>
          </div>
          <div className="divide-y divide-slate-800/60">
            {recentTransactions.map((t) => (
              <div key={t.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.title}</p>
                    <p className="text-xs text-slate-400">{t.category} • {t.date}</p>
                  </div>
                </div>
                <p className={`text-sm font-bold ${
                  t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
