import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "required_value" })
    .email({ message: "incorrect_email" }),
  password: z.preprocess(
    (value) => (value ? String(value) : value),
    z.string({ required_error: "required_value" }),
  ),
});
