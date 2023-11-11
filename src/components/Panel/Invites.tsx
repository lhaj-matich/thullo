import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ReceivedInvitesList from "../List/ReceivedInvitesList";
import SentInvitesList from "../List/SendInvitesList";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Invites = ({ open, onClose }: ModalProps) => {
  return (
    <>
      <Modal isOpen={open} onClose={onClose} size="md" variant="primary">
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
