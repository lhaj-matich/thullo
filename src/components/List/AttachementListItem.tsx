import { Avatar, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";

const AttachementListItem = () => {
  return (
    <HStack gap={4} marginY={3}>
      <Avatar backgroundColor="#BDBDBD" name="G A" borderRadius={12} height="80px" width="130px" />
      <VStack alignItems="flex-start">
        <Text variant="generic" fontSize="13px" color="#BDBDBD">Added July 5, 2020</Text>
        <Heading marginTop={-1} marginBottom={1} variant="generic" fontSize="15px">Reasonning by rangoanth krishamani</Heading>
        <HStack>
          <Button fontSize="14px" variant="outlinePrivate">Download</Button>
          <Button fontSize="14px" variant="outlinePrivate">Delete</Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default AttachementListItem;
