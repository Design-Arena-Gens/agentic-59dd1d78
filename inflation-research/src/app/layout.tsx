import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "التضخم: دراسة تحليلية شاملة",
  description:
    "بحث منظم حول مفهوم التضخم وأسبابه وآثاره وسياسات مواجهته، مع دعم بصري وإمكانية تنزيل نسخة PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoSansArabic.variable}`}>{children}</body>
    </html>
  );
}
