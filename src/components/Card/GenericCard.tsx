import { Box, BoxProps, Heading, Image, Skeleton, useStyleConfig } from "@chakra-ui/react";
import { ReactNode } from "react";
import { createUnsplashLink } from "../../utils/loadUnsplashImage";

interface GenericCardProps extends BoxProps {
  clickCB: () => void;
  image: string;
  title: string;
  children: ReactNode;
}

const GenericCard = ({ clickCB, image, title, children, ...rest }: GenericCardProps) => {
  const styles = useStyleConfig("BoxStyle", { variant: "genericCard" });
  return (
    <Box onClick={clickCB} padding={4} __css={styles} {...rest}>
      {image && (
        <Image
          borderRadius={20}
          src={createUnsplashLink(image, 600, 400)}
          fallback={<Skeleton height="200px" width="300px" borderRadius={20} />}
          width="300px"
          height="200px"
          objectFit="cover"
        />
      )}
      <Heading marginTop={3} variant="secondary" fontSize="20px">
        {title}
      </Heading>
      <Box marginTop={4}>{children}</Box>
    </Box>
  );
};

export default GenericCard;
