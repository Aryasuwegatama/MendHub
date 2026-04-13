export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  provider: "/provider",
  admin: "/admin",
  about: "/about",
  categories: "/categories",
  contact: "/contact",
  listYourBusiness: "/list-your-business",
  policies: "/policies",
  recommender: "/recommender",

  /**
   * Builds the simulated payment page URL for a booking.
   * The amount is a fixed deposit figure (string, e.g. "65").
   */
  payment(bookingId: string, amount: string) {
    const params = new URLSearchParams({ bookingId, amount });
    return `/payment?${params.toString()}`;
  },

  /**
   * Builds the simulated payment page URL for a quote request.
   * Amount is "0" — quote flow requires no upfront deposit.
   */
  paymentForQuote(quoteRequestId: string, amount: string) {
    const params = new URLSearchParams({ quoteRequestId, amount });
    return `/payment?${params.toString()}`;
  },

  /**
   * Builds the confirmation/receipt page URL from a transaction reference.
   */
  confirmation(ref: string) {
    return `/confirmation?ref=${encodeURIComponent(ref)}`;
  },

  providers: {
    index: "/providers",
    byCategory(category: string) {
      const params = new URLSearchParams({ category });
      return `/providers?${params.toString()}`;
    },
    details(id: string) {
      return `/providers/${id}`;
    },
    quote(id: string, serviceId?: string) {
      const base = `/providers/${id}/quote`;
      if (!serviceId) return base;
      return `${base}?serviceId=${encodeURIComponent(serviceId)}`;
    },
    book(id: string, serviceId?: string) {
      const base = `/providers/${id}/book`;
      if (!serviceId) return base;
      return `${base}?serviceId=${encodeURIComponent(serviceId)}`;
    },
  },
} as const;