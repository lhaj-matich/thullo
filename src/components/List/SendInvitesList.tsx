import { Box, Text } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import InvitesListItem from "./InvitesListItem";
import apiClient from "../../services/apiClient";
import { Board, User } from "../Nav/BoardSearch";

export interface Invite {
  id: string;
  board: Board;
  boardId: string;
  ownerId: string;
  user: User;
  userId: string;
  createdAt: Date;
}

export interface InviteResponse {
  status: string;
  count: number;
  invites: Invite[];
}

const SentInvitesList = () => {
  const invitesClient = new apiClient<InviteResponse>("/invites");
  const queryClient = useQueryClient();
  const { data } = useQuery<Invite[]>({
    queryKey: ["sentInvites"],
    queryFn: () => invitesClient.getData("/sent").then((res) => res.data.invites),
    keepPreviousData: true,
  });

  const handleCancelInvite = (id: string) => {
    invitesClient.deleteData(`/${id}`).then(() => {
      queryClient.setQueriesData<Invite[]>(["sentInvites"], (invites) => invites?.filter((invite) => invite.id !== id));
    });
    queryClient.invalidateQueries(["sentInvites"]);
  };

  if (data?.length == 0)
    return (
      <Text align="center" color="#BDBDBD" fontWeight="500" fontSize="20px">
        You have not sent any invites.
      </Text>
    );
  return (
    <Box>
      {data?.map((invite, index) => (
        <InvitesListItem
          type="sent"
          id={invite.id}
          key={index}
          boardCover={invite.board.coverImage}
          author={invite.user}
          users={invite.board.users}
          boardName={invite.board.title}
          createdAt={invite.createdAt}
          onCancel={handleCancelInvite}
        />
      ))}
    </Box>
  );
};

export default SentInvitesList;
