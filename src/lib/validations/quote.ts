import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(1, "Phone is required."),
  suburb: z.string().min(1, "Suburb is required."),
  issueDescription: z.string().min(1, "Issue description is required."),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
