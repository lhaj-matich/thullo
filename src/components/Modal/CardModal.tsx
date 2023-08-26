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
import { createUnsplashLink } from "../../utils/loadUnsplashImage";
import EditDescription from "../Panel/EditDescription";
import useBoard from "../../hooks/useBoard";
import SectionTitle from "../Panel/SectionTitle";
import { BiSolidUserCircle } from "react-icons/bi";
import Labels from "../Labels";
import PhotoSearch from "./PhotoSearch";
import ListIndicator from "../Nav/ListIndicator";

interface CardModalProps {
  opened: boolean;
  onClose: () => void;
}

const CardModal = ({ opened, onClose }: CardModalProps) => {
  const { board } = useBoard();
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
              <ListIndicator name="Progress" marginBottom={8}/>
              <EditDescription
                edit={true}
                value={board.description}
                clickCB={(value) => console.log(value)}
                height="300px"
              />
            </Box>
            <VStack marginTop={4} width="25%" alignItems="flex-start" gap={3}>
              <SectionTitle title="Actions" icon={BiSolidUserCircle} />
              <Labels />
              <PhotoSearch />
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
