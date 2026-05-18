"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (creds.email === "admin@somachristos.ae" && creds.password === "admin123") {
        localStorage.setItem("soma_admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Use admin@somachristos.ae / admin123");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "linear-gradient(160deg, #073B5C 0%, #18AEEA 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-6xl mb-3">⛪</p>
          <h1 className="text-white text-2xl font-bold">Soma Christos</h1>
          <p className="text-white/70 text-sm mt-1">Admin Panel</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <h2 className="text-navy font-bold text-xl mb-5 text-center">Admin Login</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-center">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-navy font-bold text-xs uppercase tracking-wider block mb-2">Email</label>
              <input
                type="email"
                placeholder="admin@somachristos.ae"
                value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none"
                required
              />
            </div>
            <div>
              <label className="text-navy font-bold text-xs uppercase tracking-wider block mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={creds.password}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm text-navy outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold text-base py-4 rounded-xl mt-1 transition-opacity"
              style={{ background: "linear-gradient(135deg, #073B5C, #18AEEA)", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Logging in..." : "🔐 Login to Admin"}
            </button>
          </form>

          <div className="mt-4 p-3 bg-app-bg rounded-xl">
            <p className="text-muted text-xs text-center font-medium">Demo credentials shown above ↑</p>
          </div>
        </div>
      </div>
    </div>
  );
}
