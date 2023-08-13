import { Heading } from "@chakra-ui/react";
import { PiDotsNineBold } from "react-icons/pi";
import GenericButton from "../Button/GenericButton";

interface BoardHeaderProps {
  name: string;
}

const BoardHeader = ({ name }: BoardHeaderProps) => {
  return (
    <>
      <Heading
        paddingRight={30}
        paddingY={2}
        marginX={30}
        borderRight="2px solid #F2F2F2"
        fontWeight={400}
        fontSize="20px"
        fontFamily="Poppins"
      >
        {name}
      </Heading>
      <GenericButton text="All boards" icon={PiDotsNineBold} />
    </>
  );
};

export default BoardHeader;
