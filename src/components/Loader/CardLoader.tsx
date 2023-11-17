import { Skeleton, HStack, VStack } from "@chakra-ui/react";

interface LoaderProps {
  image: boolean;
}

const Loader = ({ image }: LoaderProps) => {
  return (
    <VStack backgroundColor="#fff" borderRadius="16px" padding="5" width="320px" alignItems="flex-start">
      {image && <Skeleton height="200px" width="100%" borderRadius="24px" endColor="#E8EBED" />}
      <Skeleton height="20px" width="100%" borderRadius={12} endColor="#E8EBED" />
      <HStack flexDirection={Math.floor(Math.random() * 2) === 1 ? "row" : "row-reverse"} marginTop={3} marginBottom={2}>
        <Skeleton width="60px" height="25px" borderRadius={12} endColor="#E8EBED" />
        <Skeleton width="78px" height="25px" borderRadius={12} endColor="#E8EBED" />
      </HStack>
      <Skeleton width="45px" height="45px" borderRadius={12} endColor="#E8EBED" />
    </VStack>
  );
};

const CardLoader = () => {
  const result = Math.floor(Math.random() * 2);
  return (
    <HStack flexDirection={result === 1 ? "column" : "column-reverse"}>
      <Loader image={false} />
      <Loader image={true} />
    </HStack>
  );
};

export default CardLoader;
