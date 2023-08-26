import { Button, Icon, Text } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";

const InsertButton = () => {
  return (
    <Button
      width="100%"
      display="flex"
      paddingY={3}
      marginBottom={2}
      justifyContent="space-between"
      color="primary"
      backgroundColor="#DAE4FD"
      _hover={{ color: "#fff", bg: "primary" }}
    >
      <Text variant="generic">Add another card</Text>
      <Icon as={BsPlusLg} boxSize="20px" />
    </Button>
  );
};

export default InsertButton;
