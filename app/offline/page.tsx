"use client";
export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8"
      style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)" }}>
      <p className="text-7xl mb-6">🙏</p>
      <h1 className="text-white text-2xl font-bold mb-3">You are Offline</h1>
      <p className="text-white/80 text-base leading-relaxed max-w-xs">
        No internet connection. But God is always with you. The prayers and notes you have saved are still available.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 bg-white text-navy font-bold text-base px-8 py-4 rounded-2xl"
      >
        Try Again
      </button>
    </div>
  );
}
