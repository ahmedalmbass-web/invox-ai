
"use client";

import { useState } from "react";
import {
  LayoutDashboard, FileText, Users, ShoppingCart,
  ClipboardCheck, BarChart3, Settings, Search,
  Bell, Plus, ArrowUpLeft, ArrowDownRight,
  CheckCircle2, Clock3, AlertTriangle, Menu,
  Sparkles, Globe, ChevronLeft
} from "lucide-react";

const initialInvoices = [
  { id: "INV-2026-001", supplier: "شركة الأفق للتجارة", date: "17 نوفمبر 2026", amount: "2,450.00", currency: "USD", status: "قيد المراجعة" },
  { id: "INV-2026-002", supplier: "مؤسسة النور", date: "16 نوفمبر 2026", amount: "850,000", currency: "YER", status: "مطابقة" },
  { id: "INV-2026-003", supplier: "شركة الإمداد الحديثة", date: "15 نوفمبر 2026", amount: "1,250.00", currency: "USD", status: "تحتاج مراجعة" },
  { id: "INV-2026-004", supplier: "مؤسسة البناء", date: "14 نوفمبر 2026", amount: "420,000", currency: "YER", status: "معتمدة" },
];

const navigation = [
  { label: "الرئيسية", icon: LayoutDashboard },
  { label: "الفواتير", icon: FileText },
  { label: "الموردون", icon: Users },
  { label: "أوامر الشراء", icon: ShoppingCart },
  { label: "مطابقة الفواتير", icon: ClipboardCheck },
  { label: "التقارير", icon: BarChart3 },
  { label: "الإعدادات", icon: Settings },
];

export default function Home() {
  const [active, setActive] = useState("الرئيسية");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [invoices, setInvoices] = useState(initialInvoices);

  const filtered = invoices.filter((invoice) =>
    `${invoice.id} ${invoice.supplier}`.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { title: "إجمالي الفواتير", value: "1,284", note: "+12.8% مقارنة بالشهر الماضي", icon: FileText, color: "#34d399" },
    { title: "بانتظار المراجعة", value: "24", note: "تحتاج إلى اتخاذ إجراء", icon: Clock3, color: "#fbbf24" },
    { title: "الفواتير المطابقة", value: "1,102", note: "85.8% من إجمالي الفواتير", icon: CheckCircle2, color: "#60a5fa" },
    { title: "اختلافات مكتشفة", value: "18", note: "تحتاج إلى التحقق", icon: AlertTriangle, color: "#fb7185" },
  ];

  const statusColor: Record<string, string> = {
    "قيد المراجعة": "#fbbf24",
    "مطابقة": "#34d399",
    "تحتاج مراجعة": "#fb7185",
    "معتمدة": "#60a5fa",
  };

  return (
    <main className="container" style={{ display: "flex", gap: 22, paddingBlock: 24, minHeight: "100vh" }}>
      <aside style={{
        width: menuOpen ? 240 : 230,
        flexShrink: 0,
        background: "#111a16",
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: 22,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 28
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 43, height: 43, borderRadius: 13, background: "#10b981", color: "#07130e", display: "grid", placeItems: "center" }}>
            <Sparkles size={23} />
          </div>
          <div>
            <h2 style={{ fontSize: 21, fontWeight: 900, letterSpacing: 1 }}>INVOX AI</h2>
            <p className="muted" style={{ fontSize: 10 }}>INTELLIGENT FINANCE</p>
          </div>
        </div>

        <div>
          <p className="muted" style={{ fontSize: 11, marginBottom: 13 }}>القائمة الرئيسية</p>
          <nav style={{ display: "grid", gap: 7 }}>
            {navigation.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setActive(label)} style={{
                display: "flex", alignItems: "center", gap: 12,
                border: "none", borderRadius: 11, padding: "12px 13px",
                background: active === label ? "rgba(16,185,129,.13)" : "transparent",
                color: active === label ? "#34d399" : "#91a39a",
                textAlign: "right", fontSize: 13, fontWeight: 700
              }}>
                <Icon size={18} />
                {label}
                {label === "الفواتير" && <span style={{ marginRight: "auto", fontSize: 10, background: "#24372e", padding: "2px 7px", borderRadius: 20 }}>24</span>}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: "auto", background: "#18251f", padding: 15, borderRadius: 14 }}>
          <Sparkles color="#34d399" size={19} />
          <p style={{ fontSize: 13, fontWeight: 800, marginTop: 9 }}>ذكاء مالي أكثر</p>
          <p className="muted" style={{ fontSize: 11, lineHeight: 1.9, marginTop: 5 }}>اكتشف الاختلافات واتخذ قراراتك بثقة.</p>
        </div>
      </aside>

      <section style={{ flex: 1, minWidth: 0 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 30, flexWrap: "wrap" }}>
          <div>
            <p className="muted" style={{ fontSize: 12 }}>الثلاثاء، 17 نوفمبر 2026</p>
            <h1 style={{ fontSize: 25, fontWeight: 900, marginTop: 5 }}>{active === "الرئيسية" ? "مرحباً بك في INVOX AI 👋" : active}</h1>
            <p className="muted" style={{ fontSize: 12, marginTop: 5 }}>إليك نظرة عامة على نشاطك المالي اليوم.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button aria-label="الإشعارات" className="panel" style={{ width: 42, height: 42, display: "grid", placeItems: "center", color: "white" }}><Bell size={18} /></button>
            <button className="panel" style={{ padding: "9px 13px", color: "#dce9e1", display: "flex", gap: 7, alignItems: "center", fontSize: 12 }}>
              <Globe size={15} /> العربية
            </button>
            <div style={{ width: 40, height: 40, borderRadius: 50, background: "#1d4736", display: "grid", placeItems: "center", color: "#34d399", fontWeight: 900 }}>A</div>
          </div>
        </header>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800 }}>ملخص الأداء</h2>
            <p className="muted" style={{ fontSize: 11, marginTop: 4 }}>مؤشرات حسابك المالي</p>
          </div>
          <button onClick={() => setActive("رفع فاتورة")} style={{ background: "#10b981", color: "#07130e", border: 0, borderRadius: 10, padding: "11px 17px", fontWeight: 900, display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <Plus size={17} /> إضافة فاتورة
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 13, marginBottom: 22 }}>
          {stats.map(({ title, value, note, icon: Icon, color }) => (
            <div key={title} className="panel" style={{ padding: 17 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="muted" style={{ fontSize: 12 }}>{title}</span>
                <span style={{ background: `${color}18`, color, padding: 9, borderRadius: 11 }}><Icon size={19} /></span>
              </div>
              <h3 style={{ fontSize: 27, fontWeight: 900, marginTop: 13 }}>{value}</h3>
              <p className="muted" style={{ fontSize: 10, marginTop: 5 }}>{note}</p>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800 }}>أحدث الفواتير</h2>
              <p className="muted" style={{ fontSize: 11, marginTop: 4 }}>تابع حالة الفواتير الواردة</p>
            </div>
            <div style={{ position: "relative" }}>
              <Search size={15} color="#91a39a" style={{ position: "absolute", right: 11, top: 12 }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن فاتورة..." style={{ width: 190, background: "#0b100e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 9, padding: "9px 34px 9px 10px", color: "white", fontSize: 11, outline: "none" }} />
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 580, textAlign: "right" }}>
              <thead>
                <tr style={{ color: "#91a39a", fontSize: 11 }}>
                  {["رقم الفاتورة", "المورد", "التاريخ", "المبلغ", "الحالة", ""].map((heading) => (
                    <th key={heading} style={{ padding: "12px 9px", borderBottom: "1px solid rgba(255,255,255,.08)", fontWeight: 500 }}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((invoice) => (
                  <tr key={invoice.id} style={{ fontSize: 11 }}>
                    <td style={{ padding: "16px 9px", color: "#34d399", fontWeight: 800 }}>{invoice.id}</td>
                    <td style={{ padding: "16px 9px" }}>{invoice.supplier}</td>
                    <td style={{ padding: "16px 9px", color: "#91a39a" }}>{invoice.date}</td>
                    <td style={{ padding: "16px 9px", fontWeight: 700, direction: "ltr", textAlign: "right" }}>{invoice.amount} {invoice.currency}</td>
                    <td style={{ padding: "16px 9px" }}>
                      <span style={{ color: statusColor[invoice.status], background: `${statusColor[invoice.status]}18`, borderRadius: 20, padding: "5px 9px", whiteSpace: "nowrap" }}>{invoice.status}</span>
                    </td>
                    <td style={{ padding: "16px 9px" }}><button aria-label="عرض الفاتورة" onClick={() => setActive(`الفاتورة ${invoice.id}`)} style={{ background: "transparent", border: 0, color: "#91a39a" }}><ChevronLeft size={17} /></button></td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: 25, textAlign: "center", color: "#91a39a" }}>لا توجد نتائج مطابقة.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 15 }}>
          <div className="panel" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800 }}>حالة المعالجة</h3>
            <div style={{ height: 9, background: "#25352d", borderRadius: 20, marginTop: 18, overflow: "hidden" }}>
              <div style={{ width: "85.8%", height: "100%", background: "#10b981", borderRadius: 20 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11 }}>
              <span className="muted">نسبة المطابقة</span><strong style={{ color: "#34d399" }}>85.8%</strong>
            </div>
          </div>
          <div className="panel" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800 }}>مساعد INVOX الذكي</h3>
            <p className="muted" style={{ fontSize: 11, lineHeight: 2, marginTop: 9 }}>سيظهر هنا ملخص ذكي للفواتير والاختلافات بعد ربط محرك الذكاء الاصطناعي.</p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#34d399", fontSize: 10, marginTop: 10 }}><Sparkles size={13} /> جاهز للربط بالذكاء الاصطناعي</span>
          </div>
        </div>

        <footer className="muted" style={{ textAlign: "center", fontSize: 10, padding: 25 }}>
          INVOX AI © 2026 — من الفاتورة إلى القرار المالي الذكي
        </footer>
      </section>
    </main>
  );
}
