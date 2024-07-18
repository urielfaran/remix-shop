import { z } from "zod";
import { isValidMMYYYY } from "~/utils/utils";
import { idValidator } from "~/utils/validation";

export const purchaseFormSchema = z.object({
  id: z
    .string({ required_error: "required_value" })
    .refine((v) => idValidator(v), {
      message: "Invalid id",
    }),
  creditCardNumber: z
    .string({ required_error: "required_value" })
    .refine((val) => val.length === 16, {
      message: "Card number must be 16 digits length",
    }),
  creditCardExpiration: z.string().refine(
    (v) => {
      const isValid = isValidMMYYYY(v);
      console.log(isValid);
      return isValid;
    },
    {
      message: "Invalid date format",
    }
  ),
  cvv: z
    .string({ required_error: "required_value" })
    .refine((v) => v.length === 3, {
      message: "CVV number must be 3 digits length",
    }),
});
