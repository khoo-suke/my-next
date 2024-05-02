import type { Metadata } from "next";
import "../../globals.scss";
import Sidebar from '@/app/admin/_components/Sidebar';

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
      <div className="wrapper">
          <Sidebar />
          <div className="main">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
