import { VStack } from "@chakra-ui/react";
import CommentListItem from "./CommentListItem";
import CommentCard from "../Card/CommentCard";
import { Card } from "../../config/entities";

interface CommentsListProps {
  cardData: Card;
}

const CommentsList = ({ cardData }: CommentsListProps) => {
  return (
    <VStack>
      <CommentCard cardId={cardData.id} listId={cardData.listId} />
      <VStack width="100%" maxHeight="280px" overflow="auto" paddingRight={3}>
        {cardData.comments?.map((comment, index) => (
          <CommentListItem key={index} commentData={comment} />
        ))}
      </VStack>
    </VStack>
  );
};

export default CommentsList;
