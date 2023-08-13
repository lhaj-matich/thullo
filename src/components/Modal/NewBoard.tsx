import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Icon,
  Image,
  Input,
  HStack,
  Skeleton,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import VisibiltyButton from "../Button/VisibilityButton";
import PhotoSearch from "./PhotoSearch";

const NewBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose} variant="primary">
        <ModalOverlay />
        <ModalContent width="360px">
          <ModalCloseButton />
          <ModalBody paddingY={5}>
            <Image
              borderRadius={12}
              width={350}
              height={120}
              src="https://source.unsplash.com/Hyu76loQLdk/400x$120"
              fallback={<Skeleton height={120} width={310} borderRadius={12}/>}
            />
            <Input
              marginTop={3}
              variant="outline"
              type="text"
              placeholder="Add board title"
              border="1px solid #E0E0E0"
            />
            <HStack justifyContent="space-between" marginTop={5}>
              <VisibiltyButton onClick={() => console.log("Hello")} />
              <PhotoSearch />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button marginRight={3} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button leftIcon={<Icon as={AiOutlinePlus} />}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewBoard;
