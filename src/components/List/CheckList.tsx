import {
  HStack,
  VStack,
  Input,
  Progress,
  Box,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  Text,
  useToast,
  Button,
} from "@chakra-ui/react";
import CheckListItem from "./CheckListItem";
import { BsPlusLg } from "react-icons/bs";
import { useRef } from "react";
import apiClient from "../../services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "../../config/entities";

interface CheckListProps {
  cardData: Card;
}

const CheckList = ({ cardData }: CheckListProps) => {
  const tasksClient = new apiClient("/tasks");
  const toast = useToast({ position: "top-right", status: "error", duration: 2000 });
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Add new Task logic
  const addNewTask = () => {
    if (inputRef.current && inputRef.current.value) {
      tasksClient
        .postData({ content: inputRef.current.value, cardId: cardData.id })
        .then((res) => {
          queryClient.setQueryData<Card[]>(["lists", cardData.listId, "cards"], (cards) =>
            cards?.map((item) => {
              if (item.id === cardData.id) return { ...item, checklists: [...(item.checklists || []), res.data.task] };
              return item;
            })
          );
          if (inputRef.current) inputRef.current.value = "";
        })
        .catch(() => {
          toast({ description: "Could not add task." });
        });
    }
  };
  // Logic for calculating the percentage of done tasks
  const calculatePercentage = () => {
    const totalTasks = cardData.checklists?.length;
    const resolvedTasks = cardData.checklists?.filter((task) => task.resolved === true).length;
    if (!(totalTasks && resolvedTasks)) return 0;
    return Math.floor((resolvedTasks / totalTasks) * 100);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") addNewTask();
  }

  return (
    <VStack alignItems="flex-start">
      <VStack border="1px solid #E0E0E0" padding={4} borderRadius={12} boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.05)">
        <HStack borderRadius={12} backgroundColor="#fff">
          <InputGroup size="md">
            <Input onKeyDown={handleEnter} ref={inputRef} variant="outline" pr="5rem" type="text" placeholder="Task, eg: Take out the trash" />
            <InputRightElement width="5rem">
              <Button
                variant="green"
                h="1.90rem"
                size="md"
                aria-label="Add task"
                onClick={addNewTask}
              >
                Insert
                </Button>

            </InputRightElement>
          </InputGroup>
        </HStack>
        <Box width="100%">
          <Text variant="generic" color="#828282" marginBottom={1} fontSize="14px" fontWeight={500}>
            Completed: {calculatePercentage()}%
          </Text>
          <Progress colorScheme="gray" size="md" value={calculatePercentage()} borderRadius={12} />
        </Box>
      </VStack>
      {cardData.checklists?.map((taskData, index) => (
        <CheckListItem key={index} listId={cardData.listId} task={taskData} />
      ))}
    </VStack>
  );
};

export default CheckList;
