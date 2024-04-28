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
          <div className="title">
            <h2>記事一覧</h2>
            <Link className="button" href={`/admin/posts/new`} >
              新規作成
            </Link>
            </div>
        {posts.map((post) => (
          <div className=''>
          <Link href={`/admin/posts/${post.id}`} >
              {post.title}
              <div className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
              </div>
          </Link>
        </div>
      ))}
        </div>
      </div>
    </>
  );
}