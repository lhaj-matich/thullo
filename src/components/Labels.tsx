import { useState } from "react";
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Center,
  Icon,
  HStack,
  Input,
} from "@chakra-ui/react";
import { MdLabel } from 'react-icons/md';
import ColorsList from "./List/ColorsList";
import SectionTitle from "./Panel/SectionTitle";
import LabelsList from "./List/LabelsList";

const Labels = () => {
  return (
    <Menu>
      <MenuButton as={Button} variant="private" borderRadius="8px" paddingY="9px" paddingX="14px">
          <HStack width="130px" justifyContent="center">
            <Icon as={MdLabel} fontSize={15} />
            <Text>Label</Text>
          </HStack>
      </MenuButton>
      <MenuList padding={4} borderRadius={12}>
        <Heading letterSpacing="-0.42px" color="#4F4F4F" fontSize="19px" fontFamily="Poppins" fontWeight={600}>
          Label
        </Heading>
        <Text marginY={3} letterSpacing="-0.42px" color="#828282" fontSize="16px" fontFamily="Poppins" fontWeight={400}>
          Enter the label and select a color
        </Text>
        <Input width="300px" type="text" variant="outline" placeholder="Label..."/>
        <ColorsList />
        <SectionTitle title="Available" icon={MdLabel} />
        <LabelsList />
        <Center marginTop={4}>
          <Button variant="generic" onClick={() => console.log("Adding color")}>
            Add
          </Button>
        </Center>
      </MenuList>
    </Menu>
  );
};

export default Labels;
