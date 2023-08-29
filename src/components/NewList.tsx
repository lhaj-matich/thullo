import { VStack } from "@chakra-ui/react";
import { useState } from "react";

import InsertButton from "./Button/InsertButton";
import InsertCard from "./Card/InsertCard";
import apiClient from "../services/apiClient";
import useBoard from "../hooks/useBoard";

interface NewListProps {
  id: string | undefined;
  first: boolean;
}

const NewList = ({ id, first }: NewListProps) => {
  const { setBoard, board } = useBoard();
  const listClient = new apiClient("/lists");
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const addListItem = () => {
    if (!value) return;
    listClient.postData({ name: value, boardId: id }).then((res) => {
      setBoard({ ...board, lists: [...(board.lists || []), res.data.list] });
      setVisible(false);
      setValue("");
    });
  };

  return (
    <VStack marginTop={5}>
      <InsertCard
        value={value}
        onInsert={setValue}
        onSave={addListItem}
        setVisibility={setVisible}
        visibility={visible}
        placeHolder="Enter list name"
      />
      <InsertButton
        onClick={() => setVisible(true)}
        marginTop={visible ? 3 : 0}
        text={first ? "Add another list" : "Add new list"}
      />
    </VStack>
  );
};

export default NewList;
