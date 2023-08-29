import { Text, Box, Input, InputGroup, HStack, Button, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import ListOptionsMenu from "../Menu/ListOptionsMenu";
import apiClient from "../../services/apiClient";

interface ListHeaderProps {
  name: string;
  id: string;
}

const ListHeader = ({ name, id }: ListHeaderProps) => {
  const [value, setValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const listClient = new apiClient("/lists");
  //? Update list logic
  const updateListName = () => {
    
  }

  //! Should handle on enter key should submit the data

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
            onBlur={(e) => {
              setValue(e.target.value);
              setIsEditing(false);
            }}
            defaultValue={value}
          />
          <InputRightElement width="4rem" marginRight={1}>
            <Button h="1.75rem" size="sm" onClick={() => setIsEditing(false)}>
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
