import { useStyleConfig, Box, Input, Button, HStack } from "@chakra-ui/react";

interface InsertCardProps {
  value: string;
  placeHolder: string;
  visibility: boolean;
  onSave: () => void;
  onInsert: (input: string) => void;
  setVisibility: (status: boolean) => void;
}

const InsertCard = ({ value, placeHolder, visibility, setVisibility, onSave, onInsert }: InsertCardProps) => {
  const styles = useStyleConfig("BoxStyle", { variant: "cardContainer" });

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSave();
  }

  return (
    <Box __css={styles} padding={4} width="100%" display={visibility ? "block" : "none"} position="relative" zIndex={0}>
      <Input
        placeholder={placeHolder}
        type="text"
        variant="invisible"
        fontSize="18px"
        marginBottom={5}
        onChange={(e) => onInsert(e.target.value)}
        onKeyDown={handleEnter}
        value={value}
      />
      <HStack>
        <Button variant="green" onClick={() => onSave()}>
          Save
        </Button>
        <Button variant="ghost" onClick={() => setVisibility(false)}>
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default InsertCard;
