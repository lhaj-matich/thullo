import useAuth from "./useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../utils/authSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type signUpData = z.infer<typeof signupSchema>;

const useSignup = () => {
  const { auth, setAuth } = useAuth();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<signUpData>({
    resolver: zodResolver(signupSchema),
  });

  return { handleSubmit, reset, register, errors, auth, setAuth };
};

export default useSignup;
