"use client";
import { useState } from "react";
import Link from "next/link";
import { DEMO_BOOKS } from "../../lib/data";

type Book = typeof DEMO_BOOKS[0];

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>(DEMO_BOOKS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cover: "📖", bg: "#e8f6fd", category: "Bible Study", categoryAm: "የመጽሐፍ ቅዱስ ጥናት", title: "", titleAm: "", author: "", lang: "English", pdfUrl: "#", canDownload: true });

  const addBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newB: Book = { ...form, id: Date.now().toString() };
    setBooks([newB, ...books]);
    setShowForm(false);
  };

  const deleteBook = (id: string) => setBooks(books.filter((b) => b.id !== id));

  return (
    <div className="min-h-screen bg-app-bg pb-8">
      <div className="px-5 pt-10 pb-5" style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
        <Link href="/admin/dashboard" className="text-white/80 text-sm block mb-3">← Dashboard</Link>
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">📚 Books & PDFs</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-white text-sky font-bold text-sm px-4 py-2 rounded-xl">+ Add</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={addBook} className="mx-4 mt-4 bg-white border border-border rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-navy font-bold text-base">Add New Book</p>
          {[
            { label: "Title (EN)", key: "title" },
            { label: "Title (Amharic)", key: "titleAm" },
            { label: "Author", key: "author" },
            { label: "PDF URL", key: "pdfUrl" },
            { label: "Cover Emoji", key: "cover", placeholder: "📖" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">{label}</p>
              <input className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none" placeholder={placeholder || label} value={String((form as Record<string, unknown>)[key])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={key === "title"} />
            </div>
          ))}
          <div>
            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">Category</p>
            <select className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {["Bible Study","Prayer","Faith","Discipleship","Christian Life","Amharic Resources"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">Language</p>
            <select className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none" value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })}>
              <option>English</option>
              <option>አማርኛ</option>
              <option>Both</option>
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.canDownload} onChange={(e) => setForm({ ...form, canDownload: e.target.checked })} className="accent-sky" />
            <span className="text-navy text-sm font-medium">Allow Download</span>
          </label>
          <div className="flex gap-2 mt-1">
            <button type="submit" className="flex-1 bg-sky text-white font-bold py-3 rounded-xl text-sm">Save Book</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-border text-navy font-bold py-3 rounded-xl text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="px-4 mt-4 flex flex-col gap-3">
        {books.map((b) => (
          <div key={b.id} className="bg-white border border-border rounded-2xl p-4 flex gap-3">
            <div className="w-14 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: b.bg }}>{b.cover}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sky text-xs font-bold uppercase tracking-wide mb-0.5">{b.category}</p>
              <p className="text-navy font-bold text-sm leading-snug">{b.title}</p>
              <p className="text-muted text-xs mt-0.5">{b.author} · {b.lang}</p>
              <div className="flex gap-1.5 mt-2">
                <span className="bg-light-blue text-sky text-xs font-bold px-2 py-0.5 rounded-lg">PDF</span>
                {b.canDownload && <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-0.5 rounded-lg">Download ✓</span>}
              </div>
            </div>
            <button onClick={() => deleteBook(b.id)} className="text-red-400 text-xl self-start">🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}
