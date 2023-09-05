import { Checkbox, HStack, Heading, IconButton, Icon } from "@chakra-ui/react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import apiClient from "../../services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { Card, Task } from "../../config/entities";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  listId: string;
}

const CheckListItem = ({ task, listId }: TaskItemProps) => {
  const tasksClient = new apiClient(`/tasks/${task.id}`);
  const queryClient = useQueryClient();
  const [checked, setChecked] = useState(task.resolved);
  // ? Logic for deleting a task

  const deleteTask = (id: string) => {
    tasksClient.deleteData().then(() => {
      queryClient.setQueryData<Card[]>(["lists", listId, "cards"], (cards) =>
        cards?.map((item) => {
          if (item.id === task.cardId) {
            return {
              ...item,
              checklists: item.checklists?.filter((task) => task.id !== id),
            };
          }
          return item;
        })
      );
    });
  };

  //? Logic for resolving a task
  const ToggleTaskStatus = () => {
    //! This function needs to be refactored to be reused.
    tasksClient.updateData({ resolved: !checked }, null).then(() => {
      queryClient.setQueryData<Card[]>(["lists", listId, "cards"], (cards) =>
        cards?.map((item) => {
          if (item.id === task.cardId) {
            return {
              ...item,
              checklists: item.checklists?.map((checklistItem) => {
                if (checklistItem.id === task.id) {
                  return { ...checklistItem, resolved: !checked };
                }
                return checklistItem;
              }),
            };
          }
          return item;
        })
      );
      setChecked(!checked);
    });
  };
  return (
    <HStack justifyContent="space-between" padding={1} borderBottom="1px solid #F1F1F1" width="100%">
      <HStack>
        <Checkbox isChecked={checked} onChange={ToggleTaskStatus} />
        <Heading variant="generic" color="#000" fontWeight={500} fontSize="16px">
          {task.content}
        </Heading>
      </HStack>
      <IconButton
        onClick={() => deleteTask(task.id)}
        padding={1}
        variant="ghost"
        colorScheme="blue"
        aria-label="Delete task"
        icon={<Icon color="#D1D1D1" boxSize={5} as={RiDeleteBin6Fill} />}
      />
    </HStack>
  );
};

export default CheckListItem;
