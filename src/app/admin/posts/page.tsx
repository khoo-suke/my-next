"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post } from '../../_components/Post/Post';
import '../_styles/Admin.scss'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';


export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useSupabaseSession()

  useEffect(() => {
    if (!token) return

    const fetcher = async () => {
      const res = await fetch('/api/admin/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const { posts } = await res.json()
      setPosts([...posts])
    }

    fetcher()
  }, [token])

  return (
    <>
      <div className="title mb-5">
        <h2>記事一覧</h2>
        <Link className="button" href="/admin/posts/new">
          新規作成
        </Link>
      </div>
      {posts.map((post) => (
        <div className="list" key={post.id}>
          <Link href={`/admin/posts/${post.id}`} >
            {post.title}
            <div className="text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}