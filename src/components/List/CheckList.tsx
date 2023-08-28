import { HStack, VStack, Input, Progress, Box, InputGroup, InputRightElement, IconButton, Icon, Text } from "@chakra-ui/react";
import CheckListItem from "./CheckListItem";
import { BsPlusLg } from "react-icons/bs";

const CheckList = () => {
  return (
    <VStack alignItems="flex-start">
      <VStack border="1px solid #E0E0E0" padding={4} borderRadius={12} boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.05)">
        <HStack borderRadius={12} backgroundColor="#fff">
          <InputGroup size="md">
            <Input variant="outline" pr="4rem" type="text" placeholder="Task, eg: Taking out the trash" />
            <InputRightElement width="3rem">
              <IconButton variant="primary" h="1.75rem" size="md" aria-label="Add task" icon={<Icon color="#fff" boxSize="18px" as={BsPlusLg} />} />
            </InputRightElement>
          </InputGroup>
        </HStack>
        <Box width="100%">
          <Text variant="generic" color="#828282" marginBottom={1} fontSize="14px" fontWeight={500}>Completed: 66%</Text>
          <Progress color="primary" size="md" value={66} borderRadius={12} />
        </Box>
      </VStack>
      <CheckListItem taskname="Taking out the trash" />
      <CheckListItem taskname="Taking the kids to school" />
      <CheckListItem taskname="Buying groceries" />
    </VStack>
  );
};

export default CheckList;
