export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  tags: string[];
  author: string;
  readingTime: string;
  coverImage?: string;
  content?: string;
} 