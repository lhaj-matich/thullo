import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";

type ModalType = ReturnType<typeof useDisclosure>;

type DispatchInvite = React.Dispatch<React.SetStateAction<number>>;

interface invitesData {
   invitesNumber: number;
   setInvitesNumber: DispatchInvite;
}

interface GlobalContextType {
  inviteModal: ModalType;
  profileModal: ModalType;
  invites: invitesData;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
