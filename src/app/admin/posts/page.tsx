"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post } from '../../_components/Post/Post';
import '../_styles/Admin.scss'


export default function Page() {
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
      <div className="title mb-5">
        <h2>記事一覧</h2>
        <Link className="button" href={`/admin/posts/new`} >
          新規作成
        </Link>
      </div>
      {posts.map((post) => (
        <div  className="list">
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