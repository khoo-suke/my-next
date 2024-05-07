"use client";

import "../globals.scss";
import Sidebar from '@/app/admin/_components/Sidebar';
import "./_styles/Admin.scss"

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
