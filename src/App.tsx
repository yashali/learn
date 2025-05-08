import { ChakraProvider, Flex, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import Sidebar from './components/Sidebar'
import theme from './theme'
import { BlogProvider } from './components/BlogProvider'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BlogProvider>
        <Router basename="/learn">
          <Flex minH="100vh" direction={{ base: 'column', lg: 'row' }}>
            <Box flexShrink={0}>
              <Sidebar />
            </Box>
            <Box flex="1" p={{ base: 4, lg: 8 }}>
              <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/post/:slug" element={<BlogPost />} />
              </Routes>
            </Box>
          </Flex>
        </Router>
      </BlogProvider>
    </ChakraProvider>
  )
}

export default App
