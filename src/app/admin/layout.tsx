"use client";

import "../globals.scss";
import Sidebar from '@/app/admin/_components/Sidebar';
import "./_styles/Admin.scss";
import { useRouteGuard } from "../_hooks/useRouteGuard";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  useRouteGuard()

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
