"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

const offices = [
  {
    city: "Greater Noida",
    address: "Extranet Infotech India Pvt. Ltd., LGF - 5, Kasna, Greater Noida, Uttar Pradesh — 201310",
  },
  // {
  //   city: "Mumbai (NOC)",
  //   address: "Network Operations Center, Andheri East, Mumbai — 400069",
  // },
];

export default function ContactContent() {
  return (
    <div className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Send us a message</h2>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="+91"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Inquiry type
              </label>
              <select className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
                <option>New connection — Home</option>
                <option>New connection — Business</option>
                <option>Enterprise / Leased line</option>
                <option>General inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <button
              type="submit"
              className="w-full min-h-[44px] rounded-xl bg-blue-700 px-8 py-3.5 font-bold text-white transition-colors hover:bg-blue-800 sm:w-auto"
            >
              Submit inquiry
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {[
          { icon: Phone, label: "Phone", value: "+91 9540901195" },
          { icon: Mail, label: "Email", value: "help.extranet@gmail.com" },
          { icon: Clock, label: "Hours", value: "24/7 Availability" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="font-semibold text-slate-900">{item.value}</div>
            </div>
          </div>
        ))}

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <MapPin className="w-5 h-5 text-blue-700 mb-3" />
          <h3 className="font-bold text-slate-900 mb-3">Office locations</h3>
          <ul className="space-y-3">
            {offices.map((o) => (
              <li key={o.city}>
                <div className="text-sm font-semibold text-slate-900">{o.city}</div>
                <div className="text-sm text-slate-600">{o.address}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Ready to connect?</h3>
          <p className="text-blue-100 text-sm mb-4">
            Browse plans or check coverage before you reach out.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/plans"
              className="text-center py-2.5 rounded-lg bg-white text-blue-800 font-semibold text-sm hover:bg-blue-50"
            >
              View plans
            </Link>
            <Link
              href="/coverage"
              className="text-center py-2.5 rounded-lg border border-white/30 font-semibold text-sm hover:bg-white/10"
            >
              Check coverage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
