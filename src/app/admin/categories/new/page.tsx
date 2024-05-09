"use client";

import '../../_styles/Admin.scss'
import { useState } from 'react'
import { useRouter } from "next/navigation"

export default function Page() {
  const [name, setName] = useState('')
  const router = useRouter();
  
  const handleSubmit = async () => {

    const res = await fetch(`/api/admin/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    router.replace('/admin/categories')
    alert('カテゴリー作成')
  }

  return (
    <>
      <div className='title mb-5'>
        <h2>
          カテゴリー新規作成
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <input
            type="text"
            id="categories"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="btnArea">
          <button
            type="submit"
            className="update"
          >
            作成
          </button>
        </div>
      </form>
    </>
  );
}