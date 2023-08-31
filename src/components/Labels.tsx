import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Center,
  Icon,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { MdLabel } from "react-icons/md";

import SectionTitle from "./Panel/SectionTitle";
import ColorsList from "./List/ColorsList";
import LabelsList from "./List/LabelsList";
import { useRef, useState } from "react";
import apiClient from "../services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "../config/entities";

interface LabelsProps {
  cardId: string;
}

const Labels = ({ cardId }: LabelsProps) => {
  const [color, setColor] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });
  const inputRef = useRef<HTMLInputElement>(null);
  const labelsClient = new apiClient(`/cards/${cardId}/labels`);

  const insertNewLabel = () => {
    if (color && inputRef.current && inputRef.current.value) {
      labelsClient
        .postData({ tag: inputRef.current.value, color })
        .then((res: any) => {
          queryClient.setQueryData<Label[]>(["cards", cardId, "labels"], (labels) => [
            ...(labels || []),
            res.data.label,
          ]);
          if (inputRef.current) inputRef.current.value = "";
          setColor("");
        })
        .catch(() => {
          toast({ description: "Could not add label." });
        });
    }
  };

  return (
    <Menu onClose={() => setColor("")}>
      <MenuButton as={Button} variant="private" borderRadius="8px" paddingY="9px" paddingX="14px">
        <HStack width="150px" paddingLeft={2} justifyContent="flex-start">
          <Icon as={MdLabel} fontSize={15} />
          <Text>Labels</Text>
        </HStack>
      </MenuButton>
      <MenuList padding={4} borderRadius="12px">
        <Heading letterSpacing="-0.42px" color="#4F4F4F" fontSize="19px" fontFamily="Poppins" fontWeight={600}>
          Label
        </Heading>
        <Text marginY={3} letterSpacing="-0.42px" color="#828282" fontSize="16px" fontFamily="Poppins" fontWeight={400}>
          Enter the label and select a color
        </Text>
        <Input ref={inputRef} width="300px" type="text" variant="outline" placeholder="Label..." />
        <ColorsList colorName={color} changeColor={setColor} />
        <SectionTitle marginY={3} title="Available" icon={MdLabel} />
        <LabelsList cardId={cardId} />
        <Center marginTop={4}>
          <Button variant="generic" onClick={insertNewLabel}>
            Add
          </Button>
        </Center>
      </MenuList>
    </Menu>
  );
};

export default Labels;
