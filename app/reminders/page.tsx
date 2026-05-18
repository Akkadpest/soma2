"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import BottomNav from "../components/BottomNav";

type Reminder = { id: string; emoji: string; title: string; time: string; days: string; enabled: boolean; };

const DEFAULT: Reminder[] = [
  { id: "1", emoji: "⛪", title: "Sunday Worship", time: "7:30 AM", days: "Every Sunday", enabled: true },
  { id: "2", emoji: "🙏", title: "Morning Prayer", time: "6:00 AM", days: "Daily", enabled: true },
  { id: "3", emoji: "📖", title: "Bible Reading", time: "8:00 PM", days: "Daily", enabled: false },
  { id: "4", emoji: "🍽️", title: "Fasting Reminder", time: "12:00 PM", days: "Every Tuesday", enabled: false },
  { id: "5", emoji: "📅", title: "Church Event", time: "6:00 PM", days: "Every Friday", enabled: true },
  { id: "6", emoji: "🌙", title: "Night Prayer", time: "10:00 PM", days: "Daily", enabled: true },
];

export default function RemindersPage() {
  const { t, isAmh } = useLang();
  const [reminders, setReminders] = useState(DEFAULT);
  const [notifOn, setNotifOn] = useState(false);

  const toggle = (id: string) => setReminders((r) => r.map((rem) => rem.id === id ? { ...rem, enabled: !rem.enabled } : rem));

  const requestNotif = async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") setNotifOn(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
      <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 24px" }}>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", marginBottom: 4 }}>
          🔔 {t.remindersTitle}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "Poppins, sans-serif" }}>Stay committed in your spiritual walk</p>
      </div>

      {/* Enable notifications */}
      <div style={{ margin: "0 16px 16px", background: "rgba(24,174,234,0.1)", border: "1px solid rgba(24,174,234,0.2)", borderRadius: 20, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 28 }}>📳</span>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "Poppins, sans-serif", marginBottom: 2 }}>{t.enableNotif}</p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Poppins, sans-serif" }}>Receive prayer & worship reminders</p>
        </div>
        <button onClick={requestNotif}
          style={{ background: notifOn ? "#4ade80" : "#18AEEA", border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer", flexShrink: 0 }}>
          {notifOn ? "✓ On" : "Enable"}
        </button>
      </div>

      {/* Fixed Sunday */}
      <div style={{ margin: "0 16px 16px", background: "linear-gradient(135deg, #073B5C, #18AEEA)", borderRadius: 20, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 52, height: 52, background: "rgba(255,255,255,0.15)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>⛪</div>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Poppins, sans-serif", marginBottom: 3 }}>Sunday Worship</p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "Poppins, sans-serif", marginBottom: 6 }}>Every Sunday at 7:30 AM</p>
          <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 8, fontFamily: "Poppins, sans-serif" }}>🔔 Always Active</span>
        </div>
      </div>

      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "Poppins, sans-serif", padding: "0 16px 12px" }}>My Reminders</p>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {reminders.map((rem) => (
          <div key={rem.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 46, height: 46, background: "rgba(255,255,255,0.06)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{rem.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "Poppins, sans-serif", marginBottom: 2 }}>{rem.title}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Poppins, sans-serif" }}>⏰ {rem.time} · {rem.days}</p>
            </div>
            <button onClick={() => toggle(rem.id)}
              style={{ position: "relative", width: 48, height: 28, borderRadius: 14, border: "none", background: rem.enabled ? "#18AEEA" : "rgba(255,255,255,0.12)", cursor: "pointer", flexShrink: 0, transition: "all .3s" }}>
              <span style={{ position: "absolute", top: 3, width: 22, height: 22, background: "#fff", borderRadius: "50%", transition: "left .3s", left: rem.enabled ? 22 : 3, display: "block" }} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ margin: "16px 16px 0", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 20, padding: 20, textAlign: "center" }}>
        <p style={{ fontSize: 28, marginBottom: 8 }}>➕</p>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>{t.addReminder}</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "Poppins, sans-serif", marginBottom: 12 }}>Create a personal spiritual goal reminder</p>
        <button style={{ border: "1px solid #18AEEA", color: "#18AEEA", background: "rgba(24,174,234,0.08)", borderRadius: 12, padding: "10px 20px", fontSize: 14, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer" }}>
          + Add Reminder
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
