"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '@/app/admin/_components/Sidebar';
import { Category } from '../../_components/Category/Category';
import '../_styles/Admin.scss'


export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories')
      const { categories } = await res.json()
      setCategories(categories)
    }

    fetcher()
  }, []);

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