import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "./context/LangContext";

export const metadata: Metadata = {
  title: "Soma Christos Church",
  description: "Your Spiritual Home in Dubai — Teachings, Prayer & Fellowship",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Soma Christos",
  },
};

export const viewport: Viewport = {
  themeColor: "#18AEEA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Noto+Sans+Ethiopic:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="font-poppins bg-app-bg">
        <LangProvider>
          <div className="max-w-md mx-auto min-h-screen relative bg-white">
            {children}
          </div>
        </LangProvider>
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});})}` }} />
      </body>
    </html>
  );
}
