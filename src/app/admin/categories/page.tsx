"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Category } from '../../_components/Category/Category';
import '../_styles/Admin.scss'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';


export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useSupabaseSession()

  useEffect(() => {
    if (!token) return
    
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      })
      const { categories } = await res.json()
      setCategories(categories)
    }

    fetcher()
  }, [token]);

  return (
    <>
      <div className="title mb-5">
        <h2>カテゴリー一覧</h2>
        <Link className='button' href={`/admin/categories/new`}>
          新規作成
        </Link>
      </div>
      {categories.map((category) => (
        <div className="list" key={category.id}>
          <Link href={`/admin/categories/${category.id}`}>
            {category.name}
          </Link>
        </div>
      ))}
    </>
  );
}