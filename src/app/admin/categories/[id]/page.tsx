"use client";

import { FormEventHandler, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import '../../_styles/Admin.scss'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { useRouter } from "next/navigation"

export default function Page() {
  const [name, setName] = useState('');
  const { id } = useParams();
  const { token } = useSupabaseSession();
  const router = useRouter();
  
  //GET
  useEffect(() => {
    if(!token) return

    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const { category } = await res.json()
      setName(category.name)
    }

    fetcher()
  }, [token])

  //PUT
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'COntent-Type': 'application/json',
      },

      body: JSON.stringify({ name })
    })

    router.replace('/admin/categories')
    alert('カテゴリー更新')
  }

  //DELETE
  const handleDeletePost = async () => {

    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
    })

    router.replace('/admin/categories')
    alert('カテゴリー削除')
  }

  return (
    <>
      <div className="title mb-10">
        <h2>カテゴリー編集</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <label className="block">
            カテゴリー名
          </label>
            <input
              type="text"
              id="categories"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
              />
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