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
  useToast,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import VisibiltyButton from "../Button/VisibilityButton";
import PhotoSearch from "./PhotoSearch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import { Board } from "../BoardSearch";
import { useRef, useState } from "react";
import { createUnsplashLink } from "../../utils/loadUnsplashImage";

const NewBoard = () => {
  const boardsClient = new apiClient<Board>("/boards");
  const [visibility, setVisibility] = useState(false);
  const [imageId, setImageId] = useState("");
  const toast = useToast({ duration: 3000, status: "error", position: "top-right" });
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useMutation<Board, Error, Board>({
    mutationFn: (board: Board) => boardsClient.postData(board).then((res) => res.data.board),
    onSuccess: (savedBoard) => {
      queryClient.setQueriesData<Board[]>(["boards"], (boards) => [...(boards || []), savedBoard])
    },
    onError: () => {
      toast({ description: "Could not create board." });
    }
  });

  const sendBoardData = () => {
    // Check if the data is valid.
    if (!imageId) toast({ description: "Cover image is selected." });
    else if (!inputRef.current?.value) toast({ description: "Board title is required." });
    else {
      mutate({
        visibility: visibility,
        title: inputRef.current?.value,
        coverImage: imageId,
      });
      inputRef.current.value = "";
      onClose();
    }
  };

  // Add new board logic
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Icon as={AiOutlinePlus} />}>
        New board
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} variant="primary">
        <ModalOverlay />
        <ModalContent width="360px">
          <ModalCloseButton />
          <ModalBody paddingY={5}>
            <Image
              borderRadius={12}
              width={350}
              height={120}
              objectFit="cover"
              src={createUnsplashLink(imageId, 120, 360)}
              fallback={<Skeleton height={120} width={310} borderRadius={12} />}
            />
            <Input
              ref={inputRef}
              marginTop={3}
              variant="outline"
              type="text"
              placeholder="Add board title"
              border="1px solid #E0E0E0"
            />
            <HStack justifyContent="space-between" marginTop={5}>
              <VisibiltyButton onClick={(value) =>  setVisibility(!value)} />
              <PhotoSearch setImageId={setImageId} id={imageId} />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button marginRight={3} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={sendBoardData} leftIcon={<Icon as={AiOutlinePlus} />}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewBoard;
