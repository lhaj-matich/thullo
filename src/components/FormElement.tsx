import React from 'react'
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface formProps {
  label: string;
  error: FieldError | undefined;
  children: ReactNode;
}

const FormElement = ({ children, label, error }: formProps) => {
  return (
    <>
      <FormControl isInvalid={error ? true : false}>
        <FormLabel variant="primary">{label}</FormLabel>
        {children}
        <FormErrorMessage paddingBottom={1}>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default FormElement;
