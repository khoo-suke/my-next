"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { useParams } from 'next/navigation'
import { Category } from "@/app/_components/Category/Category";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState(``);
  const router = useRouter();

  //GET 記事用
  useEffect(() => {
    if (!token) return
    
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await res.json();
      const { post } = data;
      setTitle(post.title);
      setContent(post.content);
      setThumbnailImageKey(post.thumbnailImageKey);
      setSelectCategories(post.postCategories.map((cate: any) => cate.category));
    }

    fetcher();
  }, [token])

  // GET カテゴリー用
  useEffect(() => {
    if(!token) return

    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await res.json();
      setAllCategories(data.categories);
    }

    fetcher();
  }, [token])

  //PUT
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        title,
        content,
        thumbnailImageKey,
        categories: selectCategories,
      }),
    })

    alert('更新完了')
    router.replace('/admin/posts')
  }

  //DELETE
  const handleDeletePost = async () => {

    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'DELETE',
    })

    console.log(res)
    alert('記事削除')
  }

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

  // 画像設定
  const handleImageChange = async (
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
        <h2>記事編集</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block">
            タイトル
          </label>
          <input
            id="title"
            type="text"
            defaultValue={title}
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
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="thumbnailImageKey"
            className="block"
          >
            サムネイルURL
          </label>
          <input
            type="file"
            id="thumbnailImageKey"
            defaultValue={thumbnailImageKey}
            onChange={handleImageChange}
            accept="image/*"
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
          <button type="submit"
            className="update"
          >
            更新
          </button>
          <button type="button"
            className="delete"
            onClick={handleDeletePost}
          >
            削除
          </button>
        </div>
      </form>
    </>
  );
}