import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  onSearch?: (query: string) => void
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const navigate = useNavigate()

  return (
    <Box w="100%" bg="gray.100" py={4} px={8}>
      <InputGroup maxW="600px" mx="auto">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search blogs..."
          bg="white"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </InputGroup>
    </Box>
  )
}

export default Navbar 