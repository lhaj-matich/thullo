import { Box, Heading, Image, Skeleton, useStyleConfig } from "@chakra-ui/react";
import { ReactNode } from "react";
import { truncateText } from "../../utils/truncateText";
import { createUnsplashLink } from "../../utils/loadUnsplashImage";

interface GenericCardProps {
  clickCB: () => void;
  image: string;
  title: string;
  children: ReactNode;
}

const GenericCard = ({ clickCB, image, title, children }: GenericCardProps) => {
  const styles = useStyleConfig("BoxStyle", { variant: "genericCard" });
  return (
    <Box onClick={clickCB} padding={4} __css={styles}>
      <Image
        borderRadius={20}
        src={createUnsplashLink(image, 300, 200)}
        fallback={<Skeleton height="200px" width="300px" />}
        width="300px"
        height="200px"
        objectFit="cover"
      />
      <Heading marginTop={3} variant="generic" fontWeight="500">
        {truncateText(title, 24)}
      </Heading>
      <Box marginY={4}>{children}</Box>
    </Box>
  );
};

export default GenericCard;
