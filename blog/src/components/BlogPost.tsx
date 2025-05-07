import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Button,
  Image,
  Link,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { BlogPost as BlogPostType } from '../types'
import type { Components } from 'react-markdown'

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Import your blog posts
import gettingStartedWithReact from '../../content/posts/getting-started-with-react.md?raw'

const posts: Record<string, BlogPostType> = {
  'getting-started-with-react': {
    id: '1',
    slug: 'getting-started-with-react',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and how to create your first application...',
    date: '2024-03-20',
    tags: ['react', 'javascript', 'web-development'],
    content: gettingStartedWithReact,
    author: 'Your Name',
    readingTime: '5 min read',
  },
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`)
        const data = await response.json()
        setPost(data)

        // Fetch markdown content
        const contentResponse = await fetch(`/posts/${slug}.md`)
        const markdownContent = await contentResponse.text()
        setContent(markdownContent)
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (!post) {
    return (
      <Box textAlign="center" py={10}>
        <Heading>Post not found</Heading>
        <Button
          leftIcon={<ArrowBackIcon />}
          mt={4}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    )
  }

  const components: Components = {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          alignSelf="flex-start"
          onClick={() => navigate('/')}
        >
          Back to Posts
        </Button>

        <VStack spacing={4} align="stretch">
          <Heading size="xl">{post.title}</Heading>
          <HStack>
            {post.tags.map((tag: string) => (
              <Tag key={tag} size="md" colorScheme="blue">
                {tag}
              </Tag>
            ))}
          </HStack>
          <HStack spacing={4} color="gray.500">
            <Text>{post.author}</Text>
            <Text>•</Text>
            <Text>{new Date(post.date).toLocaleDateString()}</Text>
            <Text>•</Text>
            <Text>{post.readingTime}</Text>
          </HStack>

          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              borderRadius="lg"
              w="100%"
              maxH="400px"
              objectFit="cover"
            />
          )}

          <Box className="markdown-content">
            <ReactMarkdown components={components}>
              {content}
            </ReactMarkdown>
          </Box>
        </VStack>
      </VStack>
    </Container>
  )
}

export default BlogPost 