"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { DEMO_BOOKS } from "../lib/data";
import BottomNav from "../components/BottomNav";

const CATS = ["All","Bible Study","Prayer","Faith","Discipleship","Christian Life","Amharic Resources"];

export default function LibraryPage() {
  const { t, isAmh } = useLang();
  const [cat, setCat] = useState("All");
  const filtered = DEMO_BOOKS.filter((b) => cat === "All" || b.category === cat);

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
      <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 20px" }}>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>{t.booksLibrary}</h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "Poppins, sans-serif" }}>{t.resourcesPDF}</p>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "0 16px 16px", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            style={{ flexShrink: 0, padding: "8px 16px", borderRadius: 30, border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 600, background: cat === c ? "#18AEEA" : "rgba(255,255,255,0.08)", color: cat === c ? "#fff" : "rgba(255,255,255,0.55)", transition: "all .2s" }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((book) => (
          <div key={book.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 16, display: "flex", gap: 14 }}>
            <div style={{ width: 64, height: 84, borderRadius: 12, background: book.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
              {book.cover}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: "#18AEEA", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>
                {isAmh ? book.categoryAm : book.category}
              </p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.35, marginBottom: 4, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif" }}>
                {isAmh ? book.titleAm : book.title}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Poppins, sans-serif", marginBottom: 10 }}>
                {book.author} · <span style={{ color: "#18AEEA", fontWeight: 600 }}>{book.lang}</span>
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "#18AEEA", border: "none", borderRadius: 10, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer" }}>{t.readBtn}</button>
                {book.canDownload && (
                  <button style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "7px 14px", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, fontFamily: "Poppins, sans-serif", cursor: "pointer" }}>{t.downloadBtn}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
