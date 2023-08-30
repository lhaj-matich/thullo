import { Text, Box, Input, InputGroup, HStack, Button, InputRightElement, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import ListOptionsMenu from "../Menu/ListOptionsMenu";
import apiClient from "../../services/apiClient";

interface ListHeaderProps {
  name: string;
  id: string;
}

const ListHeader = ({ name, id }: ListHeaderProps) => {
  const [value, setValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const listClient = new apiClient(`/lists/${id}`);
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });

  //? Update list logic
  const updateListName = (newListName: string) => {
    if (!newListName) return;
    listClient
      .updateData({ name: newListName }, null)
      .then(() => {
        setIsEditing(false);
        setValue(newListName);
      })
      .catch(() => {
        toast({ description: "Could not update list." });
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
          {value}
        </Text>
      </Box>
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
            defaultValue={value}
          />
          <InputRightElement width="4rem" marginRight={1}>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setValue(name);
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
    <HStack width="350px" fontSize="20px" defaultValue="Backlog (sans)" justifyContent="center" alignItems="center">
      <ListNamePreview />
      <ListNameInput />
      <ListOptionsMenu isEditing={isEditing} onRename={setIsEditing} />
    </HStack>
  );
};

export default ListHeader;
