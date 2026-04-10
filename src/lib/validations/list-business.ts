import { z } from "zod";

export const listBusinessSchema = z.object({
  businessName: z.string().min(1, "Business name is required."),
  contactName: z.string().min(1, "Contact name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(1, "Phone is required."),
  suburb: z.string().min(1, "Suburb is required."),
  description: z.string().min(1, "Description is required."),
});

export type ListBusinessFormValues = z.infer<typeof listBusinessSchema>;
