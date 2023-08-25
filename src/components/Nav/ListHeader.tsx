import { Text, Box, Input, HStack, IconButton, Icon } from "@chakra-ui/react";
import { useState } from "react";
import ListOptionsMenu from "../Menu/ListOptionsMenu";
import { IoCloseOutline } from 'react-icons/io5';

const ListHeader = () => {
  const [value, setValue] = useState("Backlog 🤔");
  const [isEditing, setIsEditing] = useState(false);

  //! Should handle on enter key should submit the data

  const ListNamePreview = () => {
    if (isEditing) return null;
    return (
      <Box className="description" paddingY={2} paddingX={6} display="flex">
        <Text width="250px" variant="generic" fontSize="20px">{value}</Text>
      </Box>
    );
  };

  const ListNameInput = () => {
    if (!isEditing) return null;
    return (
      <HStack className="description" justifyContent="center">
        <Input
          width="325px"
          margin={0}
          type="text"
          border="1px solid #BDBDBD"
          variant="outline"
          onBlur={(e) => {
            setValue(e.target.value);
            setIsEditing(false);
          }}
          defaultValue={value}
        />
        {/* <IconButton padding="5px" icon={<Icon as={IoCloseOutline} boxSize="34px" color="#fff" />} onClick={() => setIsEditing(false)} aria-label={"Close rename input"} /> */}
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
