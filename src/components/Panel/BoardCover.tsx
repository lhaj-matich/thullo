import { Box, Image, Skeleton, useToast } from "@chakra-ui/react";
import SectionTitle from "./SectionTitle";
import { PiImageFill } from "react-icons/pi";
import PhotoSearch from "../Modal/PhotoSearch";
import { useState } from "react";
import { createUnsplashLink } from "../../utils/loadUnsplashImage";
import useBoard from "../../hooks/useBoard";
import apiClient from "../../services/apiClient";

const BoardCover = () => {
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });
  const { board, setBoard } = useBoard();
  const [imageId, setImageId] = useState(board.coverImage || "G85VuTpw6jg");
  const boardClient = new apiClient(`boards/${board.id}`);

  const updateBoardCover = (id: string) => {
    boardClient
      .updateData({ coverImage: id }, null)
      .then(() => setBoard({ ...board, coverImage: id }))
      .catch((e) => toast({ description: e.response.data.message }));
  };

  return (
    <Box>
      <SectionTitle title="Cover" icon={PiImageFill} />
      <PhotoSearch
        buttonElement={
          <Image
            src={createUnsplashLink(imageId, 130, 400)}
            height="130px"
            width="400px"
            fallback={<Skeleton height="130px" width="370px" />}
          />
        }
        id={imageId}
        setImageId={(id) => {
          setImageId(id);
          updateBoardCover(id);
        }}
      />
    </Box>
  );
};

export default BoardCover;
