import { BoxProps, HStack, Icon, Text } from "@chakra-ui/react";


interface SectionProps extends BoxProps {
  title: string;
  icon: any;
}

const SectionTitle = ({title, icon, ...rest}: SectionProps) => {
  return (
    <HStack {...rest}>
      <Icon boxSize="18px" as={icon} color="#BDBDBD" />
      <Text variant="generic" fontWeight="600" fontSize="14px" color="#BDBDBD">
        {title}
      </Text>
    </HStack>
  );
};

export default SectionTitle;
