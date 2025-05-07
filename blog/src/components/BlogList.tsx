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
  Button,
  Flex,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useBlogs } from './BlogProvider'

const POSTS_PER_PAGE = 10

const BlogList = () => {
  const { blogs, loading } = useBlogs()
  const [posts, setPosts] = useState(blogs)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  // All tags from all blogs
  const allTags = Array.from(new Set(blogs.flatMap(post => post.tags)))

  useEffect(() => {
    let filteredPosts = blogs

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
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedTag, blogs])

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <Center minH="80vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <VStack spacing={8} align="stretch" minH="80vh">
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
        {currentPosts.map(post => (
          <Box
            key={post.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            onClick={() => navigate(`/post/${post.slug}`)}
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

      {/* Pagination Controls */}
      <Flex justify="center" mt={8} gap={2}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1 || totalPages === 0}
          variant="outline"
        >
          Previous
        </Button>
        {totalPages > 0 ? (
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              colorScheme={currentPage === page ? 'blue' : 'gray'}
              variant={currentPage === page ? 'solid' : 'outline'}
              isDisabled={totalPages === 1}
            >
              {page}
            </Button>
          ))
        ) : (
          <Button isDisabled variant="outline">1</Button>
        )}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages || totalPages === 0}
          variant="outline"
        >
          Next
        </Button>
      </Flex>
    </VStack>
  )
}

export default BlogList 