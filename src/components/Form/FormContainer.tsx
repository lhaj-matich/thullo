import { ReactNode } from "react";
import { Card, CardBody, CardHeader, Heading, Flex, VStack } from "@chakra-ui/react";
import Logo from "../Nav/Logo";

interface FormContainerProps {
  children: ReactNode;
  title: string;
  submitForm: () => void;
}

const FormContainer = ({ children, title, submitForm }: FormContainerProps) => {
  return (
    <>
      <Flex justifyContent="center">
        <form onSubmit={submitForm}>
          <Card boxShadow="0px 2px 30px rgba(220,220,220, 0.5)" width="350px" borderRadius={12}>
            <CardHeader paddingBottom={0}>
              <VStack as="header">
                <Logo />
                <Heading as="h6" size="md" color="gray.600" letterSpacing="1.5px">
                  {title}
                </Heading>
              </VStack>
            </CardHeader>
            <CardBody>{children}</CardBody>
          </Card>
        </form>
      </Flex>
    </>
  );
};

export default FormContainer;
