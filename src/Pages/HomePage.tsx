import { Center, VStack } from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";
import NavBar from "../components/Nav/NavBar";
import BoardsContainer from "../components/Container/BoardsContainer";
import { useState, useEffect } from "react";
import Loading from "../components/Loader/Loading";
import { Navigate } from "react-router-dom";


const HomePage = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />
  if (!auth.loggedIn) return <Navigate to="/login" />
  return (
    <>
      <NavBar />
      <Center paddingTop={5}>
        <VStack>
          <BoardsContainer />
        </VStack>
      </Center>
    </>
  );
};

export default HomePage;
