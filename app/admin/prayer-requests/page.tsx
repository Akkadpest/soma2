"use client";
import { useState } from "react";
import Link from "next/link";

const DEMO_REQUESTS = [
  { id: "1", name: "Selam T.", topic: "Healing for my mother", message: "Please pray for my mother who is sick in hospital in Addis. She needs God's healing touch.", privacy: "public", date: "May 15, 2025", status: "new" },
  { id: "2", name: "Anonymous", topic: "Job opportunity", message: "I have been waiting for a job for 8 months. Please pray for breakthrough.", privacy: "private", date: "May 14, 2025", status: "prayed" },
  { id: "3", name: "Dawit M.", topic: "Family unity", message: "My family is going through a hard time. Please pray for peace and unity in my home.", privacy: "public", date: "May 13, 2025", status: "new" },
  { id: "4", name: "Anonymous", topic: "Financial breakthrough", message: "I need urgent financial help. Please keep me in prayer.", privacy: "private", date: "May 12, 2025", status: "prayed" },
];

export default function AdminPrayerRequests() {
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [filter, setFilter] = useState("all");

  const markPrayed = (id: string) => setRequests(requests.map((r) => r.id === id ? { ...r, status: "prayed" } : r));
  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen bg-app-bg pb-8">
      <div className="px-5 pt-10 pb-5" style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
        <Link href="/admin/dashboard" className="text-white/80 text-sm block mb-3">← Dashboard</Link>
        <h1 className="text-white text-xl font-bold">💌 Prayer Requests</h1>
        <p className="text-white/75 text-sm mt-1">{requests.length} total requests</p>
      </div>

      <div className="flex gap-2 px-4 mt-4 pb-2">
        {["all","new","prayed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-sm font-bold px-4 py-2 rounded-full border capitalize transition-all ${
              filter === f ? "bg-sky border-sky text-white" : "bg-white border-border text-navy"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-4 flex flex-col gap-3 mt-2">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-navy font-bold text-base">{r.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${r.privacy === "private" ? "bg-gray-100 text-gray-600" : "bg-green-50 text-green-600"}`}>
                    {r.privacy}
                  </span>
                </div>
                <p className="text-sky font-semibold text-sm">{r.topic}</p>
                <p className="text-muted text-xs mt-0.5">{r.date}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${r.status === "new" ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`}>
                {r.status === "new" ? "New" : "✓ Prayed"}
              </span>
            </div>
            <p className="text-navy text-sm leading-relaxed border-t border-border pt-2 mt-2">{r.message}</p>
            {r.status === "new" && (
              <button onClick={() => markPrayed(r.id)} className="mt-3 bg-sky text-white text-sm font-bold px-4 py-2 rounded-xl">
                🙏 Mark as Prayed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
