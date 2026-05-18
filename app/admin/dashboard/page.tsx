"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DEMO_VIDEOS, DEMO_BOOKS, DEMO_NOTES } from "../../lib/data";

const menuItems = [
  { href: "/admin/announcements", emoji: "📣", label: "Announcements", count: 3, color: "#e8f6fd" },
  { href: "/admin/videos", emoji: "📺", label: "Video Teachings", count: DEMO_VIDEOS.length, color: "#f0fff4" },
  { href: "/admin/prayers", emoji: "🙏", label: "Prayer Content", count: 8, color: "#fff9e6" },
  { href: "/admin/books", emoji: "📚", label: "Books & PDFs", count: DEMO_BOOKS.length, color: "#f3f0ff" },
  { href: "/admin/prayer-requests", emoji: "💌", label: "Prayer Requests", count: 12, color: "#fff0f3" },
  { href: "/admin/donations", emoji: "❤️", label: "Donations", count: 28, color: "#f0fff4" },
];

const stats = [
  { label: "Total Members", value: "247", emoji: "👥" },
  { label: "Video Views", value: "5.8K", emoji: "📺" },
  { label: "Prayer Requests", value: "89", emoji: "🙏" },
  { label: "Donations (AED)", value: "12,450", emoji: "❤️" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const ok = localStorage.getItem("soma_admin");
      if (!ok) router.push("/admin");
    }
  }, [router]);

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("soma_admin");
    router.push("/admin");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-app-bg pb-8">
      {/* Header */}
      <div className="px-5 pt-10 pb-6 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
        <div>
          <p className="text-white/70 text-sm">Soma Christos Church</p>
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <button onClick={logout} className="bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-xl">
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-2xl p-4">
            <p className="text-2xl mb-1">{s.emoji}</p>
            <p className="text-navy font-bold text-2xl">{s.value}</p>
            <p className="text-muted text-xs font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent announcement preview */}
      <div className="mx-4 mt-4 bg-white border border-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-navy font-bold text-base">Current Announcement</p>
          <Link href="/admin/announcements" className="text-sky text-sm font-semibold">Edit</Link>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-xl">
          <p className="text-navy text-sm leading-relaxed">
            📣 This Sunday worship starts at 7:30 AM. Come with your family. God bless you!
          </p>
        </div>
      </div>

      {/* Menu grid */}
      <h2 className="text-navy font-bold text-sm uppercase tracking-wider mx-4 mt-5 mb-3">Manage Content</h2>
      <div className="mx-4 grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-hover bg-white border border-border rounded-2xl p-4 flex flex-col gap-2"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: item.color }}>
              {item.emoji}
            </div>
            <p className="text-navy font-bold text-sm leading-tight">{item.label}</p>
            <div className="flex items-center justify-between">
              <span className="bg-light-blue text-sky text-xs font-bold px-2 py-0.5 rounded-lg">{item.count} items</span>
              <span className="text-muted text-xs">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mx-4 mt-4 bg-navy rounded-2xl p-4">
        <p className="text-white font-bold text-base mb-3">Quick Actions</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Add Daily Bible Verse", emoji: "📖" },
            { label: "Upload New Teaching Video", emoji: "📺" },
            { label: "Send Push Notification", emoji: "🔔" },
          ].map((a) => (
            <button key={a.label} className="flex items-center gap-3 bg-white/10 text-white text-sm font-medium px-4 py-3 rounded-xl text-left w-full">
              <span className="text-xl">{a.emoji}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-4">
        <Link href="/" className="block text-center border border-border bg-white text-navy font-semibold text-sm py-3 rounded-xl">
          ← Back to App
        </Link>
      </div>
    </div>
  );
}
