"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import Sidebar from "@/app/components/layouts/Sidebar/Sidebar";
import { Post } from "@/app/components/layouts/Post/Post";

export default function AdminId() {
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
            <h2>記事編集</h2>
          </div>
          <div className="mb-5">
            <label className="block">
              タイトル
            </label>
            <input type="text" name="text"/>
          </div>
          <div className="mb-5">
            <label className="block">
              内容
            </label>
            <input type="text" name="text"/>
          </div>
          <div className="mb-5">
            <label className="block">
              サムネイルURL
            </label>
            <input type="text" name="text"/>
          </div>
          <div className="mb-10">
            <label className="block">
              カテゴリー
            </label>
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
      </div>
    </>
  );
}