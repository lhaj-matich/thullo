import { useRef, useState } from "react";

import { Box, Divider, HStack, Heading, useStyleConfig } from "@chakra-ui/react";
import FormSearchInput from "../Form/FormSearchInput";
import VisibiltyButton from "../Button/VisibilityButton";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import BoardList from "../List/BoardList";

export interface User {
  id: string;
  fullname: string;
  profileImage: string;
  email: string;
}

export interface List {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  boardId?: string;
}

export interface Board {
  id?: string;
  title: string;
  coverImage: string | null;
  visibility: boolean;
  description?: string;
  users?: User[];
  lists?: List[];
  author?: User;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BoardsReponse {
  status: string;
  count: number;
  boards: Board[];
}

const BoardSearch = () => {
  const boardsClient = new apiClient<BoardsReponse>("/boards/search");
  const boxRef = useRef<HTMLDivElement>(null);
  const [visibility, setVisibilty] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchText, setsearchText] = useState("");
  const { data, refetch } = useQuery<Board[]>({
    queryKey: ["boardsSearch"],
    queryFn: () => boardsClient.getData().then((res) => res.data.boards),
  });

  const searchData = (data: Board[] | undefined) => {
    if (data)
      return data.filter(
        (item) =>
          item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) && item.visibility == visibility
      );
    return [];
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (boxRef.current && !boxRef.current.contains(document.activeElement)) {
        setSearchArea(false);
      }
    }, 200);
  };

  const styles = useStyleConfig("BoxStyle", { variant: "cardContainer" });
  return (
    <Box position="relative" onBlur={handleBlur} ref={boxRef}>
      <FormSearchInput
        placeholder="keyword..."
        width="400px"
        type="text"
        ChangeCb={(e) => setsearchText(e.target.value)}
        ClickCb={() => refetch()}
        FocusCb={() => setSearchArea(true)}
      />
      <Box __css={styles} visibility={searchArea ? "visible" : "hidden"}>
        <HStack paddingBottom={2} alignItems="center" justifyContent="space-between">
          <Heading as="h6" fontWeight="400" color="#828282" fontFamily="Poppins" fontSize="19px">
            Search in
          </Heading>
          <VisibiltyButton onClick={(visibility) => setVisibilty(!visibility)} />
        </HStack>
        <Divider />
        <BoardList data={searchText.length > 0 ? searchData(data) : []} />
      </Box>
    </Box>
  );
};

export default BoardSearch;
