import { HStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Badge } from "@chakra-ui/react";
import { COLORS } from "../../config/constants";
import apiClient from "../../services/apiClient";
import { Label } from "../../config/entities";
import { useQuery } from "@tanstack/react-query";
import { getColor } from "../../utils/getColors";

interface LabelsListProps {
  cardId: string;
}

const LabelsList = ({ cardId }: LabelsListProps) => {
  const labelsClient = new apiClient(`/cards/${cardId}/labels`);
  const { data } = useQuery<Label[]>({
    queryKey: ["cards", cardId, "labels"],
    queryFn: () => labelsClient.getData().then((res: any) => res.data.labels),
  });

  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <HStack ref={ref} {...events} spacing={3} maxWidth="300px" overflow="hidden">
      {data?.map((label, index) => (
        <Badge
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
          {label.tag}
        </Badge>
      ))}
    </HStack>
  );
};

export default LabelsList;
