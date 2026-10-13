"use client";

import { useState } from "react";
import Link from "next/link";
import { Wallet, Loader2, ArrowRight } from "lucide-react";
import { signup } from "@/app/auth/actions";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Wallet className="w-6 h-6 text-slate-950 font-bold" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Daftar Akun Aloka
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
            Masuk di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="misal: Budi Pratama"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="Minimal 6 karakter"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mendaftarkan...
                </>
              ) : (
                <>
                  Buat Akun Sekarang
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
