"use client";

import { useEffect, useState } from "react";
import styles from './styles/ListPost.module.scss';
import Link from 'next/link';
import { MicroCmsPost } from './components/layouts/Post/Post';

export default function ListPost() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('https://abdaepboet.microcms.io/api/v1/posts', {
      headers: {
        'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
      },
    })
      const data = await res.json()
      console.log(data)
      setPosts(data.contents)
    }

    fetcher()
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div className={styles.home_container} key={post.id}>
          <ul>
            <li>
              <Link href={`/posts/${post.id}`}>
                <div className={styles.home_inner}>
                  <div className={styles.home_info}>
                    <div className={styles.home_date}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className={styles.home_categories}>
                      {post.categories.map(category => (
                        <p key={category.id}>{category.name}</p>
                      ))}
                    </div>
                  </div>
                  <h2>{post.title}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
