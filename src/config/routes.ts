export const routes = {
  home: "/",
  about: "/about",
  categories: "/categories",
  contact: "/contact",
  listYourBusiness: "/list-your-business",
  policies: "/policies",
  recommender: "/recommender",
  payment: "/payment",
  confirmation: "/confirmation",
  providers: {
    index: "/providers",
    byCategory(category: string) {
      const params = new URLSearchParams({ category });
      return `/providers?${params.toString()}`;
    },
    details(id: string) {
      return `/providers/${id}`;
    },
    quote(id: string) {
      return `/providers/${id}/quote`;
    },
    book(id: string) {
      return `/providers/${id}/book`;
    },
  },
} as const;