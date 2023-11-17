import { Avatar, Box, Button, HStack, Textarea, useStyleConfig, useToast } from "@chakra-ui/react";
import { createImageLink } from "../../utils/loadImage";
import apiClient from "../../services/apiClient";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "../../config/entities";
import useAuth from "../../hooks/useAuth";

interface CommentCardProps {
  cardId: string;
  listId: string;
}

const CommentCard = ({ cardId, listId }: CommentCardProps) => {
  const { auth} = useAuth();
  const styles = useStyleConfig("BoxStyle", { variant: "cardContainer" });
  const commentsClient = new apiClient("/comments");
  const toast = useToast({ position: "top-right", status: "error", duration: 2000 });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const addNewComment = () => {
    if (inputRef.current && inputRef.current.value) {
      setLoading(true);
      commentsClient
        .postData({ cardId, content: inputRef.current.value })
        .then((res: any) => {
          queryClient.setQueryData<Card[]>(["lists", listId, "cards"], (cards) =>
            cards?.map((item) => {
              if (item.id === cardId) return { ...item, comments: [...(item.comments || []), res.data.comment] };
              return item;
            })
          );
          if (inputRef.current) inputRef.current.value = "";
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          toast({ description: e.response.data.message });
        });
    }
  };

  return (
    <Box __css={styles} position="relative" width="100%" padding={3}>
      <HStack alignItems="flex-start">
        <Avatar
          marginRight="5px"
          color="white"
          bgColor="#BDBDBD"
          boxSize="39px"
          borderRadius="10px"
          src={createImageLink(auth.user?.profileImage)}
          name={auth.user?.fullname}
        />
        <Textarea isDisabled={loading} ref={inputRef} variant="generic" border="none" rows={2} placeholder="Writa a comment"></Textarea>
      </HStack>
      <HStack justifyContent="flex-end">
        <Button isLoading={loading} isDisabled={loading} paddingY={2} variant="generic" borderRadius="12px" onClick={addNewComment}>
          Comment
        </Button>
      </HStack>
    </Box>
  );
};

export default CommentCard;
