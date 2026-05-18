"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import BottomNav from "../components/BottomNav";

const AMOUNTS = [50,100,250,500,1000];
const PURPOSES = ["Ministry Support","Media Ministry","Church Support","Special Offering","Building Fund"];
const CURRENCIES = ["AED – UAE Dirham","USD – US Dollar","ETB – Ethiopian Birr"];
const METHODS = ["Bank Transfer","Stripe (Card)","PayPal"];

const inputStyle: React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "Poppins, sans-serif", outline: "none", width: "100%", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { color: "rgba(255,255,255,0.45)", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, fontFamily: "Poppins, sans-serif", marginBottom: 8, display: "block" };

export default function DonatePage() {
  const { t, isAmh } = useLang();
  const [donationType, setDonationType] = useState("One-Time");
  const [amount, setAmount] = useState(100);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({ purpose: PURPOSES[0], currency: CURRENCIES[0], name: "", contact: "", method: METHODS[0] });
  const [success, setSuccess] = useState(false);

  const types = [t.oneTime, t.monthly, t.yearly];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", paddingBottom: 80 }}>
      <div style={{ background: "linear-gradient(180deg, #073B5C 0%, #050d1a 100%)", padding: "52px 20px 28px", textAlign: "center" }}>
        <p style={{ fontSize: 44, marginBottom: 8 }}>❤️</p>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", marginBottom: 8 }}>{t.supportMinistry}</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>{t.donateDesc}</p>
      </div>

      {success && (
        <div style={{ margin: "0 16px 16px", background: "rgba(24,234,100,0.08)", border: "1px solid rgba(24,200,80,0.2)", borderRadius: 16, padding: 16, textAlign: "center" }}>
          <p style={{ color: "#4ade80", fontSize: 16, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>🙏 Thank you! God bless your giving.</p>
        </div>
      )}

      <div style={{ padding: "0 16px 20px" }}>
        {/* Type */}
        <span style={labelStyle}>{t.donationType}</span>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {types.map((tp) => (
            <button key={tp} onClick={() => setDonationType(tp)}
              style={{ flex: 1, padding: "12px 6px", borderRadius: 14, border: donationType === tp ? "2px solid #18AEEA" : "1px solid rgba(255,255,255,0.1)", background: donationType === tp ? "rgba(24,174,234,0.12)" : "rgba(255,255,255,0.04)", color: donationType === tp ? "#18AEEA" : "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 700, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", cursor: "pointer" }}>
              {tp}
            </button>
          ))}
        </div>

        {/* Amounts */}
        <span style={labelStyle}>{t.selectAmount}</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
          {AMOUNTS.map((a) => (
            <button key={a} onClick={() => { setAmount(a); setIsCustom(false); }}
              style={{ padding: "12px 8px", borderRadius: 14, border: (amount === a && !isCustom) ? "2px solid #18AEEA" : "1px solid rgba(255,255,255,0.1)", background: (amount === a && !isCustom) ? "rgba(24,174,234,0.12)" : "rgba(255,255,255,0.04)", cursor: "pointer", textAlign: "center" }}>
              <p style={{ color: (amount === a && !isCustom) ? "#18AEEA" : "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Poppins, sans-serif", margin: 0 }}>{a}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "Poppins, sans-serif", margin: 0 }}>AED</p>
            </button>
          ))}
          <button onClick={() => setIsCustom(true)}
            style={{ padding: "12px 8px", borderRadius: 14, border: isCustom ? "2px solid #18AEEA" : "1px solid rgba(255,255,255,0.1)", background: isCustom ? "rgba(24,174,234,0.12)" : "rgba(255,255,255,0.04)", cursor: "pointer", textAlign: "center" }}>
            <p style={{ color: isCustom ? "#18AEEA" : "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 13, fontFamily: "Poppins, sans-serif", margin: 0 }}>Custom</p>
          </button>
        </div>

        {isCustom && (
          <input type="number" placeholder="Enter amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}
            style={{ ...inputStyle, marginBottom: 20 }} />
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: t.purpose, key: "purpose", opts: PURPOSES },
            { label: t.currency, key: "currency", opts: CURRENCIES },
            { label: t.paymentMethod, key: "method", opts: METHODS },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <span style={labelStyle}>{label}</span>
              <select value={(form as Record<string,string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none" }}>
                {opts.map((o) => <option key={o} style={{ background: "#073B5C" }}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <span style={labelStyle}>{t.fullName}</span>
            <input style={inputStyle} placeholder={t.fullName + " (optional)"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <span style={labelStyle}>{t.emailPhone}</span>
            <input style={inputStyle} placeholder="For receipt confirmation" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          </div>
          <button type="submit"
            style={{ background: "#18AEEA", border: "none", borderRadius: 16, padding: "18px", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: isAmh ? "'Noto Sans Ethiopic', sans-serif" : "Poppins, sans-serif", cursor: "pointer", marginTop: 4 }}>
            🙏 {t.proceedGive}
          </button>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textAlign: "center", lineHeight: 1.6, fontFamily: "Poppins, sans-serif", paddingBottom: 8 }}>
            ⚠️ {t.legalNote}
          </p>
        </form>
      </div>
      <BottomNav />
    </div>
  );
}
