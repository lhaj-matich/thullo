import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Box,
  Heading,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdLock } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import VisibilityMenuItem from "./VisibilityMenuItem";

const VisibilityMenu = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Menu>
      <MenuButton as={Button} variant="private">
        <HStack paddingX={2} >
          <Icon boxSize={5} as={visible ? IoEarth : IoMdLock} />
          <Text width="70px" fontSize={16}>{visible ? "Public" : "Private"}</Text>
        </HStack>
      </MenuButton>
      <MenuList padding={4} borderRadius={18}>
        <Box>
          <Heading variant="generic" color="grayDark">
            Visibilty
          </Heading>
          <Text variant="generic" color="grayLight">
            Choose who can see this board.
          </Text>
        </Box>
        <VisibilityMenuItem active={visible} ClickCB={() => setVisible(true)} icon={IoEarth} title="Public" description="Anyone on the internet can see this."/>
        <VisibilityMenuItem active={!visible} ClickCB={() => setVisible(false)} icon={IoMdLock} title="Private" description="Only board members can see this."/>
      </MenuList>
    </Menu>
  );
};

export default VisibilityMenu;
