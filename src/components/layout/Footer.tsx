import Link from "next/link";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/categories" },
      { label: "Providers", href: "/providers" },
      { label: "How it works", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/policies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-12 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="space-y-4">
          <Link href="/" className="text-xl font-bold text-white">
            MendHub
          </Link>
          <p className="max-w-md text-slate-400">
            A mobile-first repair marketplace for Brisbane, built for small
            businesses and local customers.
          </p>
          <p className="text-xs text-slate-500">
            ABN: 00 000 000 000
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                {section.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>info@mendhub.com.au</li>
              <li>(07) 1234 5678</li>
              <li>Brisbane, QLD</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Follow
            </p>
            <div className="mt-4 flex items-center gap-3 text-2xl text-slate-400">
              <span>📘</span>
              <span>🐦</span>
              <span>📷</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} MendHub. This platform is for informational purposes only.
        </p>
        <p className="mt-1 italic">
          This website is a student project created for NIT3274 at James Cook University. It is not a real business.
        </p>
      </div>
    </footer>
  );
}
