import { BoxProps, Button, HStack } from "@chakra-ui/react";
import axios from "axios";
import ImagesList from "../List/ImagesList";
import { MdInsertPhoto } from "react-icons/md";
import { Heading, Menu, MenuButton, MenuList, Text, Icon } from "@chakra-ui/react";
import { useState } from "react";
import {
  RANDOM_IMAGES,
  REACT_APP_API_KEY,
  REACT_UNSPLASH_ENDPOINT,
  unsplashImageResponse,
} from "../../config/constants";
import FormSearchInput from "../Form/FormSearchInput";

interface PhotoSearchProps extends BoxProps {
  buttonElement?: any;
  setImageId: (id: string) => void;
  id: string;
}

const PhotoSearch = ({ setImageId, id, buttonElement, ...rest }: PhotoSearchProps) => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<string[]>(RANDOM_IMAGES);
  const getImages = (search: string) => {
    axios
      .get<unsplashImageResponse>(REACT_UNSPLASH_ENDPOINT + "/search/photos/?client_id=" + REACT_APP_API_KEY, {
        params: {
          query: search,
          page: Math.round(Math.random() * 10) + 1,
          per_page: "12",
        },
      })
      .then((res) => {
        setImages(res.data.results.map((image) => image.urls.small));
      });
  };

  return (
    <Menu>
      <MenuButton variant="private" as={Button} paddingY={2}>
        {buttonElement ? (
          buttonElement
        ) : (
          <HStack width="150px" paddingLeft={3} justifyContent="flex-start" {...rest}>
            <Icon as={MdInsertPhoto} fontSize={15} />
            <Text>Cover</Text>
          </HStack>
        )}
      </MenuButton>
      <MenuList padding={4} borderRadius={12}>
        <Heading variant="generic" color="#4F4F4F">
          Photo search
        </Heading>
        <Text marginY={2} color="#828282" variant="generic">
          Search unsplash for photos
        </Text>
        <FormSearchInput
          placeholder="Keyword..."
          width="300px"
          type="icon"
          ClickCb={() => getImages(search)}
          ChangeCb={(e) => setSearch(e.target.value)}
        />
        <ImagesList selectImage={(id) => setImageId(id)} id={id} imageUrls={images || []} />
      </MenuList>
    </Menu>
  );
};

export default PhotoSearch;
