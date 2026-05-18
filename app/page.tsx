"use client";
import { useLang } from "./context/LangContext";
import { DAILY_VERSE } from "./lib/data";
import BottomNav from "./components/BottomNav";
import Link from "next/link";

function getGreeting(t: ReturnType<typeof useLang>["t"]) {
  const h = new Date().getHours();
  if (h < 12) return t.goodMorning;
  if (h < 18) return t.goodAfternoon;
  return t.goodEvening;
}

function getTimeIcon() {
  const h = new Date().getHours();
  if (h < 12) return "🌅";
  if (h < 18) return "☀️";
  return "🌙";
}

const quickActions = [
  { href: "/teachings", emoji: "📺", label: "Teachings" },
  { href: "/prayer", emoji: "🙏", label: "Prayer" },
  { href: "/notes", emoji: "📝", label: "Notes" },
  { href: "/donate", emoji: "❤️", label: "Give" },
  { href: "/library", emoji: "📚", label: "Library" },
  { href: "/reminders", emoji: "🔔", label: "Reminders" },
];

export default function HomePage() {
  const { t, toggleLang, isAmh } = useLang();

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", display: "flex", flexDirection: "column" }}>

      {/* TOP BAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 0", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
            {getTimeIcon()}
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
            ⛪
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={toggleLang} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 20, padding: "6px 14px", color: "#fff", fontSize: 12, fontFamily: "Poppins, sans-serif", fontWeight: 700, backdropFilter: "blur(8px)", cursor: "pointer", letterSpacing: 0.5 }}>
            {isAmh ? "አማ | EN" : "EN | አማ"}
          </button>
        </div>
      </div>

      {/* HERO — full screen verse */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px 0", textAlign: "center", position: "relative" }}>
        {/* Glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(24,174,234,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: "Poppins, sans-serif" }}>
          {getGreeting(t)}, Beloved
        </p>

        <p style={{ color: "#fff", fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 20, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", maxWidth: 320 }}>
          {isAmh ? DAILY_VERSE.textAm : DAILY_VERSE.text}
        </p>

        <p style={{ color: "#18AEEA", fontSize: 15, fontWeight: 700, letterSpacing: 1, fontFamily: "Poppins, sans-serif" }}>
          {DAILY_VERSE.ref}
        </p>

        {/* Announce pill */}
        <div style={{ marginTop: 28, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 30, padding: "9px 18px", backdropFilter: "blur(8px)" }}>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "Poppins, sans-serif", fontWeight: 500, margin: 0 }}>
            📣 Sunday Worship · Every Sunday at 7:30 AM
          </p>
        </div>
      </div>

      {/* BOTTOM SHEET */}
      <div style={{ background: "rgba(8,20,40,0.96)", borderRadius: "28px 28px 0 0", border: "1px solid rgba(255,255,255,0.08)", padding: "24px 20px 8px", marginTop: 32 }}>

        {/* Main CTA */}
        <Link href="/prayer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#18AEEA", borderRadius: 18, padding: "18px 22px", textDecoration: "none", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>▶</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Poppins, sans-serif" }}>
              {isAmh ? "ዕለታዊ ምልጃ ጀምር" : "Begin Daily Devotion"}
            </span>
          </div>
          <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 16 }}>↗</span>
          </div>
        </Link>

        {/* Quick actions row */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          {quickActions.map((a) => (
            <Link key={a.href} href={a.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textDecoration: "none", flex: 1 }}>
              <div style={{ width: 46, height: 46, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {a.emoji}
              </div>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 9.5, fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: 0.3 }}>
                {a.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Devotion suggestion card */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 16px", marginTop: 14, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)" }} />
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#18AEEA", fontSize: 11, fontWeight: 700, fontFamily: "Poppins, sans-serif", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>
              📖 Today&apos;s Reading
            </p>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Poppins, sans-serif", marginBottom: 2 }}>
              Meditate on {DAILY_VERSE.ref}
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Poppins, sans-serif" }}>⏱ 5 mins</p>
          </div>
          <span style={{ color: "#18AEEA", fontSize: 20 }}>›</span>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
