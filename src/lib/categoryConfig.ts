import { routes } from "@/config/routes";

export const categoryConfig = [
  {
    slug: "phone-repair",
    title: "Phone Repair",
    icon: "📱",
    description: "Screen replacement, charging issues, battery swaps, and quick diagnostics.",
    href: routes.providers.byCategory("phone-repair"),
    accent: "from-teal-400/80 via-cyan-400/70 to-sky-500/80",
  },
  {
    slug: "laptop-repair",
    title: "Laptop Repair",
    icon: "💻",
    description: "Hardware faults, overheating, software issues, and performance tune-ups.",
    href: routes.providers.byCategory("laptop-repair"),
    accent: "from-cyan-400/80 via-teal-400/70 to-emerald-500/80",
  },
  {
    slug: "appliance-repair",
    title: "Appliance Repair",
    icon: "🧰",
    description: "Help for washing machines, fridges, ovens, dryers, and other home appliances.",
    href: routes.providers.byCategory("appliance-repair"),
    accent: "from-teal-500/80 via-slate-500/70 to-slate-800/80",
  },
  {
    slug: "clothing-alteration",
    title: "Clothing Alteration",
    icon: "🪡",
    description: "Repairs, hemming, zip replacement, fittings, and fabric adjustments.",
    href: routes.providers.byCategory("clothing-alteration"),
    accent: "from-amber-300/80 via-orange-300/70 to-rose-400/80",
  },
  {
    slug: "bicycle-repair",
    title: "Bicycle Repair",
    icon: "🚲",
    description: "Brake fixes, tyre replacement, servicing, and tune-ups for everyday bikes.",
    href: routes.providers.byCategory("bicycle-repair"),
    accent: "from-lime-400/80 via-emerald-400/70 to-teal-500/80",
  },
];
