"use client";

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Category } from "@/app/_components/Category/Category";
import '../../_styles/Admin.scss'

export default function Page() {
  const [name, setName] = useState('')
  const { id } = useParams()
  
  //GET
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`)
      const { category } = await res.json()
      setName(category.name)
    }

    fetcher()
  }, [id])

  //PUT
  const handleSubmit = async () => {

    await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'COntent-Type': 'application/json',
      },

      body: JSON.stringify({ name })
    })

    alert('カテゴリー更新')
  }

  //DELETE
  const handleDeletePost = async () => {

    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
    })

    console.log(res)
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