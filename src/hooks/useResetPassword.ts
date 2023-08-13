import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../utils/authSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type resetPasswordData = z.infer<typeof resetPasswordSchema>;

const useResetPassword = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<resetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return { handleSubmit, reset, register, errors };
};

export default useResetPassword;
