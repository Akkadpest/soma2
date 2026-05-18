"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { DEMO_VIDEOS } from "../lib/data";
import BottomNav from "../components/BottomNav";

const CATS = [
  { key: "all", labelEn: "All" },
  { key: "sunday", labelEn: "Sunday" },
  { key: "prayer", labelEn: "Prayer" },
  { key: "bible", labelEn: "Bible Study" },
  { key: "life", labelEn: "Christian Life" },
  { key: "youth", labelEn: "Youth" },
  { key: "testimony", labelEn: "Testimony" },
];

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #073B5C 0%, #18AEEA 100%)",
  "linear-gradient(135deg, #0a3d62 0%, #1e90ff 100%)",
  "linear-gradient(135deg, #05445e 0%, #189AB4 100%)",
  "linear-gradient(135deg, #0b2545 0%, #1482c8 100%)",
];

export default function TeachingsPage() {
  const { isAmh } = useLang();
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [favs, setFavs] = useState<string[]>([]);

  const filtered = DEMO_VIDEOS.filter((v) => {
    const matchCat = cat === "all" || v.category === cat;
    const title = isAmh ? v.titleAm : v.title;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFav = (id: string) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ padding: "52px 20px 20px", background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>
          Minister Bereket Negash
        </p>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "Poppins, sans-serif", margin: 0 }}>
          Video Teachings
        </h1>
      </div>

      {/* Search */}
      <div style={{ margin: "0 16px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>🔍</span>
        <input
          type="text"
          placeholder="Search teachings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 14, fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
        />
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 8, padding: "0 16px 16px", overflowX: "auto", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {CATS.map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)}
            style={{
              flexShrink: 0, padding: "8px 16px", borderRadius: 30, border: "none", cursor: "pointer",
              fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 600,
              background: cat === c.key ? "#18AEEA" : "rgba(255,255,255,0.08)",
              color: cat === c.key ? "#fff" : "rgba(255,255,255,0.55)",
              transition: "all .2s"
            }}>
            {c.labelEn}
          </button>
        ))}
      </div>

      {/* Video cards */}
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map((v, i) => (
          <div key={v.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>

            {/* Thumbnail */}
            <div style={{
              height: 180,
              background: CARD_GRADIENTS[i % CARD_GRADIENTS.length],
              position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {/* Big emoji */}
              <span style={{ position: "absolute", top: 16, left: 16, fontSize: 40, lineHeight: 1 }}>{v.emoji}</span>

              {/* Play button */}
              <div style={{
                width: 56, height: 56,
                background: "rgba(255,255,255,0.9)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
              }}>
                <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "10px 0 10px 20px", borderColor: "transparent transparent transparent #073B5C", marginLeft: 4 }} />
              </div>

              {/* Duration badge */}
              <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, fontFamily: "Poppins, sans-serif" }}>
                {v.duration}
              </div>

              {/* Fav button */}
              <button onClick={() => toggleFav(v.id)}
                style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: 34, height: 34, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {favs.includes(v.id) ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Info */}
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "inline-block", background: "rgba(24,174,234,0.15)", color: "#18AEEA", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "Poppins, sans-serif" }}>
                {v.categoryLabel}
              </div>
              <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginBottom: 6, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif" }}>
                {isAmh ? v.titleAm : v.title}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Poppins, sans-serif" }}>
                {v.teacher} · {v.date} · 👁 {v.views}
              </p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.3)" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>📺</p>
            <p style={{ fontSize: 16, fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>No teachings found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
