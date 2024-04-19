"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../../styles/PostDetail.scss';
import { MicroCmsPost } from '../../components/layouts/Post/Post';
import Image from 'next/image';

const PostDetail:React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<MicroCmsPost | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://abdaepboet.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        },
      );
      const data = await res.json();
      console.log(data);
      setPost(data);
    };
    fetcher();
  }, [id]);

  if (!post) return null;
  
  return (
    <>
      <div className="container">
        <Image src={post.thmbnail.url} alt={post.title} height={400} width={800}/>
        <div className="info">
          <div className="date">
            {post.createdAt?.substring(0, 10).replace(/-/g, '/')}
          </div>
          <div className="categories">
            {post.categories.map(category => (
              <p key={category.id}>{category.name}</p>
            ))}
          </div>
        </div>
        <h2>{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
      </div>
    </>
  );
}

export default PostDetail;