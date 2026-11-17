
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INVOX AI | Intelligent Invoice Automation",
  description:
    "من الفاتورة إلى القرار المالي الذكي. منصة ذكية لأتمتة الفواتير ومطابقتها.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
