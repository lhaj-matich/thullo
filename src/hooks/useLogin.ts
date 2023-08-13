import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/authSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type loginData = z.infer<typeof loginSchema>;

const useLogin = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  return { handleSubmit, reset, register, errors };
};

export default useLogin;
