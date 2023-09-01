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
  useToast,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { MdAttachFile, MdChecklist } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";

import { createUnsplashLink } from "../../utils/loadUnsplashImage";
import EditDescription from "../Panel/EditDescription";
import AttachementMenu from "../Menu/AttachementMenu";
import AttachmentsList from "../List/AttachmentsList";
import ListIndicator from "../Nav/ListIndicator";
import SectionTitle from "../Panel/SectionTitle";
import CommentsList from "../List/CommentsList";
import { Card } from "../../config/entities";
import CheckList from "../List/CheckList";
import Labels from "../Labels";
import EditTitle from "../EditTitle";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";

interface CardModalProps {
  card: Card;
  opened: boolean;
  onClose: () => void;
}

const cardDescription = `Ideas are created and share here through a card. 
Here you can describe what you'd like to accomplish.
For example you can follow three simple questions to create the card related to your idea:

  * Why  ? (Why do you wish to do it ?)
  * What ? (What it  is it, what are the goals, who is concerned)
  * How  ? (How do you think you can do it ? What are the required steps ?)

After creation, you can move your card to the todo list.`;

const cardTitle = "✋🏿 Move anything that is actually started here";

const CardModal = ({ card, opened, onClose }: CardModalProps) => {
  const queryClient = useQueryClient();
  const cardClient = new apiClient(`/cards/${card.id}`);
  const toast = useToast({duration: 2000, position: "top-right", status: "error"})

  // const EditCardTitle = (value: string) => {
  //   cardClient
  //   .updateData({ title: value }, null)
  //   .then(() => {
  //       queryClient.setQueryData<Card>()
  //   })
  //   .catch((e) => toast({ description: e.response.data.message }));
  // }


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
            src={createUnsplashLink("", 500, 800)}
          />
          <HStack alignItems="flex-start" marginTop={4}>
            <Box width="75%">
              <EditTitle marginBottom={2} title={cardTitle} edit={true} clickCB={() => console.log("console.log")} />
              <ListIndicator name="Progress" marginBottom={8} />
              <EditDescription
                edit={true}
                description={cardDescription}
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
              <Labels cardId={card.id} />
              {/* <PhotoSearch /> */}
              <AttachementMenu />
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
