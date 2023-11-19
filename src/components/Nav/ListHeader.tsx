import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Box,
  Input,
  InputGroup,
  HStack,
  Button,
  InputRightElement,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import ListOptionsMenu from "../Menu/ListOptionsMenu";
import apiClient from "../../services/apiClient";
import useBoard from "../../hooks/useBoard";

interface ListHeaderProps {
  name: string;
  id: string;
}

const ListHeader = ({ name, id }: ListHeaderProps) => {
  const { board, setBoard } = useBoard();
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const listClient = new apiClient(`/lists/${id}`);
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef(null);

  useEffect(() => {
    setValue(name);
  }, [name]);

  //? Delete list logic
  const DeleteListById = () => {
    const newLists = board.lists?.filter((list) => list.id !== id);
    listClient
      .deleteData()
      .then(() => {
        setBoard({ ...board, lists: newLists });
        onClose();
      })
      .catch((e) => {
        toast({ description: e.response.data.message });
      });
  };

  //? Update list logic
  const updateListName = (newListName: string) => {
    if (!newListName) return;
    listClient
      .updateData({ name: newListName }, null)
      .then(() => {
        setIsEditing(false);
        setValue(newListName);
      })
      .catch((e) => {
        toast({ description: e.response.data.message });
      });
  };

  const HandleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateListName(event.currentTarget.value);
    }
  };

  const ListNamePreview = () => {
    if (isEditing) return null;
    return (
      <Box className="description" paddingY={2} paddingX={6} display="flex">
        <Text width="250px" variant="generic" fontSize="20px">
          {value || name}
        </Text>
      </Box>
    );
  };

  const DeleteListConfirm = () => {
    return (
      <AlertDialog colorScheme="red" isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete List
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? All cards whithin this list will be deleted forever.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={DeleteListById}
                ml={3}
                variant="outlineRed"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  const ListNameInput = () => {
    if (!isEditing) return null;
    return (
      <HStack className="description" justifyContent="center">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            width="325px"
            margin={0}
            type="text"
            border="none"
            boxShadow="none"
            variant="outline"
            backgroundColor="#DFE4F6"
            onKeyDown={HandleEnter}
            defaultValue={value || name}
          />
          <InputRightElement width="4rem" marginRight={1}>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </InputRightElement>
        </InputGroup>
      </HStack>
    );
  };

  return (
    <HStack width="350px" fontSize="20px" justifyContent="center" alignItems="center">
      <DeleteListConfirm />
      <ListNamePreview />
      <ListNameInput />
      <ListOptionsMenu isEditing={isEditing} onDelete={onOpen} onRename={setIsEditing} />
    </HStack>
  );
};

export default ListHeader;
