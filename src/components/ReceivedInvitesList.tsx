import { Box, Text } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import InvitesListItem from "./InvitesListItem";
import apiClient from "../services/apiClient";
import { Board } from "./BoardSearch";
import useGlobal from "../hooks/useGlobal";

export interface Invite {
  id: string;
  board: Board;
  boardId: string;
  userId: string;
  createdAt: Date;
}

export interface InviteResponse {
  status: string;
  count: number;
  invites: Invite[];
}

const ReceivedInvitesList = () => {
  const invitesClient = new apiClient<InviteResponse>("/invites");
  const queryClient = useQueryClient();
  const { invites } = useGlobal();
  const { data } = useQuery<Invite[]>({
    queryKey: ["receivedInvites"],
    queryFn: () => invitesClient.getData().then((res) => res.data.invites),
    keepPreviousData: true,
  });

  const handleAcceptInvite = (id: string) => {
    invitesClient.postData({ id }, "/accept").then(() => {
      queryClient.setQueriesData<Invite[]>(["receivedInvites"], (invites) =>
        invites?.filter((invite) => invite.id !== id)
      );
      queryClient.refetchQueries({ queryKey: ["boards"] });
      invites.setInvitesNumber(invites.invitesNumber ? invites.invitesNumber - 1 : 0);
    });
  };

  const handleCancelInvite = (id: string) => {
    invitesClient.deleteData(`/${id}`).then(() => {
      queryClient.setQueriesData<Invite[]>(["receivedInvites"], (invites) =>
        invites?.filter((invite) => invite.id !== id)
      );
      invites.setInvitesNumber(invites.invitesNumber ? invites.invitesNumber - 1 : 0);
    });
  };

  if (data?.length == 0)
    return (
      <Text align="center" color="#BDBDBD" fontWeight="500" fontSize="20px">
        You have no pending invites.
      </Text>
    );
  return (
    <Box>
      {data?.map((invite, index) => (
        <InvitesListItem
          type="received"
          id={invite.id}
          key={index}
          boardCover={invite.board.coverImage}
          author={invite.board.author}
          users={invite.board.users}
          boardName={invite.board.title}
          createdAt={invite.createdAt}
          onAccept={handleAcceptInvite}
          onCancel={handleCancelInvite}
        />
      ))}
    </Box>
  );
};

export default ReceivedInvitesList;
