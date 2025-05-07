import { Box, VStack, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Text, Spinner, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useBlogs } from './BlogProvider';

const Sidebar = () => {
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();

  // Group posts by year
  const postsByYear = useMemo(() => {
    const groups: { [year: string]: typeof blogs } = {};
    blogs.forEach(post => {
      const year = new Date(post.date).getFullYear().toString();
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    // Sort years descending
    return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [blogs]);

  if (loading) {
    return (
      <Center minH="40vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Box
      position={{ base: 'static', lg: 'sticky' }}
      top="8"
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      minW="250px"
      maxW="300px"
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">Timeline</Heading>
        <Accordion allowMultiple={false} defaultIndex={[]}>
          {postsByYear.map(([year, posts]) => (
            <AccordionItem key={year} border="none">
              <AccordionButton _expanded={{ bg: 'blue.50' }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {year}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={2}>
                <VStack align="stretch" spacing={1}>
                  {posts.map(post => (
                    <Button
                      key={post.id}
                      variant="ghost"
                      justifyContent="flex-start"
                      onClick={() => navigate(`/post/${post.slug}`)}
                      size="sm"
                      fontWeight="normal"
                      textAlign="left"
                      whiteSpace="normal"
                    >
                      {post.title}
                    </Button>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default Sidebar; 