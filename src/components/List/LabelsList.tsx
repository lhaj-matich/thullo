import { HStack } from "@chakra-ui/react";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Badge } from "@chakra-ui/react";
import { COLORS } from "../../config/constants";

const LabelsList = () => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <HStack ref={ref} {...events} spacing={3} maxWidth="300px" overflow="hidden">
      {COLORS.map((color, index) => (
        <Badge
          key={index}
          fontFamily="poppins"
          textTransform="capitalize"
          fontWeight={500}
          borderRadius="full"
          paddingX="12px"
          paddingY="2px"
          backgroundColor={color.secondary}
          color={color.primary}
        >
          {color.name}
        </Badge>
      ))}
    </HStack>
  );
};

export default LabelsList;
