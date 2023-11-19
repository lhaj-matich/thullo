import { Avatar, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { createAttachementLink } from "../../utils/loadImage";

import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { Attachement, Card } from "../../config/entities";
import apiClient from "../../services/apiClient";

interface AttachementItemProps {
  attaid: string;
  listId: string;
  cardId: string;
  title: string;
  date: string;
  file: string;
}

const AttachementListItem = ({ title, date, file, cardId, listId,  attaid }: AttachementItemProps) => {
  const queryClient = useQueryClient();
  const attachementClient = new apiClient("/attachements");

  const handleDeleteAttachement = (id: string) => {
    attachementClient.deleteData(`/${id}`).then(() => {
      queryClient.setQueryData<Attachement[]>(["attachements", cardId], (oldAttachement) =>
        oldAttachement?.filter((attachement) => attachement.id !== id)
      );
      queryClient.setQueryData<Card[]>(["lists", listId, "cards"], (cards) =>
      cards?.map((item) => {
        if (item.id === cardId) return { ...item, attachments: item.attachments?.filter((attachement) => attachement.id !== id) };
        return item;
      })
  );
    });
  };

  return (
    <HStack gap={4} marginY={3}>
      <Avatar
        backgroundColor="#BDBDBD"
        name={title}
        src={createAttachementLink(file) || ""}
        borderRadius={12}
        height="80px"
        width="130px"
      />
      <VStack alignItems="flex-start">
        <Text variant="generic" fontSize="13px" color="#BDBDBD">
          Added {moment(date).format("ll")}
        </Text>
        <Heading marginTop={-1} marginBottom={1} variant="generic" fontSize="15px">
          {title}
        </Heading>
        <HStack>
          <Button fontSize="14px" onClick={() => console.log("Download attachement: Feature is not implemented yet")} variant="outlinePrivate">
            Download
          </Button>
          <Button fontSize="14px" onClick={() => handleDeleteAttachement(attaid)} variant="outlinePrivate">
            Delete
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default AttachementListItem;
