import { KeyboardEvent } from "react";
import apiClient from "../../services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { HStack, Heading, Link, Textarea, VStack, useToast } from "@chakra-ui/react";
import { Card, Comment } from "../../config/entities";
import { useRef } from "react";

interface CommentEditProps {
  listId: string;
  mode: "DISPLAY" | "EDIT";
  commentData: Comment;
  setMode: (value: boolean) => void;
}

const CommentContent = ({ commentData, mode, listId, setMode }: CommentEditProps) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast({duration: 2000, position: "top-left"});

  const handleEditComment = (commentId: string) => {
    if (inputRef && inputRef.current && inputRef.current.value) {
      const commentsClient = new apiClient(`comments/${commentId}`);
      const commentContent = inputRef.current.value;
      queryClient.setQueryData<Card[]>(["lists", listId, "cards"], (cards) =>
          cards?.map((card) => {
            if (card.id === commentData.cardId) {
              return {
                ...card,
                comments: card.comments?.map((comment) => {
                  if (comment.id === commentId) {
                    return {
                      ...comment,
                      content: commentContent,
                    };
                  }
                  return comment;
                }),
              };
            }
            return card;
          })
        );
      setMode(false);
      commentsClient.updateData({ content: inputRef.current.value }, {}).catch(() => toast({
        description: 'Error deleting updating comment',
        status: 'error'
      }))
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleEditComment(commentData.id);
    }
  };

  return mode === "EDIT" ? (
    <VStack alignItems="flex-start">
      <Textarea
        variant="generic"
        rows={2}
        defaultValue={commentData.content}
        placeholder="Edit your comment"
        minWidth={460}
        fontWeight={400}
        fontSize="16px"
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <HStack paddingX={3}>
        <Link
          fontSize={15}
          color="#666666"
          _hover={{ textDecoration: "none" }}
          onClick={() => handleEditComment(commentData.id)}
        >
          Save
        </Link>
        <Link fontSize={15} color="#666666" _hover={{ textDecoration: "none" }} onClick={() => setMode(false)}>
          Cancel
        </Link>
      </HStack>
    </VStack>
  ) : (
    <Heading marginTop={2} variant="generic" fontWeight={400} fontSize="16px">
      {commentData.content}
    </Heading>
  );
};

export default CommentContent;
