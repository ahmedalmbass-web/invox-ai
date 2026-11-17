
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LockKeyhole, Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b100e] px-5 py-12 text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-2xl font-bold">
          <span className="text-emerald-400">INVOX</span>
          <span>AI</span>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-[#121b16] p-7 shadow-2xl">
          <h1 className="text-3xl font-bold">مرحباً بعودتك</h1>
          <p className="mt-3 text-sm text-gray-400">
            سجّل الدخول للوصول إلى مساحة العمل المالية الخاصة بك.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full bg-transparent py-4 text-sm outline-none"
                />
              </div>
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
                  جارٍ تسجيل الدخول...
                </>
              ) : (
                <>
                  تسجيل الدخول
                  <ArrowLeft size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-400">
            ليس لديك حساب؟
            {" "}
            <Link href="/register" className="font-bold text-emerald-400">
              أنشئ حساباً جديداً
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
