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
  description: string;
  rating: string;
  reviews: string;
  verified: boolean;
  price: string;
  pricingInfo: string;
  location: string;
  suburb: string;
  serviceArea: string;
  note: string;
  services: Array<{
    name: string;
    description: string;
    price: string;
  }>;
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
    description: "FixIt Phone Lab specialises in same-day phone repairs for cracked screens, weak batteries, charging issues, and general diagnostics with a walk-in friendly service model.",
    rating: "4.9",
    reviews: "125",
    verified: true,
    price: "From $45",
    pricingInfo: "Typical repairs start from $45, with screen replacements and battery swaps quoted upfront before work begins.",
    location: "Brisbane CBD",
    suburb: "Brisbane CBD",
    serviceArea: "Brisbane CBD, Spring Hill, South Brisbane",
    note: "Same-day screen repair and battery replacement for common phone models.",
    services: [
      {
        name: "Screen Replacement",
        description: "Fast replacement for cracked or unresponsive phone screens.",
        price: "From $119",
      },
      {
        name: "Battery Replacement",
        description: "Restore battery health for common iPhone and Android devices.",
        price: "From $79",
      },
      {
        name: "Charging Port Repair",
        description: "Repair loose, damaged, or non-responsive charging ports.",
        price: "From $89",
      },
    ],
  },
  {
    id: "mobile-medics-brisbane",
    name: "Mobile Medics Brisbane",
    category: "phone",
    categoryLabel: "Phone Repair",
    description: "Mobile Medics Brisbane offers on-site phone repair visits for inner-city suburbs, with a focus on convenience for urgent device problems.",
    rating: "4.8",
    reviews: "98",
    verified: true,
    price: "From $59",
    pricingInfo: "Call-out and device repairs start from $59 depending on suburb and issue type.",
    location: "Fortitude Valley",
    suburb: "Fortitude Valley",
    serviceArea: "Fortitude Valley, New Farm, Teneriffe",
    note: "Mobile technician service for cracked screens, charge ports, and diagnostics.",
    services: [
      {
        name: "On-site Screen Repair",
        description: "Mobile visit for cracked screen replacements at home or work.",
        price: "From $139",
      },
      {
        name: "Battery Health Service",
        description: "Diagnosis and replacement for draining or swollen batteries.",
        price: "From $85",
      },
    ],
  },
  {
    id: "brisbane-laptop-pros",
    name: "Brisbane Laptop Pros",
    category: "laptop",
    categoryLabel: "Laptop Repair",
    description: "Brisbane Laptop Pros handles diagnostics, performance issues, broken screens, overheating, and upgrade work for study and business devices.",
    rating: "4.9",
    reviews: "87",
    verified: true,
    price: "From $79",
    pricingInfo: "Diagnostics and repair work begin from $79, with upgrade options quoted based on parts and turnaround.",
    location: "West End",
    suburb: "West End",
    serviceArea: "West End, South Brisbane, Highgate Hill",
    note: "Laptop repairs, thermal cleanup, screen replacement, and data-safe diagnostics.",
    services: [
      {
        name: "Laptop Diagnostics",
        description: "Identify hardware and software faults before repair starts.",
        price: "From $79",
      },
      {
        name: "Screen Replacement",
        description: "Replace damaged laptop displays and hinges where needed.",
        price: "From $189",
      },
      {
        name: "Performance Tune-up",
        description: "Thermal cleanup, storage optimisation, and upgrade recommendations.",
        price: "From $99",
      },
    ],
  },
  {
    id: "techfix-solutions",
    name: "TechFix Solutions",
    category: "laptop",
    categoryLabel: "Laptop Repair",
    description: "TechFix Solutions provides repair and upgrade support for laptops and mixed-device households needing one repair partner for multiple issues.",
    rating: "4.7",
    reviews: "76",
    verified: true,
    price: "From $89",
    pricingInfo: "Most repair work starts from $89, with quotes adjusted for parts availability and complexity.",
    location: "Paddington",
    suburb: "Paddington",
    serviceArea: "Paddington, Milton, Auchenflower, Toowong",
    note: "Support for laptop repair, upgrades, and general device troubleshooting.",
    services: [
      {
        name: "Repair Assessment",
        description: "Problem diagnosis for power issues, crashes, and component faults.",
        price: "From $89",
      },
      {
        name: "Storage and RAM Upgrade",
        description: "Upgrade older laptops to improve speed and daily performance.",
        price: "From $129",
      },
    ],
  },
  {
    id: "home-appliance-heroes",
    name: "Home Appliance Heroes",
    category: "appliance",
    categoryLabel: "Appliance Repair",
    description: "Home Appliance Heroes helps households with washer, fridge, oven, and dryer faults, with priority support for urgent breakdowns.",
    rating: "4.8",
    reviews: "104",
    verified: true,
    price: "From $95",
    pricingInfo: "Call-out and appliance diagnosis begins from $95, with parts and labour quoted after inspection.",
    location: "Woolloongabba",
    suburb: "Woolloongabba",
    serviceArea: "Woolloongabba, Coorparoo, Greenslopes, Annerley",
    note: "Fast response for washers, fridges, ovens, and dryer repairs across Brisbane.",
    services: [
      {
        name: "Washing Machine Repair",
        description: "Leak, drainage, and spinning issue repairs.",
        price: "From $129",
      },
      {
        name: "Fridge Diagnostics",
        description: "Temperature, compressor, and seal fault inspections.",
        price: "From $119",
      },
    ],
  },
  {
    id: "quickstitch-alterations",
    name: "QuickStitch Alterations",
    category: "clothing",
    categoryLabel: "Clothing Alteration",
    description: "QuickStitch Alterations focuses on clothing fixes, tailoring changes, zip replacements, and garment adjustments with quick turnaround options.",
    rating: "4.9",
    reviews: "61",
    verified: true,
    price: "From $25",
    pricingInfo: "Simple hems and garment repairs start from $25, with fitted tailoring quoted per item.",
    location: "Chermside",
    suburb: "Chermside",
    serviceArea: "Chermside, Kedron, Stafford",
    note: "Tailoring, hemming, zip repair, and urgent alteration jobs for daily wear.",
    services: [
      {
        name: "Hemming and Shortening",
        description: "Adjust trouser, skirt, and dress lengths for a better fit.",
        price: "From $25",
      },
      {
        name: "Zip Replacement",
        description: "Repair or replace broken zips on jackets, dresses, and pants.",
        price: "From $35",
      },
    ],
  },
  {
    id: "brisbane-bike-workshop",
    name: "Brisbane Bike Workshop",
    category: "bicycle",
    categoryLabel: "Bicycle Repair",
    description: "Brisbane Bike Workshop offers reliable bike servicing, puncture fixes, brake tuning, and component checks for regular commuters and weekend riders.",
    rating: "4.8",
    reviews: "54",
    verified: true,
    price: "From $35",
    pricingInfo: "Basic servicing starts from $35, with more advanced brake, gear, or parts work priced per job.",
    location: "New Farm",
    suburb: "New Farm",
    serviceArea: "New Farm, Teneriffe, Newstead, Bowen Hills",
    note: "Bike servicing, brake adjustment, puncture repair, and full tune-ups.",
    services: [
      {
        name: "Puncture Repair",
        description: "Tube replacement and tyre inspection for quick ride recovery.",
        price: "From $35",
      },
      {
        name: "Brake and Gear Tune-up",
        description: "Adjust braking response and shifting performance.",
        price: "From $59",
      },
      {
        name: "Full Service",
        description: "Comprehensive bike check, clean, and adjustment package.",
        price: "From $119",
      },
    ],
  },
];

export function getMockProviderById(id: string) {
  return mockProviders.find((provider) => provider.id === id) ?? null;
}
