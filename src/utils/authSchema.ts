import { z } from "zod";

const NAME_MESSAGE_FORMAT = "Name should be at least 4 characters long";
const EMAIL_MESSAGE_FORMAT = "Email format is invalid";
const PASSWORD_MESSAGE_FORMAT = "Password should be at least 6 characters long";

export const profileSchema = z.object({
  fullname: z.string().min(4, { message: NAME_MESSAGE_FORMAT }),
  email: z.string().email({ message: EMAIL_MESSAGE_FORMAT }),
  profileImage: z.any(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: EMAIL_MESSAGE_FORMAT }),
  password: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
    newPassword: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
    confirmPassword: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
  }).refine((data) => data.password !== data.newPassword, {
    message: "You should not use your old password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: EMAIL_MESSAGE_FORMAT }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
    confirmPassword: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signupSchema = z
  .object({
    fullname: z.string().min(4, { message: NAME_MESSAGE_FORMAT }),
    email: z.string().email({ message: EMAIL_MESSAGE_FORMAT }),
    password: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
    confirmPassword: z.string().min(6, { message: PASSWORD_MESSAGE_FORMAT }).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
