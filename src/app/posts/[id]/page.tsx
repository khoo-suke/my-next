"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../_styles/PostDetail.scss';
import { Post } from '../../_components/Post/Post';
import Image from 'next/image';

const PostDetail:React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const { post } = await res.json();
      setPost(post);
    };
    fetcher();
  }, [id]);

  if (!post) return null;
  
  return (
    <>
      <div className="container">
        <Image src={post.thumbnailUrl} alt={post.title} height={400} width={800}/>
        <div className="info">
          <div className="date">
            {post.createdAt?.substring(0, 10).replace(/-/g, '/')}
          </div>
          <div className="categories">
            {post.postCategories.map(category => (
              <p key={category.category.id}>{category.category.name}</p>
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