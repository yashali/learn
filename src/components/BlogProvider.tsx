import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import fm from 'front-matter';

export interface BlogPostMeta {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
  slug: string;
}

interface BlogContextType {
  blogs: BlogPostMeta[];
  loading: boolean;
}

const BlogContext = createContext<BlogContextType>({ blogs: [], loading: true });

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const importBlogs = async () => {
      // Import all markdown files in content/posts
      const modules = import.meta.glob('/content/posts/*.md', { as: 'raw' });
      const blogEntries: BlogPostMeta[] = [];
      for (const path in modules) {
        const raw = await modules[path]();
        const parsed = fm(raw);
        const data = parsed.attributes as any;
        const content = parsed.body;
        // Generate slug from filename
        const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';
        blogEntries.push({
          id: slug,
          title: data.title || slug,
          excerpt: data.excerpt || '',
          date: data.date || '',
          tags: data.tags || [],
          content,
          slug,
        });
      }
      // Sort by date descending
      blogEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setBlogs(blogEntries);
      setLoading(false);
    };
    importBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogContext); 