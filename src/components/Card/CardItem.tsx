import { HStack } from "@chakra-ui/react";
import GenericCard from "./GenericCard";
import LabelsList from "../List/LabelsList";
import UserGroupList from "../List/UserGroupList";
import useBoard from "../../hooks/useBoard";
import NumberBadge from "../NumberBadge";
import { MdInsertComment, MdAttachFile } from "react-icons/md";

interface CardItemProps {
  onClick: () => void;
}

const CardItem = ({onClick}: CardItemProps) => {
  const { board } = useBoard();
  return (
    <GenericCard marginBottom={5} image="G85VuTpw6jg" clickCB={onClick} title="The weird card that">
      <LabelsList />
      <HStack marginTop={4} justifyContent="space-between">
        <UserGroupList max={3} users={[...(board?.author ? [board.author] : []), ...(board?.users || [])]} />
        <HStack>
          <NumberBadge icon={MdInsertComment} count={3} />
          <NumberBadge icon={MdAttachFile} count={5} />
        </HStack>
      </HStack>
    </GenericCard>
  );
};

export default CardItem;
