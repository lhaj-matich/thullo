import { Box, Grid } from "@chakra-ui/react";
import { COLORS } from "../../config/constants";

const ColorsList = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2} marginTop={4}>
      {COLORS.map((color, index) => (
        <Box key={index} _hover={{ cursor: "pointer" }} borderRadius="8px" height="40px" backgroundColor={color.primary}></Box>
      ))}
    </Grid>
  );
};

export default ColorsList;
