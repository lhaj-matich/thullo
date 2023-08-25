import { HStack, Text, VStack } from "@chakra-ui/react";
import GenericCard from "../Card/GenericCard";
import ListHeader from "../Nav/ListHeader";
import LabelsList from "./LabelsList";
import UserGroupList from "./UserGroupList";
import useBoard from "../../hooks/useBoard";
import InsertButton from "../Button/InsertButton";
import NumberBadge from "../NumberBadge";
import { MdInsertComment, MdAttachFile } from 'react-icons/md'

//! Should modify the generic card component to trucate text or not.

const CardsList = () => {
  const { board } = useBoard();
  return (
    <VStack alignItems="center" width="330px">
      <ListHeader />
      <GenericCard marginBottom={5} image="G85VuTpw6jg" clickCB={() => console.log("Hello")} title="The weird card that">
        <LabelsList />
        <HStack marginTop={4} justifyContent="space-between">
          <UserGroupList max={3} users={[...(board?.author ? [board.author] : []), ...(board?.users || [])]} />
          <HStack>
            <NumberBadge icon={MdInsertComment} count={3} />
            <NumberBadge icon={MdAttachFile} count={5} />
          </HStack>
        </HStack>
      </GenericCard>
      <InsertButton />
    </VStack>
  );
};

export default CardsList;
