import Link from "next/link";

type FeaturedProvider = {
  id: string;
  name: string;
  category: string;
  suburb: string;
  description: string;
  price: string;
  verified: boolean;
};

const featuredProviders: FeaturedProvider[] = [
  {
    id: "fixit-phone-lab",
    name: "QuickFix Mobiles",
    category: "Phone Repair",
    suburb: "Brisbane City",
    description: "Fast and reliable phone repairs with same-day screen and battery replacements.",
    price: "$49+",
    verified: true,
  },
  {
    id: "brisbane-laptop-pros",
    name: "Laptop Rescue Co.",
    category: "Laptop Repair",
    suburb: "West End",
    description: "Diagnostics, screen replacement, and performance tune-ups for study and work devices.",
    price: "$79+",
    verified: true,
  },
  {
    id: "home-appliance-heroes",
    name: "Appliance First",
    category: "Appliance Repair",
    suburb: "Woolloongabba",
    description: "Practical household appliance fixes for washers, fridges, ovens, and dryers.",
    price: "Quote required",
    verified: true,
  },
  {
    id: "quickstitch-alterations",
    name: "Quick Stitch Studio",
    category: "Clothing Alteration",
    suburb: "Chermside",
    description: "Everyday tailoring, zip replacement, hemming, and urgent alteration jobs.",
    price: "$25+",
    verified: false,
  },
];

export default function FeaturedProviders() {
  return (
    <section id="providers" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-300">
            Featured Providers
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Featured Providers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Top repair services in Brisbane
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:px-0">
          <div className="flex snap-x gap-4 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
            {featuredProviders.map((provider) => (
              <article
                key={provider.id}
                className="glass-panel min-w-[285px] snap-start rounded-2xl p-6 shadow-lg shadow-slate-900/5 lg:min-w-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      {provider.category}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                      {provider.name}
                    </h3>
                  </div>
                  <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {provider.verified ? "Verified" : "Trust Badge"}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-teal-800 dark:text-teal-200">
                  {provider.suburb}
                </p>
                <p className="mt-3 line-clamp-2 text-slate-600 dark:text-slate-300">
                  {provider.description}
                </p>

                <div className="mt-5 inline-flex rounded-full bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900 dark:bg-teal-400/15 dark:text-teal-200">
                  {provider.price}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href={`/providers/${provider.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/providers/${provider.id}/quote`}
                    className="glass-pill inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    Request Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
