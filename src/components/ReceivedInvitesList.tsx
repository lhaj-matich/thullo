import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import InvitesListItem from "./InvitesListItem";
import apiClient from "../services/apiClient";
import { Board } from "./BoardSearch";

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
  const { data } = useQuery<Invite[]>({
    queryKey: ["receivedInvites"],
    queryFn: () => invitesClient.getData().then((res) => res.data.invites),
    keepPreviousData: true,
  });

  const handleAcceptInvite = (id: string) => {
    invitesClient.postData({ id }, "/accept").then((res) => {
      queryClient.setQueriesData<Invite[]>(["receivedInvites"], (invites) =>
        invites?.filter((invite) => invite.id !== id)
      );
    });
  };

  const handleCancelInvite = (id: string) => {
    invitesClient.deleteData(`/${id}`).then(() => {
      queryClient.setQueriesData<Invite[]>(["receivedInvites"], (invites) =>
        invites?.filter((invite) => invite.id !== id)
      );
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
