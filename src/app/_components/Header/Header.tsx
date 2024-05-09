'use client'

import '../../_styles/Header.scss';
import Link from 'next/link';
import React from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { supabase } from '@/utils/supabase';

const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href= '/'
  }

  const { session, isLoding } = useSupabaseSession()

  return (
    <header className="header">
      <Link href="/">Blog</Link>
      {!isLoding && (
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/admin">管理画面</Link>
            <button onClick={handleLogout}>ログアウト</button>
          </>
          ) : (
          <>
            <Link href="/contact">お問い合わせ</Link>
            <Link href="/login">ログイン</Link>
          </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header;