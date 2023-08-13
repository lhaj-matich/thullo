import { Button, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdLock } from "react-icons/io";
import { IoEarth } from "react-icons/io5";

interface ButtonProps {
  onClick: (visibility: boolean) => void;
}

const VisibiltyButton = ({ onClick }: ButtonProps) => {
  const [visibile, setVisible] = useState(false);
  return (
    <Button
      leftIcon={<Icon boxSize={4} as={visibile ? IoEarth : IoMdLock} />}
      variant="private"
      height="32px"
      width="140px"
      onClick={() => {
        setVisible(!visibile);
        onClick(visibile);
      }}
    >
      <Text width="50px">{visibile ? "Public" : "Private "}</Text>
    </Button>
  );
};

export default VisibiltyButton;
