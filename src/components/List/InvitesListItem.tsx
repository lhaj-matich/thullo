import {
  Button,
  HStack,
  useStyleConfig,
  Image,
  Heading,
  Text,
  VStack,
  Avatar,
  AvatarGroup,
  Skeleton,
} from "@chakra-ui/react";
import moment from "moment";
import { User } from "../Nav/BoardSearch";
import { createImageLink } from "../../utils/loadImage";
import { truncateText } from "../../utils/truncateText";
import { createUnsplashLink } from "../../utils/loadUnsplashImage";

interface InviteItemProps {
  id: string;
  type: "received" | "sent";
  author: User | undefined;
  users: User[] | undefined;
  boardName: string;
  boardCover: string | null;
  createdAt: Date;
  onAccept?: (id: string) => void;
  onCancel: (id: string) => void;
}

const placeHolder =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

const InvitesListItem = ({
  type,
  author,
  users,
  boardName,
  boardCover,
  createdAt,
  id,
  onAccept,
  onCancel,
}: InviteItemProps) => {
  const styles = useStyleConfig("HStack", { variant: "ListItemButton" });
  return (
    <HStack __css={styles} justifyContent="flex-start">
      <Image
        borderRadius="12px"
        fallback={<Skeleton height="70px" width="90px" borderRadius="12px" />}
        src={createUnsplashLink(boardCover || placeHolder, 70, 70)}
        height="70px"
        width="70px"
      />
      <VStack alignItems="flex-start" width="100%">
        <HStack justifyContent="space-between" width="100%">
          <Heading as="p" letterSpacing="-0.5px" fontWeight="500" color="#4F4F4F" fontFamily="Poppins" fontSize="16px">
            {truncateText(boardName, 26)}
          </Heading>
          <Text color="#BDBDBD" fontWeight="400" fontSize="10px">
            {moment(createdAt).fromNow()}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" width="100%">
          <HStack>
            <AvatarGroup size="sm" max={4}>
              <Avatar name={author?.fullname} src={createImageLink(author?.profileImage)} />
              {type == "received"
                ? users?.map((user, index) => (
                    <Avatar key={index} name={user.fullname} src={createImageLink(user.profileImage)} />
                  ))
                : ""}
            </AvatarGroup>
            {type != "received" ? (
              <Text fontWeight="600" color="#BDBDBD" fontSize="12px">
                {author?.fullname}
              </Text>
            ) : (
              ""
            )}
          </HStack>
          <HStack>
            {type == "received" ? (
              <Button
                fontWeight="400"
                onClick={() => {
                  if (onAccept) onAccept(id);
                }}
              >
                Accept
              </Button>
            ) : (
              ""
            )}
            <Button variant="private" onClick={() => onCancel(id)}>
              Cancel
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default InvitesListItem;
