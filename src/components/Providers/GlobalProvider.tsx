import { useDisclosure } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { GlobalContext } from "../Contexts/globalContext";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const inviteModal = useDisclosure();
  const profileModal = useDisclosure();
  const [invitesNumber, setInvitesNumber] = useState(0);

  return (
    <GlobalContext.Provider value={{ inviteModal, profileModal, invites: { invitesNumber, setInvitesNumber } }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
