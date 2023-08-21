import { Avatar, HStack, Heading, VStack, Text } from "@chakra-ui/react";
import moment from "moment";
import { createImageLink } from "../utils/loadImage";

interface userInfoProps {
  name: string | undefined;
  image: string | undefined;
  creationDate?: Date;
}

const UserInfo = ({ name, image, creationDate }: userInfoProps) => {
  return (
    <HStack>
      <Avatar
        marginRight={2}
        boxSize="42px"
        borderRadius={12}
        name={name}
        src={createImageLink(image) || ""}
        bgColor="#BDBDBD"
        color="#fff"
      />
      <VStack gap={1} alignItems="flex-start">
        <Heading variant="generic" fontWeight={600} fontSize="15px" color="#333">
          {name}
        </Heading>
        {creationDate ? (
          <Text variant="generic" fontSize="13px" fontWeight={500} color="#BDBDBD">
            on {moment(creationDate).format("ll")}
          </Text>
        ) : (
          ""
        )}
      </VStack>
    </HStack>
  );
};

export default UserInfo;
