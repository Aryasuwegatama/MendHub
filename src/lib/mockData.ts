export type CategoryKey = "phone" | "laptop" | "appliance" | "clothing" | "bicycle";

export type CategoryCard = {
  key: CategoryKey;
  title: string;
  icon: string;
  description: string;
  href: string;
  accent: string;
};

export type MockProvider = {
  id: string;
  name: string;
  category: CategoryKey;
  categoryLabel: string;
  rating: string;
  reviews: string;
  price: string;
  location: string;
  note: string;
};

export const categories: CategoryCard[] = [
  {
    key: "phone",
    title: "Phone Repair",
    icon: "📱",
    description: "Screen replacement, charging issues, battery swaps, and quick diagnostics.",
    href: "/providers?category=phone",
    accent: "from-teal-400/80 via-cyan-400/70 to-sky-500/80",
  },
  {
    key: "laptop",
    title: "Laptop Repair",
    icon: "💻",
    description: "Hardware faults, overheating, software issues, and performance tune-ups.",
    href: "/providers?category=laptop",
    accent: "from-cyan-400/80 via-teal-400/70 to-emerald-500/80",
  },
  {
    key: "appliance",
    title: "Appliance Repair",
    icon: "🧰",
    description: "Help for washing machines, fridges, ovens, dryers, and other home appliances.",
    href: "/providers?category=appliance",
    accent: "from-teal-500/80 via-slate-500/70 to-slate-800/80",
  },
  {
    key: "clothing",
    title: "Clothing Alteration",
    icon: "🪡",
    description: "Repairs, hemming, zip replacement, fittings, and fabric adjustments.",
    href: "/providers?category=clothing",
    accent: "from-amber-300/80 via-orange-300/70 to-rose-400/80",
  },
  {
    key: "bicycle",
    title: "Bicycle Repair",
    icon: "🚲",
    description: "Brake fixes, tyre replacement, servicing, and tune-ups for everyday bikes.",
    href: "/providers?category=bicycle",
    accent: "from-lime-400/80 via-emerald-400/70 to-teal-500/80",
  },
];

export const mockProviders: MockProvider[] = [
  {
    id: "fixit-phone-lab",
    name: "FixIt Phone Lab",
    category: "phone",
    categoryLabel: "Phone Repair",
    rating: "4.9",
    reviews: "125",
    price: "From $45",
    location: "Brisbane CBD",
    note: "Same-day screen repair and battery replacement for common phone models.",
  },
  {
    id: "mobile-medics-brisbane",
    name: "Mobile Medics Brisbane",
    category: "phone",
    categoryLabel: "Phone Repair",
    rating: "4.8",
    reviews: "98",
    price: "From $59",
    location: "Fortitude Valley",
    note: "Mobile technician service for cracked screens, charge ports, and diagnostics.",
  },
  {
    id: "brisbane-laptop-pros",
    name: "Brisbane Laptop Pros",
    category: "laptop",
    categoryLabel: "Laptop Repair",
    rating: "4.9",
    reviews: "87",
    price: "From $79",
    location: "West End",
    note: "Laptop repairs, thermal cleanup, screen replacement, and data-safe diagnostics.",
  },
  {
    id: "techfix-solutions",
    name: "TechFix Solutions",
    category: "laptop",
    categoryLabel: "Laptop Repair",
    rating: "4.7",
    reviews: "76",
    price: "From $89",
    location: "Paddington",
    note: "Support for laptop repair, upgrades, and general device troubleshooting.",
  },
  {
    id: "home-appliance-heroes",
    name: "Home Appliance Heroes",
    category: "appliance",
    categoryLabel: "Appliance Repair",
    rating: "4.8",
    reviews: "104",
    price: "From $95",
    location: "Woolloongabba",
    note: "Fast response for washers, fridges, ovens, and dryer repairs across Brisbane.",
  },
  {
    id: "quickstitch-alterations",
    name: "QuickStitch Alterations",
    category: "clothing",
    categoryLabel: "Clothing Alteration",
    rating: "4.9",
    reviews: "61",
    price: "From $25",
    location: "Chermside",
    note: "Tailoring, hemming, zip repair, and urgent alteration jobs for daily wear.",
  },
  {
    id: "brisbane-bike-workshop",
    name: "Brisbane Bike Workshop",
    category: "bicycle",
    categoryLabel: "Bicycle Repair",
    rating: "4.8",
    reviews: "54",
    price: "From $35",
    location: "New Farm",
    note: "Bike servicing, brake adjustment, puncture repair, and full tune-ups.",
  },
];
