import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { BlogPost } from '../types';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    // Fetch posts and extract unique years
    const fetchYears = async () => {
      try {
        const response = await fetch('/api/posts');
        const posts: BlogPost[] = await response.json();
        const uniqueYears = Array.from(
          new Set(posts.map(post => new Date(post.date).getFullYear()))
        ).sort((a, b) => b - a); // Sort in descending order
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    fetchYears();
  }, []);

  const handleYearClick = (year: number) => {
    setSelectedYear(year === selectedYear ? null : year);
    const searchParams = new URLSearchParams(location.search);
    if (year === selectedYear) {
      searchParams.delete('year');
    } else {
      searchParams.set('year', year.toString());
    }
    navigate({ search: searchParams.toString() });
  };

  return (
    <Box
      position={{ base: 'static', lg: 'sticky' }}
      top="8"
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">Timeline</Heading>
        <VStack spacing={2} align="stretch">
          {years.map(year => (
            <Button
              key={year}
              variant={selectedYear === year ? 'solid' : 'ghost'}
              colorScheme={selectedYear === year ? 'blue' : 'gray'}
              justifyContent="flex-start"
              onClick={() => handleYearClick(year)}
            >
              {year}
            </Button>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar; 