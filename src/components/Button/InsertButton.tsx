import { Button, ButtonProps, Icon, Text } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";

interface InsertButtonProps extends ButtonProps {
  text: string;
}

const InsertButton = ({ text, ...rest }: InsertButtonProps) => {
  return (
    <Button
      {...rest}
      width="340px"
      display="flex"
      paddingY={3}
      marginBottom={2}
      justifyContent="space-between"
      color="primary"
      backgroundColor="#DAE4FD"
      _hover={{ color: "#fff", bg: "primary" }}
    >
      <Text variant="generic">{text}</Text>
      <Icon as={BsPlusLg} boxSize="20px" />
    </Button>
  );
};

export default InsertButton;
