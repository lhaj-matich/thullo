import { Checkbox, HStack, Heading } from '@chakra-ui/react'

interface TaskItemProps {
    taskname: string;
}

const CheckListItem = ({taskname}: TaskItemProps) => {
  return (
    <HStack padding={2} borderBottom="1px solid #F1F1F1" width="100%">
        <Checkbox />
        <Heading variant="generic" color="#000" fontWeight={500} fontSize="16px">{taskname}</Heading>
    </HStack>
  )
}

export default CheckListItem