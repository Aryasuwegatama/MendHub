import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(1, "Phone is required."),
  suburb: z.string().min(1, "Suburb is required."),
  preferredDate: z.string().min(1, "Preferred date is required."),
  issueSummary: z.string().min(1, "Issue summary is required."),
});

// This type is derived automatically from the schema.
export type BookingFormValues = z.infer<typeof bookingSchema>;
