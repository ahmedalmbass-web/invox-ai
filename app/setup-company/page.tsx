
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MapPin,
  BriefcaseBusiness,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function SetupCompanyPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("trading");
  const [country, setCountry] = useState("اليمن");
  const [currency, setCurrency] = useState("YER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/onboarding/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: companyName.trim(),
          industry,
          country,
          currency,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "تعذر إنشاء الشركة. حاول مرة أخرى.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("تعذر الاتصال بالخادم. تحقق من اتصال الإنترنت.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0b100e] px-5 py-12 text-white flex items-center justify-center"
    >
      <div className="w-full max-w-lg">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-2xl font-bold">
          <span className="text-emerald-400">INVOX</span>
          <span>AI</span>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-[#121b16] p-7 shadow-2xl">
          <div className="mb-7">
            <span className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <Building2 size={28} />
            </span>
            <h1 className="text-3xl font-bold">إعداد مساحة شركتك</h1>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              أدخل معلومات شركتك لنجهز لك مساحة عمل لإدارة الفواتير والموردين والمطابقة المالية.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                اسم الشركة
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b100e] px-4">
                <Building2 size={18} className="text-emerald-400" />
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="مثال: شركة الأفق التجارية"
                  className="w-full bg-transparent py-4 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                مجال النشاط
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b100e] px-4">
                <BriefcaseBusiness size={18} className="text-emerald-400" />
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-transparent py-4 text-sm outline-none"
                >
                  <option value="trading" className="bg-[#121b16]">التجارة</option>
                  <option value="retail" className="bg-[#121b16]">البيع بالتجزئة</option>
                  <option value="manufacturing" className="bg-[#121b16]">الصناعة</option>
                  <option value="services" className="bg-[#121b16]">الخدمات</option>
                  <option value="construction" className="bg-[#121b16]">المقاولات</option>
                  <option value="other" className="bg-[#121b16]">نشاط آخر</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                الدولة
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b100e] px-4">
                <MapPin size={18} className="text-emerald-400" />
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-transparent py-4 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                العملة الأساسية
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0b100e] px-4 py-4 text-sm outline-none"
              >
                <option value="YER" className="bg-[#121b16]">الريال اليمني (YER)</option>
                <option value="SAR" className="bg-[#121b16]">الريال السعودي (SAR)</option>
                <option value="USD" className="bg-[#121b16]">الدولار الأمريكي (USD)</option>
              </select>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-bold text-[#07130d] transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  جارٍ تجهيز مساحة الشركة...
                </>
              ) : (
                <>
                  إنشاء مساحة الشركة
                  <ArrowLeft size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
