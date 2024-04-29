import { Category } from './Category'

export type Post = {
  id: number,
  title: string,
  content: string,
  thumbnailUrl: string,
  createdAt: string,
  updatedAt:string,
  postCategories: { category: Category }[],
}

export type MicroCmsPost = {
  id: string,
  title: string,
  content: string,
  createdAt: string,
  categories: { id: string; name: string }[],
  thmbnail: { url: string; height: number; width: number }
}