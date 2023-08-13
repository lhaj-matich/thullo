import { ChangeEvent, KeyboardEvent } from "react";
import { Button, InputGroup, InputRightElement, Input, Icon } from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";

interface SearchFormProps {
  type: "text" | "icon";
  ChangeCb?: (e: ChangeEvent<HTMLInputElement>) => void;
  ClickCb: () => void;
  FocusCb?: () => void;
  width: string;
  placeholder: string;
}

// COLORS
// 4F4F4F Dark
// 828282 Light
// BDBDBD Avatar

const FormSearchInput = ({ ChangeCb, ClickCb, FocusCb, type, width, placeholder }: SearchFormProps) => {
  const handleEntrePress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") ClickCb();
  };
  return (
    <>
      <InputGroup size="md">
        <Input
          variant="outline"
          pr="4.5rem"
          type="text"
          placeholder={placeholder}
          width={width}
          onKeyDown={handleEntrePress}
          onChange={(e) => {
            if (ChangeCb) ChangeCb(e);
          }}
          onFocus={() => {
            if (FocusCb) FocusCb();
          }}
        />
        <InputRightElement width={type == "text" ? "4.5rem" : "2.5rem"} right="2px">
          <Button h="2.2rem" size="sm" onClick={ClickCb}>
            {type === "text" ? "Search" : <Icon fontSize="2xl" as={IoMdSearch} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default FormSearchInput;
