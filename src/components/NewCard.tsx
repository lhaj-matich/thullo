import { VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";

import InsertButton from "./Button/InsertButton";
import InsertCard from "./Card/InsertCard";
import apiClient from "../services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "../config/entities";

interface NewCardProps {
  listId: string | undefined;
  first: boolean;
}

const NewCard = ({ listId, first }: NewCardProps) => {
  const cardClient = new apiClient("/cards");
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const addListItem = () => {
    if (!value) return;
    cardClient
      .postData({ title: value, listId })
      .then((res: any) => {
        queryClient.setQueryData<Card[]>(["cards", listId], (cards) => [res.data.card, ...(cards || [])]);
        setVisible(false);
        setValue("");
      })
      .catch(() => toast({ description: "Could not create card" }));
  };

  return (
    <VStack>
      <InsertCard
        value={value}
        onInsert={setValue}
        onSave={addListItem}
        setVisibility={setVisible}
        visibility={visible}
        placeHolder="Enter card name"
      />
      <InsertButton
        onClick={() => setVisible(true)}
        marginTop={visible ? 3 : 0}
        text={first ? "Add new card" : "Add another card"}
      />
    </VStack>
  );
};

export default NewCard;
