import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import theme from './theme'
import { BlogProvider } from './components/BlogProvider'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BlogProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:slug" element={<BlogPost />} />
          </Routes>
        </Router>
      </BlogProvider>
    </ChakraProvider>
  )
}

export default App
