import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../utils/authSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const useForgotPassword = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<forgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return { handleSubmit, reset, register, errors };
};

export default useForgotPassword;
