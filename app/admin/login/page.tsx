"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useAuthUser } from "@/lib/hooks/useAuthUser";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, error } = useAuth();
  const { user, loading: authLoading } = useAuthUser();
  const router = useRouter();

  // Redirect to /admin if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    await signIn(email, password);
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-text-[#134799] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-700" />
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-text-[#134799] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10 lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 p-10 text-white lg:block">
            <Link href="/" className="relative inline-block rounded-lg bg-white px-3 py-2">
              <Image
                src="/logo.png"
                alt="Extranet"
                width={160}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </Link>
            <h1 className="mt-16 text-4xl font-bold leading-tight">
              Enterprise ISP Operations Dashboard
            </h1>
            <p className="mt-4 text-white/80">
              Manage banners, plans, coverage, testimonials, and support settings
              from one secure control center.
            </p>
          </div>

          <section className="p-6 sm:p-10">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="relative block h-10 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Extranet"
                  width={160}
                  height={40}
                  priority
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
            <p className="mt-1 text-sm text-slate-500">
              Access your dashboard to manage website content.
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </span>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    placeholder="admin@extranet.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-900 outline-none disabled:opacity-50"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </span>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                  <Lock size={18} className="text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-900 outline-none disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={loading}
                    className="text-slate-500 transition hover:text-slate-700 disabled:opacity-50"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full rounded-xl bg-[#134799] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#134799] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Login to Dashboard"}
              </button>
            </form>

            <p className="mt-6 text-xs text-slate-400">
              Protected by enterprise-grade access controls.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
