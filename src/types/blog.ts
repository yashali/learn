export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  content: string
  author: string
  coverImage?: string
  readingTime: string
  slug: string
}

export interface BlogMetadata {
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: string
  coverImage?: string
  readingTime: string
  slug: string
} 