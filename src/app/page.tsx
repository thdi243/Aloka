import Link from "next/link";
import { 
  ArrowRight, 
  Wallet, 
  PieChart, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Database,
  ArrowUpRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="relative border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Wallet className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
                Aloka
              </span>
              <span className="text-[10px] ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                FlowBudget
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/25 flex items-center gap-1.5 hover:gap-2"
            >
              Mulai Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Manajemen Anggaran Pribadi Cerdas & Ringan</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Kendalikan Arus Kas, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Capai Target Tabungan Anda
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Catat pemasukan & pengeluaran harian, pantau limit anggaran per pos belanja, dan visualisasikan arus keuangan tanpa repot.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2 text-base"
            >
              Mulai Sekarang Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium transition-all text-base flex items-center gap-2"
            >
              Lihat Demo Dashboard
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400 group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multi Dompet & Sumber Dana</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Kelola rekening bank, dompet digital (GoPay, OVO), hingga uang tunai dalam satu dashboard yang terorganisir.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-teal-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 text-teal-400 group-hover:scale-110 transition-transform">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Batas Anggaran & Peringatan</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tentukan batas belanja per kategori setiap bulan dengan progress bar cerdas dan peringatan visual anti overbudget.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-cyan-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 text-cyan-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Aman dengan Isolasi RLS</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Isolasi data pribadi dengan Row Level Security tingkat database PostgreSQL. Hanya Anda yang memiliki akses ke data Anda.
            </p>
          </div>
        </div>

        {/* Quick Stats / Value Prop Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Mulai rapikan keuangan Anda hari ini</h3>
            <p className="text-sm text-slate-400">Tidak ada biaya tersembunyi, 100% kontrol atas data dan anggaran pribadi Anda.</p>
          </div>
          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shrink-0 transition-all shadow-md shadow-emerald-500/20"
          >
            Buka Akun Sekarang
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Aloka (FlowBudget). Dibangun dengan Next.js 16, Tailwind CSS & Supabase.</p>
      </footer>
    </div>
  );
}
