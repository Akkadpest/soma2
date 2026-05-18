"use client";
import { useLang } from "../context/LangContext";

export default function AnnouncementBar() {
  const { t, isAmh } = useLang();
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 mx-4 mt-4 px-4 py-3 rounded-xl flex items-start gap-3">
      <span className="text-xl flex-shrink-0 mt-0.5">📣</span>
      <p className={`text-sm font-medium text-navy leading-relaxed ${isAmh ? "font-ethiopic" : ""}`}>
        {t.announce}
      </p>
    </div>
  );
}
