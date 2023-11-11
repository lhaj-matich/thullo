import { HStack } from "@chakra-ui/react";
import GenericCard from "./GenericCard";
import LabelsList from "../List/LabelsList";
import UserGroupList from "../List/UserGroupList";
import NumberBadge from "../Nav/NumberBadge";
import { MdInsertComment, MdAttachFile } from "react-icons/md";
import { Card } from "../../config/entities";

interface CardItemProps {
  card: Card;
  onClick: () => void;
}

const CardItem = ({ card, onClick }: CardItemProps) => {
  return (
    <GenericCard marginBottom={5} image={card.coverImage || ""} clickCB={onClick} title={card.title}>
      <LabelsList deleteEnabled={false} cardId={card.id}/>
      <HStack marginTop={4} justifyContent="space-between">
        <UserGroupList max={3} users={[...(card?.author ? [card.author] : [])]} />
        <HStack>
          {card.comments?.length && <NumberBadge icon={MdInsertComment} count={card.comments?.length} />}
          {card.attachments?.length && <NumberBadge icon={MdAttachFile} count={card.attachments?.length} />}
        </HStack>
      </HStack>
    </GenericCard>
  );
};

export default CardItem;
