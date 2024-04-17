"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/PostDetail.scss';
import { Post } from '../../components/layouts/Post/Post';
import Image from 'next/image';

const PostDetail:React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
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
            {post.categories.map(category => (
              <p key={category}>{category}</p>
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