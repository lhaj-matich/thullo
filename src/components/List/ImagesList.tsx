import { Grid, Image, Skeleton, Text } from "@chakra-ui/react";

interface imagesListProps {
  imagesIds: string[] | undefined;
  selectImage: (id: string) => void;
  id: string;
}

const ImagesList = ({ imagesIds, selectImage, id }: imagesListProps) => {
  if (!imagesIds) return <Text>No images to display.</Text>;
  return (
    <Grid marginTop={5} templateColumns="repeat(4, 1fr)" gap={2}>
      {imagesIds.map((imageId, index) => (
        <Image
          onClick={() => selectImage(imageId)}
          cursor="pointer"
          fallback={<Skeleton w="65px" h="65px" borderRadius={10} />}
          src={`https://source.unsplash.com/${imageId}/100x100`}
          key={index}
          borderRadius={10}
          border={imageId === id ? "3px solid #2F80ED" : "none"}
          w="65px"
          h="65px"
          bg="blue.500"
        />
      ))}
    </Grid>
  );
};
export default ImagesList;
