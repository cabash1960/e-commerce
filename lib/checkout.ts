import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "Name too short"),
  lastName: z.string().min(2, "Name too short"),
  amount: z
    .number()
    .min(100, "Amount must be at least 100")
    .max(10000000, "Amount must be less than 10,000,000"),
  email: z.string().email("invalid email"),
  phone: z.string().min(11, "phone number must be 11 digits"),
  country: z.string(),
  address: z.string().min(2, "Address too short"),
  city: z.string().min(2, "City too short"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
