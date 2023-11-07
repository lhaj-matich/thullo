import { zodResolver } from "@hookform/resolvers/zod";
import { newAttachementSchema } from "../utils/authSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type newAttachementData = z.infer<typeof newAttachementSchema>;

const useCreateAttachement = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors},
  } = useForm<newAttachementData>({
    resolver: zodResolver(newAttachementSchema),
  });

  return { handleSubmit, reset, register, errors};
};

export default useCreateAttachement;
