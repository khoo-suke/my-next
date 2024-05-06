"use client";

import '../../_styles/Admin.scss'
import {
  useEffect,
  useState,
  ChangeEventHandler
} from 'react'
import { useParams } from 'next/navigation'
import { Category } from "@/app/_components/Category/Category";


  // POST
  export default function Page() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState(
      'https://placehold.jp/800x400.png');
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [selectCategories, setSelectCategories] = useState<Category[]>([]);
    const { id } = useParams();
  
    const handleSubmit = async () => {

      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          thumbnailUrl,
          categories: selectCategories,
        }),
      })

      console.log(res)
      alert('記事作成')
    }

      // GET カテゴリー用
    useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories`);
      const data = await res.json();
      setAllCategories(data.categories);
    }

    fetcher();
  }, [id])

    // SELECT
    const handleChangeCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    const isSelected = !!selectCategories.find(
      (category) => category.id === Number(value)
    );

    if (isSelected) {
      setSelectCategories(
        selectCategories.filter((category) => category.id !== Number(value))
      );
    } else {
      const selectCategory = allCategories.find(
        (category) => category.id === Number(value)
      );
      setSelectCategories([...selectCategories, selectCategory!]);
    }
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
          <select
            multiple
            value={selectCategories.map((category) => String(category.id))}
            onChange={handleChangeCategory}
          >
          {allCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        </div>
        <div className="btnArea">
          <button
            type="submit"
            className="delete"
          >
            追加
          </button>
        </div>
      </form>
    </>
  );
}