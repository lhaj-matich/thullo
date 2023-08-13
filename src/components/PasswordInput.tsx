import React from 'react'
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  variant: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}

const PasswordInput = ({ variant, placeholder, register }: PasswordInputProps) => {
  const [visibile, setVisible] = useState(false);
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={visibile ? "text" : "password"}
        placeholder={placeholder}
        variant={variant}
        {...register}
      />
      <InputRightElement width="4.5rem">
        <Button colorScheme="gray" variant="ghost" h="1.75rem" fontSize={20} onClick={() => setVisible(!visibile)}>
          {visibile ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
