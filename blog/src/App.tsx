import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/post/:slug" element={<BlogPost />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
