import { Button, Heading, Menu, MenuButton, MenuList, Text, Center, Icon, HStack, Input } from "@chakra-ui/react";
import { MdAttachFile } from "react-icons/md";

const AttachementMenu = () => {
  return (
    <Menu>
      <MenuButton as={Button} variant="private" borderRadius="8px" paddingY="9px" paddingX="14px">
        <HStack width="150px" paddingLeft={2} justifyContent="flex-start">
          <Icon as={MdAttachFile} fontSize={15} />
          <Text>Attachements</Text>
        </HStack>
      </MenuButton>
      <MenuList padding={4} borderRadius="12px">
        <Heading letterSpacing="-0.42px" color="#4F4F4F" fontSize="19px" fontFamily="Poppins" fontWeight={600}>
          Attachements
        </Heading>
        <Text marginY={3} letterSpacing="-0.42px" color="#828282" fontSize="16px" fontFamily="Poppins" fontWeight={400}>
          Enter the name and select the file.
        </Text>
        <Input width="300px" type="text" variant="outline" placeholder="Display text" />
        <HStack>
          <Button leftIcon={<Icon as={MdAttachFile} />} variant="generic" onClick={() => console.log("Adding color")}>
            Select
          </Button>
          <Button variant="generic" onClick={() => console.log("Adding color")}>
            Insert
          </Button>
        </HStack>
      </MenuList>
    </Menu>
  );
};

export default AttachementMenu;
