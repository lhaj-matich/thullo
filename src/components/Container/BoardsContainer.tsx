import { Box, Heading, HStack, Button } from "@chakra-ui/react"

const BoardsContainer = () => {
  return (
    <Box>
        <HStack>
            <Heading>All Boards</Heading>
            <Button>+ Add</Button>
        </HStack>
    </Box>
  )
}

export default BoardsContainer