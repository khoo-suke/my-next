"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '@/app/components/layouts/Sidebar/Sidebar';
import { Post } from '../../components/layouts/Post/Post';
import '../../styles/Admin.scss'


export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/posts')
      const { posts } = await res.json()
      setPosts(posts)
    }

    fetcher()
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar/>
        <div className="main">
          <div className="title mb-10">
            <h2>カテゴリー一覧</h2>
            <Link className="button" href={`/admin/categories/new/`} >
              新規作成
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}