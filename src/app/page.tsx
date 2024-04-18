"use client";

import { useEffect, useState } from "react";
import styles from './styles/ListPost.module.scss';
import Link from 'next/link';
import { Post } from './components/layouts/Post/Post';

const ListPost:React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await res.json()
      setPosts(data.posts)
    }

    fetcher()
  }, []);

  return (
    <>
      {posts.map(elem => (
        <div className={styles.home_container} key={elem.id}>
          <ul>
            <li>
              <Link href={`post/${elem.id}`}>
                <div className={styles.home_inner}>
                  <div className={styles.home_info}>
                    <div className={styles.home_date}>
                      {elem.createdAt.substring(0, 10).replace(/-/g, '/')}
                    </div>
                    <div className={styles.home_categories}>
                      {elem.categories.map(category => (
                        <p key={category}>{category}</p>
                      ))}
                    </div>
                  </div>
                  <h2>{elem.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: `${elem.content.substring(0, 60)}${elem.content.length > 60 ? '…' : ''}` }} />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      ))};
    </>
  );
}

export default ListPost;
