import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ReceivedInvitesList from "./ReceivedInvitesList";
import SentInvitesList from "./SendInvitesList";

const Invites = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#828282">Invites</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="soft-rounded" colorScheme="gray">
              <TabList>
                <Tab>Received</Tab>
                <Tab>Sent</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ReceivedInvitesList />
                </TabPanel>
                <TabPanel>
                  <SentInvitesList />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Invites;
