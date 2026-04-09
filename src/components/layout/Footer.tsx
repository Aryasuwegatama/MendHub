import Link from "next/link";
import { routes } from "@/config/routes";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: routes.categories },
      { label: "Providers", href: routes.providers.index },
      { label: "How it works", href: routes.about },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: routes.about },
      { label: "Contact", href: routes.contact },
      { label: "Privacy", href: routes.policies },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-4 py-12 text-slate-700 dark:text-slate-300 sm:px-6 lg:px-8">
      <div className="glass-panel-strong mx-auto flex max-w-6xl flex-col gap-10 rounded-[2rem] px-6 py-10 lg:flex-row lg:justify-between lg:px-10">
        <div className="space-y-4">
          <Link href={routes.home} className="text-xl font-bold text-slate-950 dark:text-white">
            MendHub
          </Link>
          <p className="max-w-md text-slate-600 dark:text-slate-400">
            A mobile-first repair marketplace for Brisbane, built for small
            businesses and local customers.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            ABN: 00 000 000 000
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400">
                {section.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-slate-950 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>info@mendhub.com.au</li>
              <li>(07) 1234 5678</li>
              <li>Brisbane, QLD</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400">
              Follow
            </p>
            <div className="mt-4 flex items-center gap-3 text-2xl text-slate-500 dark:text-slate-400">
              <span>📘</span>
              <span>🐦</span>
              <span>📷</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/30 pt-6 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-500">
        <p>
          &copy; 2026 MendHub. This platform is for informational purposes only.
        </p>
        <p className="mt-1 italic">
          This website is a student project created for NIT3274 at Victoria University Brisbane. It is not a real business.
        </p>
      </div>
    </footer>
  );
}
