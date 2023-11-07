import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Icon,
  HStack,
  Input,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { MdAttachFile } from "react-icons/md";
import useCreateAttachement from "../../hooks/useCreateAttachement";
import apiClient from "../../services/apiClient";
import { z } from "zod";
import { newAttachementSchema } from "../../utils/authSchema";
import { useQueryClient } from "@tanstack/react-query";
import { Attachement, Card } from "../../config/entities";

type AttachementType = z.infer<typeof newAttachementSchema>;

interface AttachementProps {
  cardId: string;
  listId: string;
}

const AttachementMenu = ({ cardId, listId }: AttachementProps) => {
  const queryClient = useQueryClient();
  const attachementClient = new apiClient("/attachements");
  const { handleSubmit, reset, register, errors } = useCreateAttachement();
  const toast = useToast();

  const SendFormData = (data: AttachementType) => {
    const formData = new FormData();
    formData.append("cardId", cardId);
    formData.append("title", data.title);
    formData.append("attachement", data.attachement[0]);
    attachementClient
      .postFormData(formData, { "Content-Type": "multipart/form-data" })
      .then((res) => {
        toast({
          position: "top-right",
          duration: 1000,
          description: `Attachement uploaded successfully.`,
          status: "success",
        });
        queryClient.setQueryData<Card[]>(["lists", listId, "cards"], (cards) =>
            cards?.map((item) => {
              if (item.id === cardId) return { ...item, attachments: [...(item.attachments || []), res.data.attachement] };
              return item;
            })
        );
        queryClient.setQueryData<Attachement[]>(["attachements", cardId], (oldAttachement) => [
          ...(oldAttachement || []),
          res.data.attachement,
        ]);
        reset();
      })
      .catch(() => {
        toast({
          position: "top-right",
          duration: 1000,
          description: `Error creating attachement.`,
          status: "error",
        });
      });
  };

  return (
    <Menu>
      {({ onClose }) => (
        <>
          <MenuButton as={Button} variant="private" borderRadius="8px" paddingY="9px" paddingX="14px">
            <HStack width="150px" paddingLeft={2} justifyContent="flex-start">
              <Icon as={MdAttachFile} fontSize={15} />
              <Text>Attachements</Text>
            </HStack>
          </MenuButton>
          <MenuList padding={4} borderRadius="12px">
            <Heading letterSpacing="-0.42px" color="#4F4F4F" fontSize="19px" fontFamily="Poppins" fontWeight={600}>
              Attachements
            </Heading>
            <Text
              marginY={3}
              letterSpacing="-0.42px"
              color="#828282"
              fontSize="16px"
              fontFamily="Poppins"
              fontWeight={400}
            >
              Enter the name and select the file.
            </Text>
            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit(SendFormData)}>
              <FormControl isInvalid={errors.title ? true : false}>
                <Input width="300px" type="text" variant="outline" placeholder="Display text" {...register("title")} />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.attachement ? true : false}>
                <Button
                  as="label"
                  marginTop={4}
                  width="100%"
                  display="block"
                  textAlign="center"
                  leftIcon={<Icon as={MdAttachFile} />}
                  variant="outlinePrivate"
                  htmlFor="file"
                >
                  Choose a file
                </Button>
                <Input id="file" type="file" display="none" {...register("attachement")} />
                <FormErrorMessage>{errors.attachement?.message?.toString()}</FormErrorMessage>
              </FormControl>
              <HStack justifyContent="flex-end" marginTop={4}>
                <Button variant="ghost" paddingY={2} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="green" paddingY={2} value="Insert">
                  Submit
                </Button>
              </HStack>
            </form>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default AttachementMenu;
