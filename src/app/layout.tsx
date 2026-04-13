import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MendHub — Brisbane Repair Marketplace",
    template: "%s | MendHub",
  },
  description:
    "Find trusted local repair services in Brisbane. Compare providers, book repairs, and get quotes for phones, laptops, appliances, and more.",
  openGraph: {
    title: "MendHub — Brisbane Repair Marketplace",
    description: "Find trusted local repair services in Brisbane. Compare providers, book repairs, and get quotes for phones, laptops, appliances, and more.",
    url: "https://mendhub.vercel.app",
    siteName: "MendHub",
    images: [
      {
        url: "/og-image.png", // Assuming existence or future addition
        width: 1200,
        height: 630,
        alt: "MendHub Brisbane Repair Marketplace",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MendHub — Brisbane Repair Marketplace",
    description: "Find trusted local repair services in Brisbane. Compare providers, book repairs, and get quotes for phones, laptops, appliances, and more.",
    images: ["/og-image.png"],
  },
};

const themeScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem('mendhub-theme');
      var theme = storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
