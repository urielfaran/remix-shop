import { z } from "zod";

export const purchaseFormSchema = z.object({
  id: z.string({ required_error: "required_value" }),
  creditCardNumber: z.string({ required_error: "required_value" }),
  creditCardExpiration: z.string({ required_error: "required_value" }),
  cvv: z.number({ required_error: "required_value" }),
});
