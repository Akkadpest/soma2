"use client";
import { useState } from "react";
import Link from "next/link";
import { DEMO_PRAYERS } from "../../lib/data";

type Prayer = typeof DEMO_PRAYERS[0];

export default function AdminPrayers() {
  const [prayers, setPrayers] = useState<Prayer[]>(DEMO_PRAYERS);
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editTextAm, setEditTextAm] = useState("");

  const startEdit = (p: Prayer) => {
    setEditing(p.id);
    setEditText(p.text);
    setEditTextAm(p.textAm);
  };

  const saveEdit = (id: string) => {
    setPrayers(prayers.map((p) => p.id === id ? { ...p, text: editText, textAm: editTextAm } : p));
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-app-bg pb-8">
      <div className="px-5 pt-10 pb-5" style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
        <Link href="/admin/dashboard" className="text-white/80 text-sm block mb-3">← Dashboard</Link>
        <h1 className="text-white text-xl font-bold">🙏 Prayer Content</h1>
        <p className="text-white/75 text-sm mt-1">Manage all prayer texts and audio</p>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-3">
        {prayers.map((p) => (
          <div key={p.id} className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: p.bg }}>
                {p.emoji}
              </div>
              <div>
                <p className="text-navy font-bold text-base">{p.title}</p>
                <p className="text-muted text-xs font-ethiopic">{p.titleAm}</p>
              </div>
            </div>

            {editing === p.id ? (
              <div className="flex flex-col gap-2">
                <textarea rows={4} className="w-full bg-app-bg border border-border rounded-xl px-3 py-2 text-sm text-navy outline-none resize-none" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <textarea rows={4} className="w-full bg-app-bg border border-border rounded-xl px-3 py-2 text-sm text-navy outline-none resize-none font-ethiopic" value={editTextAm} onChange={(e) => setEditTextAm(e.target.value)} />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(p.id)} className="flex-1 bg-sky text-white font-bold py-2 rounded-xl text-sm">Save</button>
                  <button onClick={() => setEditing(null)} className="flex-1 border border-border text-navy font-bold py-2 rounded-xl text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-navy text-sm leading-relaxed mb-2 line-clamp-3">{p.text}</p>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="flex-1 border border-sky text-sky font-bold py-2 rounded-xl text-sm">✏️ Edit</button>
                  <button className="flex-1 border border-border text-navy font-bold py-2 rounded-xl text-sm">🎵 Audio</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
