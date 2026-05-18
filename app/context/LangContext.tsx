"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { translations, Lang } from "../lib/translations";

interface LangContextType {
  lang: Lang;
  t: typeof translations.en;
  toggleLang: () => void;
  isAmh: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: translations.en,
  toggleLang: () => {},
  isAmh: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((l) => (l === "en" ? "am" : "en"));

  return (
    <LangContext.Provider
      value={{ lang, t: translations[lang], toggleLang, isAmh: lang === "am" }}
    >
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
