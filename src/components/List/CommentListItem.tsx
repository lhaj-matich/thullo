import { HStack, VStack, Box, Link } from "@chakra-ui/react";
import UserInfo from "./UserInfo";
import moment from "moment";
import { Card, Comment } from "../../config/entities";
import useAuth from "../../hooks/useAuth";
import apiClient from "../../services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CommentContent from "./CommentContent";

interface CommentItemProps {
  commentData: Comment;
  listId: string;
}

const CommentListItem = ({ commentData: comment, listId }: CommentItemProps) => {
  const { auth } = useAuth();
  const commentsClient = new apiClient("comments");
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);

  const handleDeleteComment = (commentId: string) => {
    commentsClient.deleteData(`/${commentId}`).then(() => {
      queryClient.setQueryData<Card[]>(["lists", listId, "cards"], (cards) =>
        cards?.map((card) => {
          if (card.id === comment.cardId) {
            return { ...card, comments: card.comments?.filter((comment) => comment.id !== commentId) };
          }
          return card;
        })
      );
    });
  };

  return (
    <VStack
      width="100%"
      alignItems="flex-start"
      padding={3}
      marginBottom={2}
      borderBottom="1px solid #F1F1F1"
      _hover={{
        "& .CommentEditBox": {
          visibility: "visible",
        },
      }}
    >
      <HStack width="100%" justifyContent="space-between" alignItems="flex-start">
        <UserInfo
          image={comment.user?.profileImage}
          name={comment.user?.fullname}
          creationDate={moment(comment.createdAt).format("D MMMM [at] h:mm")}
        />
        {auth.user?.id === comment.userId ? (
          <Box className="CommentEditBox">
            <Link margin={1} onClick={() => setEdit(true)}>
              Edit
            </Link>
            -
            <Link margin={1} onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </Link>
          </Box>
        ) : (
          ""
        )}
      </HStack>
      <CommentContent listId={listId} commentData={comment} mode={edit ? "EDIT" : "DISPLAY"} setMode={setEdit} />
    </VStack>
  );
};

export default CommentListItem;
