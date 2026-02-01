import type { Metadata } from "next";
import { Lexend_Deca, Noto_Sans, Zen_Maru_Gothic } from "next/font/google";
import { MainLayout } from "./_components/main-layout";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ソフトウェア研究部｜東京電機大学",
  description:
    "東京電機大学ソフトウェア研究部のホームページです。当部活では、ゲームプログラミング班、Webアプリ班、サウンド班、2D班、3D班、デザイン班が活動しています。",
  keywords: [
    "ソフトウェア研究部",
    "パソコン部",
    "SRC",
    "ソフ研",
    "電大",
    "東京電機大学",
    "TDU",
    "学術研究部会",
    "PC",
    "ゲーム",
    "部活",
    "ソフきゃら",
    "ソフ研",
    "ソフ研ホームページ",
    "大学",
  ],
  icons: {
    icon: "/fabicon.png",
  },
  openGraph: {
    title: "ソフトウェア研究部｜東京電機大学",
    description:
      "東京電機大学ソフトウェア研究部のホームページです。当部活では、ゲームプログラミング班、Webアプリ班、サウンド班、2D班、3D班、デザイン班が活動しています。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "ソフトウェア研究部｜東京電機大学",
    description:
      "東京電機大学ソフトウェア研究部のホームページです。当部活では、ゲームプログラミング班、Webアプリ班、サウンド班、2D班、3D班、デザイン班が活動しています。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${lexendDeca.variable} ${notoSans.variable} ${zenMaruGothic.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
