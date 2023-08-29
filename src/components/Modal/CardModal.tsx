import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  Image,
  HStack,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { createUnsplashLink } from "../../utils/loadUnsplashImage";
import EditDescription from "../Panel/EditDescription";
import SectionTitle from "../Panel/SectionTitle";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdAttachFile, MdChecklist } from "react-icons/md";
import Labels from "../Labels";
import PhotoSearch from "./PhotoSearch";
import ListIndicator from "../Nav/ListIndicator";
import AttachmentsList from "../List/AttachmentsList";
import AttachementMenu from "../Menu/AttachementMenu";
import CheckList from "../List/CheckList";
import CommentCard from "../Card/CommentCard";
import CommentsList from "../List/CommentsList";

interface CardModalProps {
  opened: boolean;
  onClose: () => void;
}

const cardDescription = `Ideas are created and share here through a card. 
Here you can describe what you'd like to accomplish.
For example you can follow three simple questions to create the card related to your idea:

  * Why  ? (Why do you wish to do it ?)
  * What ? (What it  is it, what are the goals, who is concerned)
  * How  ? (How do you think you can do it ? What are the required steps ?)

After creation, you can move your card to the todo list.`


const CardModal = ({ opened, onClose }: CardModalProps) => {


  
  return (
    <Modal size="3xl" variant="primary" closeOnOverlayClick={false} isOpen={opened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="12px">
        <ModalCloseButton />
        <ModalBody padding={5}>
          <Image
            objectFit="cover"
            width="100%"
            height="150px"
            borderRadius="12px"
            src={createUnsplashLink("G85VuTpw6jg", 500, 800)}
          />
          <HStack alignItems="flex-start" marginTop={4}>
            <Box width="75%">
              <Heading marginY={5} marginBottom={3} fontWeight={400} variant="generic">
                ✋🏿 Move anything that is actually started here
              </Heading>
              <ListIndicator name="Progress" marginBottom={8} />
              <EditDescription
                edit={true}
                value={cardDescription}
                clickCB={(value) => console.log(value)}
                height="300px"
              />
              <Tabs variant="soft-rounded" colorScheme="gray" marginTop={3}>
                <TabList>
                  <Tab>
                    <SectionTitle title="Attachements" icon={MdAttachFile} />
                  </Tab>
                  <Tab>
                    <SectionTitle title="Checklist" icon={MdChecklist} />
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <AttachmentsList />
                  </TabPanel>
                  <TabPanel>
                    <CheckList />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <CommentsList />
            </Box>
            <VStack marginTop={4} width="25%" alignItems="flex-start" gap={3}>
              <SectionTitle title="Actions" icon={BiSolidUserCircle} />
              <Labels />
              <PhotoSearch />
              <AttachementMenu />
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
