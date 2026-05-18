"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DEMO_VIDEOS } from "../../lib/data";

type Video = typeof DEMO_VIDEOS[0];

export default function AdminVideos() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>(DEMO_VIDEOS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", titleAm: "", category: "sunday", categoryLabel: "Sunday Teaching", duration: "", date: "", teacher: "Minister Bereket Negash", youtubeId: "", thumbnail: "", emoji: "📺", views: "0" });

  const addVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const newVid: Video = { ...form, id: Date.now().toString() };
    setVideos([newVid, ...videos]);
    setShowForm(false);
  };

  const deleteVideo = (id: string) => setVideos(videos.filter((v) => v.id !== id));

  return (
    <div className="min-h-screen bg-app-bg pb-8">
      <div className="px-5 pt-10 pb-5" style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
        <Link href="/admin/dashboard" className="text-white/80 text-sm block mb-3">← Dashboard</Link>
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">📺 Video Teachings</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-white text-sky font-bold text-sm px-4 py-2 rounded-xl">
            + Add
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={addVideo} className="mx-4 mt-4 bg-white border border-border rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-navy font-bold text-base">Add New Video</p>
          {[
            { label: "Title (EN)", key: "title" },
            { label: "Title (Amharic)", key: "titleAm" },
            { label: "YouTube ID", key: "youtubeId", placeholder: "e.g. dQw4w9WgXcQ" },
            { label: "Duration", key: "duration", placeholder: "e.g. 58:24" },
            { label: "Date", key: "date", placeholder: "e.g. May 11, 2025" },
            { label: "Emoji", key: "emoji", placeholder: "🙏" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <p className="text-navy text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
              <input
                className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none"
                placeholder={placeholder || label}
                value={(form as Record<string,string>)[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required={key === "title"}
              />
            </div>
          ))}
          <div>
            <p className="text-navy text-xs font-bold uppercase tracking-wider mb-1">Category</p>
            <select
              className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {[["sunday","Sunday Teaching"],["prayer","Prayer Teaching"],["bible","Bible Study"],["life","Christian Life"],["youth","Youth"],["testimony","Testimony"]].map(([val,label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-1">
            <button type="submit" className="flex-1 bg-sky text-white font-bold py-3 rounded-xl text-sm">Save Video</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-border text-navy font-bold py-3 rounded-xl text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="px-4 mt-4 flex flex-col gap-3">
        {videos.map((v) => (
          <div key={v.id} className="bg-white border border-border rounded-2xl p-4 flex gap-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "#e8f6fd" }}>
              {v.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs bg-light-blue text-sky font-bold px-2 py-0.5 rounded-lg">{v.categoryLabel}</span>
              <p className="text-navy font-bold text-sm mt-1 leading-snug line-clamp-2">{v.title}</p>
              <p className="text-muted text-xs mt-0.5">{v.date} · {v.duration}</p>
            </div>
            <button onClick={() => deleteVideo(v.id)} className="text-red-400 text-xl flex-shrink-0 self-start">🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}
