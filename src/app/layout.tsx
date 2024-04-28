import type { Metadata } from "next";
import "./globals.scss";
import Header from "./components/layouts/Header/Header";

export const metadata: Metadata = {
  title: "NextJS課題",
  description: "NextJS課題です",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
      <Header/>
        {children}
      </body>
    </html>
  )
}
