import {
  MenuItem,
  HStack,
  Text,
  Icon,
  VStack,
} from "@chakra-ui/react";

interface MenuItemProps {
  ClickCB: () => void;
  active: boolean;
  icon: any;
  title: string;
  description: string;
}

const VisibilityMenuItem = ({ icon, title, description, active, ClickCB }: MenuItemProps) => {
  return (
    <MenuItem padding={4} marginY={3} backgroundColor={active ? "#F2F2F2" : "#fff"} borderRadius={12} onClick={ClickCB}>
      <VStack alignItems="flex-start">
        <HStack color="grayDark">
          <Icon boxSize={4} as={icon} />
          <Text variant="generic" fontWeight={500}>
            {title}
          </Text>
        </HStack>
        <Text variant="generic" fontSize="15px" color="grayLight">
          {description}
        </Text>
      </VStack>
    </MenuItem>
  );
};

export default VisibilityMenuItem;
