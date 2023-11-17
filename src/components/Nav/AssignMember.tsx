import { useState } from "react";
import { Button, Heading, Menu, MenuButton, MenuList, Text, Center, useToast, Icon, HStack, Spinner } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import FormSearchInput from "../Form/FormSearchInput";
import UserList from "../List/UserList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import { User } from "./BoardSearch";

export interface UserResponse {
  status: string;
  count: number;
  users: User[];
}

const AssignMember = () => {
  const [id, setId] = useState("");
  const toast = useToast({ position: "top-right", duration: 2000 });
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const userClient = new apiClient<UserResponse>("/users");
  const inviteClient = new apiClient("/invites");
  const { data, refetch, isFetching } = useQuery<User[]>({
    queryKey: ["Users"],
    queryFn: () => userClient.getData(undefined, { search: searchText }).then((res) => res.data.users),
    retry: 1,
  });

  const handleSendInvite = () => {
    if (id)
    {
      setLoading(true);
      inviteClient
      .postData({ userId: id })
      .then(() => {
        queryClient.setQueriesData<User[]>(["Users"], (users) => users?.filter((user) => user.id !== id));
        setId("");
        setLoading(false);
      })
      .catch(() => {
        toast({
          description: "Something went wrong",
          status: "error",
        });
        setLoading(false);
      });
    }
  };
  return (
    <Menu>
      <MenuButton as={Button} borderRadius={12} paddingY="6px" paddingX="8px">
        <Icon as={BsPlusLg} fontSize={24} />
      </MenuButton>
      <MenuList padding={4} borderRadius={12}>
        <HStack justifyContent="space-between">
          <Heading letterSpacing="-0.42px" color="#4F4F4F" fontSize="19px" fontFamily="Poppins" fontWeight={600}>
            Invite to board
          </Heading>
          {loading && <Spinner color="primary"/>}
        </HStack>
        <Text marginY={2} letterSpacing="-0.42px" color="#828282" fontSize="16px" fontFamily="Poppins" fontWeight={400}>
          Search users you want to invite
        </Text>
        <FormSearchInput
          placeholder="User..."
          width="300px"
          type="icon"
          ChangeCb={(e) => setSearchText(e.target.value)}
          ClickCb={refetch}
        />
        <UserList users={data || []} loading={isFetching} userId={id} onClick={(id) => setId(id)} />
        <Center marginTop={4}>
          <Button variant="generic" onClick={handleSendInvite}>
            Invite
          </Button>
        </Center>
      </MenuList>
    </Menu>
  );
};

export default AssignMember;
