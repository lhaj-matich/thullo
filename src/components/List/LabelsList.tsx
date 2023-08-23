import { Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

const LabelsList = () => {
  return (
    <HStack spacing={3} maxWidth="300px" overflow="auto" _hover={{cursor: 'grab'}}>
      {Array(8)
        .fill(0)
        .map((size) => (
          <Badge>Default</Badge>
        ))}
    </HStack>
  );
};

export default LabelsList;
