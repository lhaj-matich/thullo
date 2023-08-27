import { VStack } from "@chakra-ui/react"
import AttachementListItem from "./AttachementListItem"

const AttachmentsList = () => {
  return (
    <VStack alignItems="flex-start">
      <AttachementListItem />
      <AttachementListItem />
    </VStack>
  )
}

export default AttachmentsList