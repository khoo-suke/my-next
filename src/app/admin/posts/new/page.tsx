"use client";

import '../../_styles/Admin.scss'
import {
  useEffect,
  useState,
  ChangeEventHandler,
  ChangeEvent,
  FormEventHandler,
} from 'react'
import { Category } from "@/app/_components/Category/Category";
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState('');
  const router = useRouter();

  // POST
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        thumbnailImageKey,
        categories: selectCategories,
      }),
  }
  )

    router.replace('/admin/posts')
    alert('記事作成')
  }

  // GET カテゴリー用
  useEffect(() => {
      if (!token) return
      
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });
      const data = await res.json();
      setAllCategories(data.categories);
    }

    fetcher();
  }, [token])

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

  //画像設定
  const handleImageChange = async(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      return
    }

    const file = event.target.files[0]
    const filePath = `private/${uuidv4()}`

    const { data, error } = await supabase.storage
      .from('post_thumbnail')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })
    
    if (error) {
      alert(error.message)
      return
    }

    setThumbnailImageKey(data.path)
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
          <label
            htmlFor='thumbnailImageKey'
            className="block">
            サムネイルURL
          </label>
          <input
            type="file"
            id="thumbnailImageKey"
            onChange={handleImageChange}
            accept='image/*'
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
          {allCategories && allCategories.map(category => (
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