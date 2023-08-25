import { useStyleConfig, Box, Input, Button } from "@chakra-ui/react";

const InsertCard = () => {
  const styles = useStyleConfig("BoxStyle", { variant: "cardContainer" });
  return (
    <Box __css={styles} padding={4} width="350px" zIndex={0} onBlur={() => console.log("Closing")}>
      <Input
        placeholder="Enter a title for this card..."
        type="text"
        variant="invisible"
        fontSize="18px"
        marginBottom={5}
      />
      <Button variant="green">Save</Button>
    </Box>
  );
};

export default InsertCard;
