"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '@/app/components/layouts/Sidebar/Sidebar';
import { Post } from '../../../components/layouts/Post/Post';
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
            <h2>カテゴリー編集</h2>
          </div>
        </div>
        <div className="mb-10">
            <input type="text" name="text"/>
        </div>
        <div className="btnArea">
          <Link className="update" href={`/admin/categories/new/`} >
            更新
          </Link>
          <Link className="delete" href={`/admin/categories/new/`} >
            削除
          </Link>
        </div>
      </div>
    </>
  );
}