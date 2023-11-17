import { HStack, Icon, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Badge } from "@chakra-ui/react";
import apiClient from "../../services/apiClient";
import { Label } from "../../config/entities";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getColor } from "../../utils/getColors";
import { AiOutlineClose } from "react-icons/ai";

interface LabelsListProps {
  deleteEnabled: boolean;
  cardId: string;
}

const LabelsList = ({ cardId, deleteEnabled }: LabelsListProps) => {
  const queryClient = useQueryClient();
  const cardsClient = new apiClient(`/cards/${cardId}/labels`);
  const labelsClient = new apiClient("labels");
  const { data } = useQuery<Label[]>({
    queryKey: ["cards", cardId, "labels"],
    queryFn: () => cardsClient.getData().then((res: any) => res.data.labels),
    refetchOnWindowFocus: false
  });

  const handleDeleteLabel = (id: string) => {
    labelsClient.deleteData(`/${id}`).then(() => {
      queryClient.setQueryData<Label[]>(["cards", cardId, "labels"], (labels) =>
        labels?.filter((label) => label.id !== id)
      );
    });
  };

  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <HStack ref={ref} {...events} spacing={3} maxWidth="300px" overflow="hidden" onClick={(e) => e.stopPropagation()}>
      {data?.map((label, index) => (
        <Badge
          justifyContent="center"
          key={index}
          fontFamily="poppins"
          textTransform="capitalize"
          fontWeight={500}
          borderRadius="full"
          paddingX="12px"
          paddingY="2px"
          backgroundColor={getColor(label.color).secondary}
          color={getColor(label.color).primary}
        >
          {deleteEnabled ? (
            <HStack alignItems="center">
              <Text>{label.tag}</Text>
              <Icon
                as={AiOutlineClose}
                onClick={() => handleDeleteLabel(label.id)}
                _hover={{ color: "gray", cursor: "pointer" }}
              />
            </HStack>
          ) : (
            label.tag
          )}
        </Badge>
      ))}
    </HStack>
  );
};

export default LabelsList;
