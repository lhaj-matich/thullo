import { HStack, Spinner, VStack } from "@chakra-ui/react";
import AttachementListItem from "./AttachementListItem";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import { Attachement } from "../../config/entities";

interface AttachementListProps {
  cardId: string;
  listId: string;
}

const AttachmentsList = ({ cardId, listId }: AttachementListProps) => {
  const attachementClient = new apiClient(`/cards/${cardId}/attachements`);

  const { data, isLoading } = useQuery<Attachement[]>({
    queryKey: ["attachements", cardId],
    queryFn: () => attachementClient.getData().then((res: any) => res.data.attachements),
    refetchOnWindowFocus: false
  });

  if (isLoading)
    return (
      <HStack justifyContent="center">
        <Spinner color="primary" />
      </HStack>
    );
  return (
    <VStack alignItems="flex-start" maxHeight="240px" overflowY="scroll">
      {data?.length !== 0 &&
        data?.map((attachement, index) => {
          return (
            <AttachementListItem
              attaid={attachement.id}
              cardId={cardId}
              listId={listId}
              key={index}
              title={attachement.title}
              file={attachement.path}
              date={attachement.createdAt}
            />
          );
        })}
    </VStack>
  );
};

export default AttachmentsList;
