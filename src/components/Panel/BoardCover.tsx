import { Box, Image, Skeleton } from "@chakra-ui/react";
import SectionTitle from "./SectionTitle";
import { PiImageFill } from "react-icons/pi";
import PhotoSearch from "../Modal/PhotoSearch";
import { useState } from "react";
import { createUnsplashLink } from '../../utils/loadUnsplashImage'

const BoardCover = () => {
  const [imageId, setImageId] = useState("5E5N49RWtbA");
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
        setImageId={(id) => setImageId(id)}
      />
    </Box>
  );
};

export default BoardCover;
