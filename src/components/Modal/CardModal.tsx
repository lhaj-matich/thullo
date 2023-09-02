import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  HStack,
  VStack,
  Box,
  useToast,
  Skeleton,
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
import PhotoSearch from "./PhotoSearch";

interface CardModalProps {
  card: Card;
  opened: boolean;
  onClose: () => void;
}

const CardModal = ({ card, opened, onClose }: CardModalProps) => {
  const queryClient = useQueryClient();
  const cardClient = new apiClient(`/cards/${card.id}`);
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });

  const EditCardClient = (value: string, field: string) => {
    cardClient
      .updateData({ [field]: value }, null)
      .then(() => {
        queryClient.setQueryData<Card[]>(["lists", card.listId, "cards"], (cards) =>
          cards?.map((item) => {
            if (item.id === card.id) {
              return { ...item, [field]: value };
            }
            return item;
          })
        );
      })
      .catch((e) => toast({ description: e.response.data.message }));
  };

  return (
    <Modal size="3xl" variant="primary" closeOnOverlayClick={false} isOpen={opened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="12px">
        <ModalCloseButton />
        <ModalBody padding={5}>
          <Image
            fallback={<Skeleton width="100%" height="150px" borderRadius="12px" />}
            objectFit="cover"
            width="100%"
            height="150px"
            borderRadius="12px"
            src={createUnsplashLink(card.coverImage, 500, 1500)}
          />
          <HStack alignItems="flex-start" marginTop={4}>
            <Box width="75%">
              <EditTitle
                marginBottom={2}
                title={card.title}
                edit={true}
                clickCB={(value) => EditCardClient(value, "title")}
              />
              <ListIndicator name="Progress" marginBottom={3} />
              <EditDescription
                edit={true}
                description={card.description}
                clickCB={(value) => EditCardClient(value, "description")}
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
              <PhotoSearch id={card.coverImage || ""} setImageId={(id) => EditCardClient(id, "coverImage")} />
              <AttachementMenu />
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
