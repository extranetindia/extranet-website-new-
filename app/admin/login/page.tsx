"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowLeft } from "lucide-react";
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
      <main className="flex min-h-screen items-center justify-center bg-[#F4F7FC] px-4">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#DCE3EC] border-t-[#11418D]" />
          <p className="mt-4 text-sm font-semibold text-[#5C6F89]">Checking session…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7FC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-xl border border-[#DCE3EC] bg-white shadow-[0_24px_60px_rgba(21,54,106,0.16)] lg:grid-cols-2">
          <div className="relative hidden overflow-hidden bg-[#15366A] p-10 text-white lg:block">
            <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
            <div className="relative">
              <Link href="/" className="inline-block rounded-lg bg-white px-3 py-2 transition-opacity hover:opacity-90">
                <Image
                  src="/logo.png"
                  alt="Extranet"
                  width={160}
                  height={40}
                  priority
                  className="h-10 w-auto"
                />
              </Link>
              <p className="tele-eyebrow mt-14 text-white/60">Admin console</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-white">
                Run the entire website from one chair.
              </h1>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {[
                  "Publish plans, prices & OTT bundles",
                  "Track leads the second they arrive",
                  "Manage coverage, banners & policies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                className="mt-10 inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to website
              </Link>
            </div>
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-[#C1170C]" />
          </div>

          <section className="p-6 sm:p-10">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="block h-10 transition-opacity hover:opacity-90">
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

            <p className="tele-eyebrow text-[#C1170C]">Secure sign in</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#15366A]">Welcome back</h2>
            <p className="mt-1 text-sm text-[#5C6F89]">
              Access your dashboard to manage website content.
            </p>

            {error && (
              <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">
                {error}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="admin-email" className="mb-1.5 block text-sm font-bold text-[#33475f]">
                  Email
                </label>
                <div className="flex min-h-[50px] items-center gap-2 rounded-[10px] border border-[#DCE3EC] bg-white pl-3.5 transition-all focus-within:border-[#11418D] focus-within:ring-[3px] focus-within:ring-[#11418D]/15 hover:border-[#11418D]/40">
                  <Mail size={18} className="shrink-0 text-[#8ba0bb]" aria-hidden />
                  <input
                    id="admin-email"
                    type="email"
                    placeholder="admin@extranet.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full border-0 bg-transparent py-3 pr-3 text-sm text-[#15366A] outline-none placeholder:text-[#8ba0bb] disabled:opacity-50"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-1.5 block text-sm font-bold text-[#33475f]">
                  Password
                </label>
                <div className="flex min-h-[50px] items-center gap-2 rounded-[10px] border border-[#DCE3EC] bg-white pl-3.5 transition-all focus-within:border-[#11418D] focus-within:ring-[3px] focus-within:ring-[#11418D]/15 hover:border-[#11418D]/40">
                  <Lock size={18} className="shrink-0 text-[#8ba0bb]" aria-hidden />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full border-0 bg-transparent py-3 text-sm text-[#15366A] outline-none placeholder:text-[#8ba0bb] disabled:opacity-50"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={loading}
                    className="mr-1 rounded-lg p-2 text-[#5C6F89] transition-colors hover:bg-[#F4F7FC] hover:text-[#11418D] disabled:opacity-50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="tele-btn tele-btn-primary min-h-[50px] w-full"
              >
                {loading ? "Signing in…" : "Login to Dashboard"}
              </button>
            </form>

            <p className="mt-6 flex items-center gap-1.5 text-xs text-[#5C6F89]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Protected by enterprise-grade access controls.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
