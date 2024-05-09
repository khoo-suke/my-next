"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../_styles/PostDetail.scss';
import { Post } from '../../_components/Post/Post';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';

const PostDetail:React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const { post } = await res.json();
      setPost(post);
    };
    fetcher();
  }, [id]);

  useEffect(() => {
    if (!post) return;

    if (!post?.thumbnailImageKey) return

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('post_thumbnail')
        .getPublicUrl(post.thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)
    }

    fetcher()
  }, [post?.thumbnailImageKey])
  
  return (
    <>
      {post &&
        <div className="container">
          {thumbnailImageUrl && (
            <div className="mt-2">
              <Image
                src={thumbnailImageUrl}
                alt="thumbnail"
                width={400}
                height={400}
              />
            </div>
          )}
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
      }
    </>
  );
}

export default PostDetail;