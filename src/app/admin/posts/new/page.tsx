"use client";

import '../../_styles/Admin.scss'
import { useState } from 'react'
import { Category } from "@/app/_components/Category/Category";


  // POST
  export default function Page() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState(
      'https://placehold.jp/800x400.png')
    const [categories, setCategories] = useState<Category[]>([])
  
    const handleSubmit = async () => {

      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, thumbnailUrl, categories }),
      })

      console.log(res)
      alert('記事作成')
    }

  return (
    <>
      <div className="title mb-10">
        <h2>記事新規作成</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block">
            タイトル
          </label>
          <input
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">
            内容
          </label>
          <textarea
            id="content"
            className="block"
            cols={30}
            rows={6}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">
            サムネイルURL
          </label>
          <input
            type="text"
            id="thumbnailUrl"
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <label className="block">
            カテゴリー
          </label>
            <input
              type="text"
              id="categories"
              />
        </div>
        <div className="btnArea">
          <button
            type="submit"
            className="update"
          >
            追加
          </button>
        </div>
      </form>
    </>
  );
}