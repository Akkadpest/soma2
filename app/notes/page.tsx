"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { DEMO_NOTES } from "../lib/data";
import BottomNav from "../components/BottomNav";

type Note = typeof DEMO_NOTES[0];
const emptyNote = { id: "", title: "", titleAm: "", verse: "", learned: "", godSpoke: "", action: "", prayerPt: "", date: "" };

const inputStyle: React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: "Poppins, sans-serif", outline: "none", width: "100%", boxSizing: "border-box" };

export default function NotesPage() {
  const { t, isAmh } = useLang();
  const [notes, setNotes] = useState<Note[]>(DEMO_NOTES);
  const [view, setView] = useState<"list"|"new"|"detail">("list");
  const [form, setForm] = useState(emptyNote);
  const [detail, setDetail] = useState<Note|null>(null);
  const [search, setSearch] = useState("");

  const filtered = notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));

  const saveNote = () => {
    if (!form.title) return;
    const n: Note = { ...form, id: Date.now().toString(), titleAm: form.title, date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) };
    setNotes([n, ...notes]);
    setForm(emptyNote);
    setView("list");
  };

  const deleteNote = (id: string) => { setNotes(notes.filter((n) => n.id !== id)); setView("list"); };

  const sectionLabel = (label: string) => (
    <p style={{ color: "#18AEEA", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "Poppins, sans-serif", marginBottom: 6 }}>{label}</p>
  );

  if (view === "detail" && detail) {
    return (
      <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
        <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 24px" }}>
          <button onClick={() => setView("list")} style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Poppins, sans-serif", background: "none", border: "none", cursor: "pointer", marginBottom: 14, fontWeight: 600 }}>← Back</button>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>{detail.title}</h1>
          <p style={{ color: "#18AEEA", fontSize: 13, fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>{detail.date} · {detail.verse}</p>
        </div>
        <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "What I Learned", value: detail.learned },
            { label: "What God Spoke to Me", value: detail.godSpoke },
            { label: "My Action This Week", value: detail.action },
            { label: "My Prayer Point", value: detail.prayerPt },
          ].filter((s) => s.value).map((s) => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16 }}>
              {sectionLabel(s.label)}
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.65, fontFamily: "Poppins, sans-serif" }}>{s.value}</p>
            </div>
          ))}
          <button onClick={() => deleteNote(detail.id)} style={{ border: "1px solid rgba(255,80,80,0.3)", background: "rgba(255,80,80,0.07)", color: "#f87171", borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 600, fontFamily: "Poppins, sans-serif", cursor: "pointer", marginBottom: 20 }}>
            🗑 Delete Note
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (view === "new") {
    return (
      <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
        <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 24px" }}>
          <button onClick={() => setView("list")} style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Poppins, sans-serif", background: "none", border: "none", cursor: "pointer", marginBottom: 14, fontWeight: 600 }}>← {t.cancel}</button>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}>{t.addNote}</h1>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: t.sermonTitle, key: "title", rows: 1 },
            { label: t.bibleVerse, key: "verse", rows: 1 },
            { label: t.whatLearned, key: "learned", rows: 3 },
            { label: t.godSpoke, key: "godSpoke", rows: 3 },
            { label: t.myAction, key: "action", rows: 2 },
            { label: t.myPrayerPt, key: "prayerPt", rows: 2 },
          ].map(({ label, key, rows }) => (
            <div key={key}>
              {sectionLabel(label)}
              <textarea rows={rows} style={{ ...inputStyle, resize: "none" }} value={(form as Record<string,string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={label} />
            </div>
          ))}
          <button onClick={saveNote} style={{ background: "#18AEEA", border: "none", borderRadius: 14, padding: 16, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer", marginBottom: 20 }}>
            💾 {t.saveNote}
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
      <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 20px" }}>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>{t.sermonNotes}</h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "Poppins, sans-serif" }}>{t.yourJournal}</p>
      </div>

      <div style={{ margin: "12px 16px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>🔍</span>
        <input type="text" placeholder={t.searchNotes} value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 14, fontFamily: "Poppins, sans-serif" }} />
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((note) => (
          <button key={note.id} onClick={() => { setDetail(note); setView("detail"); }}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 16, textAlign: "left", cursor: "pointer", width: "100%" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>{note.date}</p>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", marginBottom: 6, lineHeight: 1.3 }}>
              {isAmh ? note.titleAm : note.title}
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Poppins, sans-serif", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {note.learned}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <span style={{ background: "rgba(24,174,234,0.15)", color: "#18AEEA", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, fontFamily: "Poppins, sans-serif" }}>{note.verse}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, fontFamily: "Poppins, sans-serif" }}>Sermon Note</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.3)" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>📝</p>
            <p style={{ fontSize: 16, fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>{t.noNotes}</p>
          </div>
        )}
      </div>

      <button onClick={() => setView("new")}
        style={{ position: "fixed", bottom: 90, right: 20, width: 54, height: 54, background: "#18AEEA", border: "none", borderRadius: "50%", color: "#fff", fontSize: 28, cursor: "pointer", boxShadow: "0 4px 20px rgba(24,174,234,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        +
      </button>

      <BottomNav />
    </div>
  );
}
