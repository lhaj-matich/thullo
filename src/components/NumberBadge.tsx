import { HStack, Text, Icon } from "@chakra-ui/react";

interface BadgeProps {
  icon: any;
  count: number;
}

const NumberBadge = ({ icon, count }: BadgeProps) => {
  return (
    <HStack color="#BDBDBD" alignContent="center" gap={1}>
      <Icon as={icon} boxSize="16px" />
      <Text fontSize="15px" letterSpacing="-0.35px">
        {count}
      </Text>
    </HStack>
  );
};

export default NumberBadge;
