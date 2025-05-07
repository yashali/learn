import matter from 'gray-matter'
import { BlogMetadata } from '../types/blog'

export function parseMarkdown(content: string) {
  const { data, content: markdownContent } = matter(content)
  return {
    metadata: data as BlogMetadata,
    content: markdownContent,
  }
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
} 