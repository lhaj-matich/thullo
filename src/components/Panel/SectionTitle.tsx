import { HStack, Icon, Text } from "@chakra-ui/react";


interface SectionProps {
  title: string;
  icon: any;
}

const SectionTitle = ({title, icon}: SectionProps) => {
  return (
    <HStack marginY="15px">
      <Icon boxSize="18px" as={icon} color="#BDBDBD" />
      <Text variant="generic" fontWeight="600" fontSize="12px" color="#BDBDBD">
        {title}
      </Text>
    </HStack>
  );
};

export default SectionTitle;
