import { BoxProps, HStack, Heading } from "@chakra-ui/react";

interface ListIndicatorProps extends BoxProps {
  name: string;
}

const ListIndicator = ({ name, ...rest }: ListIndicatorProps) => {
  return (
    <HStack {...rest}>
      <Heading variant="generic" fontSize="15px" color="#BDBDBD">in list</Heading>
      <Heading variant="generic" fontSize="16px">{name}</Heading>
    </HStack>
  );
};

export default ListIndicator;
