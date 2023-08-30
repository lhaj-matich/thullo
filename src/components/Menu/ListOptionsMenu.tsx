import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

interface ListOptionsProps {
  isEditing: boolean;
  onRename: (value: boolean) => void;
  onDelete: () => void;
}

const ListOptionsMenu = ({ onDelete, onRename, isEditing }: ListOptionsProps) => {
  if (isEditing)
    return null;
  return (
    <Menu>
      <MenuButton variant="ghost" padding={2} as={IconButton} icon={<Icon boxSize="24px" as={BsThreeDots} />} />
      <MenuList color="#828282" padding={2} borderRadius={12} fontSize="14px">
        <MenuItem borderRadius={12} onClick={() => onRename(true)}>
          Rename
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={onDelete} borderRadius={12}>Delete this list</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ListOptionsMenu;
