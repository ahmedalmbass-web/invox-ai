
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  UserRound,
  Mail,
  LockKeyhole,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: registerError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });

      if (registerError) {
        setError(registerError.message);
        return;
      }

      if (data.session) {
        setSuccess("تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.");
      } else {
        setSuccess(
          "تم إرسال رسالة تأكيد إلى بريدك الإلكتروني. افتح الرسالة وأكّد حسابك."
        );
      }
    } catch {
      setError("حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0b100e] px-5 py-12 text-white flex items-center justify-center"
    >
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-2xl font-bold">
          <span className="text-emerald-400">INVOX</span>
          <span>AI</span>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-[#121b16] p-7 shadow-2xl">
          <h1 className="text-3xl font-bold">أنشئ حسابك</h1>
          <p className="mt-3 text-sm text-gray-400">
            ابدأ بتنظيم فواتير شركتك وإدارة عمليات المطابقة بذكاء.
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                الاسم الكامل
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b100e] px-4">
                <UserRound size={18} className="text-emerald-400" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك"
                  className="w-full bg-transparent py-4 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                البريد الإلكتروني
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b100e] px-4">
                <Mail size={18} className="text-emerald-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-transparent py-4 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                كلمة المرور
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b100e] px-4">
                <LockKeyhole size={18} className="text-emerald-400" />
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8 أحرف على الأقل"
                  className="w-full bg-transparent py-4 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                تأكيد كلمة المرور
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b100e] px-4">
                <LockKeyhole size={18} className="text-emerald-400" />
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد كتابة كلمة المرور"
                  className="w-full bg-transparent py-4 text-sm outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            {success && (
              <div role="status" className="flex gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <CheckCircle2 size={20} className="shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-bold text-[#07130d] transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  جارٍ إنشاء الحساب...
                </>
              ) : (
                <>
                  إنشاء الحساب
                  <ArrowLeft size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-400">
            لديك حساب بالفعل؟
            {" "}
            <Link href="/login" className="font-bold text-emerald-400">
              تسجيل الدخول
            </Link>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-gray-600">
          INVOX AI — من الفاتورة إلى القرار المالي الذكي
        </p>
      </div>
    </main>
  );
}
