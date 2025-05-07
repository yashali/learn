import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Input,
  Select,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  tags: string[]
}

// Temporary mock data - replace with your actual blog posts
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and how to create your first application...',
    date: '2024-03-20',
    tags: ['react', 'javascript', 'web-development'],
  },
  {
    id: '2',
    title: 'Understanding TypeScript',
    excerpt: 'A comprehensive guide to TypeScript and its features...',
    date: '2024-03-19',
    tags: ['typescript', 'javascript'],
  },
]

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const navigate = useNavigate()

  const allTags = Array.from(new Set(mockPosts.flatMap(post => post.tags)))

  useEffect(() => {
    let filteredPosts = mockPosts

    if (searchQuery) {
      filteredPosts = filteredPosts.filter(
        post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedTag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.includes(selectedTag)
      )
    }

    setPosts(filteredPosts)
  }, [searchQuery, selectedTag])

  return (
    <VStack spacing={8} align="stretch">
      <HStack spacing={4}>
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          placeholder="Filter by tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {allTags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </Select>
      </HStack>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {posts.map(post => (
          <Box
            key={post.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            onClick={() => navigate(`/post/${post.id}`)}
            _hover={{ shadow: 'lg' }}
          >
            <VStack align="start" spacing={3}>
              <Heading size="md">{post.title}</Heading>
              <Text>{post.excerpt}</Text>
              <HStack>
                {post.tags.map(tag => (
                  <Tag key={tag} size="sm" colorScheme="blue">
                    {tag}
                  </Tag>
                ))}
              </HStack>
              <Text fontSize="sm" color="gray.500">
                {new Date(post.date).toLocaleDateString()}
              </Text>
            </VStack>
          </Box>
        ))}
      </Grid>
    </VStack>
  )
}

export default BlogList 