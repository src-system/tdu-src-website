import type { Metadata } from "next";
import { MainLayout } from "@/src/app/_components/main-layout";
import { lexendDeca, notoSans, zenMaruGothic } from "@/src/app/_lib/fonts";
import "./globals.css";
import "highlight.js/styles/github.css";

export const metadata: Metadata = {
  title: "東京電機大学 ソフトウェア研究部",
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
