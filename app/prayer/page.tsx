"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { DEMO_PRAYERS } from "../lib/data";
import BottomNav from "../components/BottomNav";

export default function PrayerPage() {
  const { t, isAmh } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", topic: "", message: "", privacy: "private" });
  const [submitted, setSubmitted] = useState(false);

  const prayer = selected ? DEMO_PRAYERS.find((p) => p.id === selected) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", phone: "", topic: "", message: "", privacy: "private" });
  };

  if (prayer) {
    return (
      <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
        <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 24px" }}>
          <button onClick={() => setSelected(null)} style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Poppins, sans-serif", background: "none", border: "none", cursor: "pointer", marginBottom: 14, fontWeight: 600 }}>
            ← Back
          </button>
          <p style={{ fontSize: 44, marginBottom: 10 }}>{prayer.emoji}</p>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", margin: 0 }}>
            {isAmh ? prayer.titleAm : prayer.title}
          </h1>
        </div>
        <div style={{ margin: "16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 20 }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "Poppins, sans-serif", marginBottom: 12 }}>Written Prayer</p>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.75, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", fontWeight: 400 }}>
            {isAmh ? prayer.textAm : prayer.text}
          </p>
        </div>
        <div style={{ margin: "0 16px", background: "rgba(24,174,234,0.1)", border: "1px solid rgba(24,174,234,0.2)", borderRadius: 20, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <button style={{ width: 50, height: 50, background: "#18AEEA", borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>▶</button>
          <div>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "Poppins, sans-serif", marginBottom: 2 }}>Audio Prayer</p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Poppins, sans-serif" }}>Tap to play</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
      <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", marginBottom: 6 }}>
          🙏 {t.prayerCenter}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>
          {t.prayerVerse}
        </p>
      </div>

      {/* Prayer type grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px 8px" }}>
        {DEMO_PRAYERS.map((p) => (
          <button key={p.id} onClick={() => setSelected(p.id)}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 16, textAlign: "left", cursor: "pointer", transition: "all .2s" }}>
            <p style={{ fontSize: 30, marginBottom: 8 }}>{p.emoji}</p>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", marginBottom: 4, lineHeight: 1.3 }}>
              {isAmh ? p.titleAm : p.title}
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "Poppins, sans-serif" }}>
              {isAmh ? p.subAm : p.sub}
            </p>
          </button>
        ))}
      </div>

      {/* Prayer Request Form */}
      <div style={{ padding: "20px 16px 0" }}>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "Poppins, sans-serif", marginBottom: 12 }}>
          {t.submitRequest}
        </p>

        {submitted && (
          <div style={{ background: "rgba(24,234,100,0.1)", border: "1px solid rgba(24,200,80,0.2)", borderRadius: 14, padding: 14, marginBottom: 12, textAlign: "center" }}>
            <p style={{ color: "#4ade80", fontSize: 14, fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>🙏 Prayer request submitted!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {[
            { ph: t.yourName, key: "name" },
            { ph: t.phone, key: "phone" },
            { ph: t.prayerTopic, key: "topic" },
          ].map(({ ph, key }) => (
            <input key={key}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", outline: "none", width: "100%", boxSizing: "border-box" }}
              placeholder={ph}
              value={(form as Record<string,string>)[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
          <textarea
            rows={4}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", outline: "none", resize: "none", width: "100%", boxSizing: "border-box" }}
            placeholder={t.prayerMessage}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div style={{ display: "flex", gap: 20 }}>
            {["private","public"].map((opt) => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="radio" name="privacy" value={opt} checked={form.privacy === opt} onChange={(e) => setForm({ ...form, privacy: e.target.value })} style={{ accentColor: "#18AEEA" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
                  {opt === "private" ? t.private : t.public}
                </span>
              </label>
            ))}
          </div>
          <button type="submit"
            style={{ background: "#18AEEA", border: "none", borderRadius: 14, padding: "16px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", cursor: "pointer", width: "100%" }}>
            {t.submitBtn}
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}
