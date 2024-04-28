export type Post = {
  id: number,
  thumbnailUrl: string,
  categories: string[],
  title: string,
  createdAt: string,
  content: string,
}

export interface MicroCmsPost {
  id: string,
  title: string,
  content: string,
  createdAt: string,
  categories: { id: string; name: string }[],
  thmbnail: { url: string; height: number; width: number }
}