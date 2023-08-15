import {  Box, Grid, Heading, HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import NewBoard from "../Modal/NewBoard";
import GenericCard from "../Card/GenericCard";
import UserGroupList from "../List/UserGroupList";
import apiClient from "../../services/apiClient";
import { Board, BoardsReponse } from "../BoardSearch";

const BoardsContainer = () => {
  const boardsClient = new apiClient<BoardsReponse>("/boards");

  const { data } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: () => boardsClient.getData().then((res) => res.data.boards),
  });


  console.log(data);
  // Query logic
  return (
    <Box marginTop={5} height="85vh" width="85vw">
      <HStack justifyContent="space-between">
        <Heading variant="generic" fontWeight={500} fontSize={25}>
          All Boards
        </Heading>
        <NewBoard />
      </HStack>
      <Grid marginTop={8} templateColumns="repeat(auto-fill, 330px)" gap={18} padding={4}>
        {data?.map((board, index) => (
          <GenericCard
            key={index}
            clickCB={() => console.log("Clicking card")}
            title={board.title}
            image={board.coverImage || ""}
          >
            <UserGroupList users={[...(board?.users || []), ...(board?.author ? [board.author] : [])]} max={3} />
          </GenericCard>
        ))}
      </Grid>
    </Box>
  );
};

export default BoardsContainer;
