import { HStack } from "@chakra-ui/react";
import GenericCard from "./GenericCard";
import LabelsList from "../List/LabelsList";
import UserGroupList from "../List/UserGroupList";
import useBoard from "../../hooks/useBoard";
import NumberBadge from "../NumberBadge";
import { MdInsertComment, MdAttachFile } from "react-icons/md";
import { Card } from "../../config/entities";

interface CardItemProps {
  card: Card;
  onClick: () => void;
}

const CardItem = ({ card, onClick }: CardItemProps) => {
  const { board } = useBoard();
  return (
    <GenericCard marginBottom={5} image={card.coverImage || ""} clickCB={onClick} title={card.title}>
      <LabelsList deleteEnabled={false} cardId={card.id}/>
      <HStack marginTop={4} justifyContent="space-between">
        <UserGroupList max={3} users={[...(board?.author ? [board.author] : []), ...(board?.users || [])]} />
        <HStack>
          {card.comments?.length && <NumberBadge icon={MdInsertComment} count={3} />}
          {card.labels?.length && <NumberBadge icon={MdAttachFile} count={5} />}
        </HStack>
      </HStack>
    </GenericCard>
  );
};

export default CardItem;
