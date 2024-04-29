"use client";

import { useEffect, useState } from "react";
import styles from './styles/ListPost.module.scss';
import Link from 'next/link';
import { Post } from './components/layouts/Post/Post';

export default function ListPost() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('api/posts')
      const { posts } = await res.json()
      setPosts(posts)
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
                      {post.postCategories.map(category => (
                        <p key={category.category.id}>{category.category.name}</p>
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