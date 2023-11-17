import { HStack, Skeleton, VStack } from "@chakra-ui/react";

const InviteLoader = () => {
  return (
    <HStack padding="10px" height="85px" width="100%" backgroundColor="#f1f1f1" borderRadius="12px" justifyContent="space-between">
      <Skeleton height="75px" width="75px" borderRadius="12px" />
      <VStack width="80%" alignItems="space-between" gap={4}>
        <Skeleton height="20px" width="80%" borderRadius="12px" />
        <Skeleton height="15px" width="80%" borderRadius="12px" />
      </VStack>
    </HStack>
  );
};

export default InviteLoader;
