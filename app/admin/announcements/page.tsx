"use client";
import { useState } from "react";
import Link from "next/link";

const DEFAULTS = [
  { id: "1", text: "This Sunday worship starts at 7:30 AM. Come with your family. God bless you!", textAm: "ይህ እሑድ አምልኮ ከጠዋቱ 7:30 ይጀምራል። ቤተሰቦን ይዘው ይምጡ። እግዚአብሔር ይባርካቸሁ!", type: "worship", active: true, date: "May 11, 2025" },
  { id: "2", text: "New teaching series: The Power of Prayer starts this Wednesday at 6:30 PM.", textAm: "አዲስ የትምህርት ተከታታይ: የጸሎት ኃይል ይህ ረቡዕ ከምሽቱ 6:30 ይጀምራል።", type: "teaching", active: false, date: "May 8, 2025" },
  { id: "3", text: "Special fasting and prayer: Every Tuesday this month. Join us from 6 AM.", textAm: "ልዩ ጾም እና ጸሎት: ይህ ወር ሁሉ ማክሰኞ። ከጠዋቱ 6 ይቀላቀሉን።", type: "prayer", active: false, date: "May 1, 2025" },
];

type Ann = typeof DEFAULTS[0];

export default function AdminAnnouncements() {
  const [anns, setAnns] = useState<Ann[]>(DEFAULTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ text: "", textAm: "", type: "worship" });

  const addAnn = (e: React.FormEvent) => {
    e.preventDefault();
    const newA: Ann = { ...form, id: Date.now().toString(), active: true, date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) };
    setAnns([newA, ...anns]);
    setForm({ text: "", textAm: "", type: "worship" });
    setShowForm(false);
  };

  const toggleActive = (id: string) => setAnns(anns.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  const deleteAnn = (id: string) => setAnns(anns.filter((a) => a.id !== id));

  const typeColors: Record<string,string> = { worship: "#e8f6fd", teaching: "#f0fff4", prayer: "#fff9e6" };
  const typeBadge: Record<string,string> = { worship: "text-sky", teaching: "text-green-600", prayer: "text-amber-600" };

  return (
    <div className="min-h-screen bg-app-bg pb-8">
      <div className="px-5 pt-10 pb-5" style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
        <Link href="/admin/dashboard" className="text-white/80 text-sm block mb-3">← Dashboard</Link>
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">📣 Announcements</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-white text-sky font-bold text-sm px-4 py-2 rounded-xl">+ Add</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={addAnn} className="mx-4 mt-4 bg-white border border-border rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-navy font-bold text-base">New Announcement</p>
          <div>
            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">Type</p>
            <select className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="worship">Worship</option>
              <option value="teaching">Teaching</option>
              <option value="prayer">Prayer</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">English Text</p>
            <textarea rows={3} className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none resize-none" placeholder="Announcement in English..." value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
          </div>
          <div>
            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">Amharic Text</p>
            <textarea rows={3} className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none resize-none font-ethiopic" placeholder="ማስታወቂያ በአማርኛ..." value={form.textAm} onChange={(e) => setForm({ ...form, textAm: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-sky text-white font-bold py-3 rounded-xl text-sm">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-border text-navy font-bold py-3 rounded-xl text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="px-4 mt-4 flex flex-col gap-3">
        {anns.map((a) => (
          <div key={a.id} className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg capitalize ${typeBadge[a.type]}`} style={{ background: typeColors[a.type] }}>{a.type}</span>
                <span className="text-muted text-xs">{a.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${a.active ? "text-green-600" : "text-muted"}`}>{a.active ? "● Active" : "○ Off"}</span>
              </div>
            </div>
            <p className="text-navy text-sm leading-relaxed mb-1">{a.text}</p>
            {a.textAm && <p className="text-muted text-sm leading-relaxed font-ethiopic">{a.textAm}</p>}
            <div className="flex gap-2 mt-3">
              <button onClick={() => toggleActive(a.id)} className={`flex-1 text-sm font-bold py-2 rounded-xl border transition-all ${a.active ? "border-red-200 text-red-500" : "border-green-200 text-green-600"}`}>
                {a.active ? "Deactivate" : "Activate"}
              </button>
              <button onClick={() => deleteAnn(a.id)} className="px-4 text-red-400 text-xl border border-border rounded-xl">🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
