"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { Category } from "@/app/_components/Category/Category";

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  postCategories: { category: Category }[];
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { id } = useParams();

  //GET
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`);
      const data = await res.json();
      const post: Post = data.post;
      setTitle(post.title);
      setContent(post.content);
      setThumbnailUrl(post.thumbnailUrl);
      setSelectedCategories(post.postCategories.map((pc) => pc.category));
    };

    fetcher();
  }, [id]);

  //GET
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories`);
      const data = await res.json();
      setAllCategories(data.categories);
    };

    fetcher();
  }, [id]);

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
        thumbnailUrl,
        categories: selectedCategories,
      }),
    });
  };

  //DELETE
  const handleDeletePost = async () => {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });

    console.log(res);
    alert("記事削除");
  };

  const handleChangeCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    // クリックされたカテゴリーのIDをvalueに格納
    const value = e.target.value;

    // 選択されているカテゴリーかどうかを判定
    const isSelected = !!selectedCategories.find(
      (category) => category.id === Number(value)
    );

    // 選択されているカテゴリーならselectedCategoriesから削除、そうでなければ追加
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter((category) => category.id !== Number(value))
      );
    } else {
      const selectedCategory = allCategories.find(
        (category) => category.id === Number(value)
      );
      setSelectedCategories([...selectedCategories, selectedCategory!]);
    }
  };

  return (
    <>
      <div className="title mb-10">
        <h2>記事編集</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block">タイトル</label>
          <input
            id="title"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">内容</label>
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
          <label className="block">サムネイルURL</label>
          <input
            type="text"
            id="thumbnailUrl"
            defaultValue={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <label className="block">カテゴリー</label>
          <select
            multiple
            value={selectedCategories.map((category) => String(category.id))}
            onChange={handleChangeCategory}
          >
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="btnArea">
          <button type="submit" className="update">
            更新
          </button>
          <button type="button" className="delete" onClick={handleDeletePost}>
            削除
          </button>
        </div>
      </form>
    </>
  );
}
