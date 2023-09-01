import {  Box, Grid, Heading, HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import NewBoard from "../Modal/NewBoard";
import GenericCard from "../Card/GenericCard";
import apiClient from "../../services/apiClient";
import UserGroupList from "../List/UserGroupList";
import { Board, BoardsReponse } from "../BoardSearch";
import { truncateText } from "../../utils/truncateText";

const BoardsContainer = () => {
  const boardsClient = new apiClient<BoardsReponse>("/boards");
  const navigate = useNavigate();

  const { data } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: () => boardsClient.getData().then((res) => res.data.boards),
  });

  // Query logic
  return (
    <Box marginTop={5} height="85vh" width="85vw">
      <HStack justifyContent="space-between">
        <Heading variant="generic" fontWeight={500} fontSize={25}>
          All Boards
        </Heading>
        <NewBoard />
      </HStack>
      <Grid justifyContent="center" marginTop={8} templateColumns="repeat(auto-fill, 330px)" gap={18} padding={4}>
        {data?.map((board, index) => (
          <GenericCard
            key={index}
            clickCB={() => navigate(`/board/${board.id}`)}
            title={truncateText(board.title, 24)}
            image={board.coverImage || ""}
          >
            <UserGroupList users={[...(board?.author ? [board.author] : []), ...(board?.users || [])]} max={3} />
          </GenericCard>
        ))}
      </Grid>
    </Box>
  );
};

export default BoardsContainer;
