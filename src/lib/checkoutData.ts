export const checkoutBookingDetails = {
  bookingId: "BK-2408-017",
  providerName: "Brisbane Laptop Pros",
  service: "Laptop diagnostics and screen replacement",
  preferredDate: "Thursday, 18 April 2026",
  arrivalWindow: "10:00 AM to 12:00 PM",
  customerName: "Jordan Smith",
  suburb: "West End, Brisbane",
  issueSummary:
    "Laptop screen flickers during startup and occasionally goes black after extended use.",
  depositAmount: "$65.00",
  estimatedBalance: "$154.00",
  totalEstimate: "$219.00",
  paymentReference: "RCPT-MH-58291",
  receiptIssuedAt: "8 April 2026, 4:12 PM",
} as const;

export const paymentMethodOptions = [
  {
    id: "card",
    label: "Credit or debit card",
    hint: "Visa, Mastercard, and Amex accepted in the live product later.",
  },
  {
    id: "paypal",
    label: "PayPal",
    hint: "UI only for now. No account connection is performed.",
  },
  {
    id: "bank-transfer",
    label: "Bank transfer",
    hint: "Shown as an option preview for future manual payments.",
  },
] as const;

export const receiptLineItems = [
  {
    label: "Booking deposit",
    amount: checkoutBookingDetails.depositAmount,
  },
  {
    label: "Remaining balance due on completion",
    amount: checkoutBookingDetails.estimatedBalance,
  },
] as const;