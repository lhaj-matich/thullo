import { Box, Grid } from "@chakra-ui/react";
import { COLORS } from "../../config/constants";

interface ColorsListProps {
  colorName: string;
  changeColor: (color: string) => void;
}

const ColorsList = ({ colorName, changeColor }: ColorsListProps) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2} marginTop={4}>
      {COLORS.map((color, index) => (
        <Box
          onClick={() => changeColor(color.name)}
          key={index}
          filter={colorName === color.name ?  "contrast(20%)" : "none"}
          borderRadius="8px"
          height="40px"
          backgroundColor={color.primary}
          _hover={{ cursor: "pointer" }}
        ></Box>
      ))}
    </Grid>
  );
};

export default ColorsList;
