"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10 lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 p-10 text-white lg:block">
            <div className="flex items-center gap-3">
              <Image
                src="/extranet-logo.png"
                alt="Extranet"
                width={44}
                height={44}
                className="rounded-lg bg-white p-1.5"
              />
              <div>
                <p className="text-lg font-bold tracking-tight">Extranet India</p>
                <p className="text-xs text-blue-200">ISP Admin Console</p>
              </div>
            </div>
            <h1 className="mt-16 text-4xl font-bold leading-tight">
              Enterprise ISP Operations Dashboard
            </h1>
            <p className="mt-4 text-blue-100">
              Manage banners, plans, coverage, testimonials, and support settings
              from one secure control center.
            </p>
          </div>

          <section className="p-6 sm:p-10">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <Image
                  src="/extranet-logo.png"
                  alt="Extranet"
                  width={40}
                  height={40}
                  className="rounded-lg border border-slate-200 p-1"
                />
                <div>
                  <p className="text-lg font-bold text-slate-900">Extranet Admin</p>
                  <p className="text-xs text-slate-500">Secure login</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
            <p className="mt-1 text-sm text-slate-500">
              Access your dashboard to manage website content.
            </p>

            <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </span>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    placeholder="admin@extranet.in"
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-900 outline-none"
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
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-900 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-slate-500 transition hover:text-slate-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  className="text-sm font-medium text-blue-700 transition hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Login to Dashboard
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
