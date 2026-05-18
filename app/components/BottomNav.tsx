"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LangContext";

const navItems = (t: ReturnType<typeof useLang>["t"]) => [
  { href: "/", label: t.today, icon: "📅" },
  { href: "/teachings", label: t.teachings, icon: "🗺" },
  { href: "/prayer", label: t.prayer, icon: "📖" },
  { href: "/notes", label: t.notes, icon: "📋" },
  { href: "/library", label: t.library, icon: "📊" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t, isAmh } = useLang();
  const items = navItems(t);
  const ff = isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif";

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 448,
      background: "rgba(5,13,26,0.97)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center", justifyContent: "space-around",
      height: 72, paddingBottom: "env(safe-area-inset-bottom)",
      zIndex: 100
    }}>
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textDecoration: "none", padding: "8px 14px", borderRadius: 12 }}>
            <span style={{ fontSize: 22, lineHeight: 1, opacity: active ? 1 : 0.4, filter: active ? "none" : "grayscale(1)" }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontFamily: ff, fontWeight: 600, color: active ? "#18AEEA" : "rgba(255,255,255,0.35)", letterSpacing: 0.3 }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
