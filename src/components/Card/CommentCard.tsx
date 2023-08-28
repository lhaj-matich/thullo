import { Avatar, Box, Button, HStack, Textarea, useStyleConfig } from "@chakra-ui/react";
import useBoard from "../../hooks/useBoard";
import { createImageLink } from "../../utils/loadImage";

const CommentCard = () => {
  const { board } = useBoard();
  const styles = useStyleConfig("BoxStyle", { variant: "cardContainer" });
  return (
    <Box __css={styles} position="relative" width="100%" padding={3}>
      <HStack alignItems="flex-start">
        <Avatar
          marginRight="5px"
          color="white"
          bgColor="#BDBDBD"
          boxSize="39px"
          borderRadius="10px"
          src={createImageLink(board.author?.profileImage)}
          name={board.author?.fullname}
        />
        <Textarea variant="generic" border="none" rows={2} placeholder="Writa a comment"></Textarea>
      </HStack>
      <HStack justifyContent="flex-end">
        <Button paddingY={2} variant="generic" borderRadius="12px">Comment</Button>
      </HStack>
    </Box>
  );
};

export default CommentCard;
