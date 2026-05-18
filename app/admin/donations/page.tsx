"use client";
import Link from "next/link";

const DONATIONS = [
  { id: "1", name: "Biruk A.", amount: 500, currency: "AED", purpose: "Ministry Support", method: "Bank Transfer", date: "May 15, 2025", type: "One-Time" },
  { id: "2", name: "Anonymous", amount: 100, currency: "AED", purpose: "Media Ministry", method: "Stripe", date: "May 14, 2025", type: "Monthly" },
  { id: "3", name: "Tigist M.", amount: 250, currency: "AED", purpose: "Church Support", method: "Bank Transfer", date: "May 13, 2025", type: "One-Time" },
  { id: "4", name: "Yonas K.", amount: 1000, currency: "AED", purpose: "Special Offering", method: "PayPal", date: "May 12, 2025", type: "One-Time" },
  { id: "5", name: "Meron S.", amount: 100, currency: "AED", purpose: "Ministry Support", method: "Stripe", date: "May 11, 2025", type: "Monthly" },
];

const total = DONATIONS.reduce((s, d) => s + d.amount, 0);

export default function AdminDonations() {
  return (
    <div className="min-h-screen bg-app-bg pb-8">
      <div className="px-5 pt-10 pb-5" style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
        <Link href="/admin/dashboard" className="text-white/80 text-sm block mb-3">← Dashboard</Link>
        <h1 className="text-white text-xl font-bold">❤️ Donation Records</h1>
        <p className="text-white/75 text-sm mt-1">{DONATIONS.length} donations this month</p>
      </div>

      {/* Summary */}
      <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Total (AED)", value: total.toLocaleString() },
          { label: "Monthly", value: DONATIONS.filter(d=>d.type==="Monthly").length },
          { label: "One-Time", value: DONATIONS.filter(d=>d.type==="One-Time").length },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-2xl p-3 text-center">
            <p className="text-navy font-bold text-lg">{s.value}</p>
            <p className="text-muted text-xs mt-0.5 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 mt-4 flex flex-col gap-3">
        {DONATIONS.map((d) => (
          <div key={d.id} className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-navy font-bold text-base">{d.name}</p>
                <p className="text-muted text-xs">{d.date} · {d.method}</p>
              </div>
              <div className="text-right">
                <p className="text-navy font-bold text-lg">{d.amount} <span className="text-sm">{d.currency}</span></p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${d.type === "Monthly" ? "bg-purple-50 text-purple-600" : "bg-light-blue text-sky"}`}>
                  {d.type}
                </span>
              </div>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
              <p className="text-sky text-xs font-semibold">{d.purpose}</p>
              <button className="text-navy text-xs font-bold border border-border px-3 py-1 rounded-lg">Receipt</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-amber-800 font-bold text-sm">⚠️ Legal Compliance Note</p>
        <p className="text-amber-700 text-xs mt-1 leading-relaxed">
          All donations must comply with UAE charity and financial regulations. Consult a licensed advisor before enabling public donations. Stripe/PayPal integration requires merchant account verification.
        </p>
      </div>
    </div>
  );
}
