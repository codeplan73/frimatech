import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import QueryClientProvider from "./QueryClientProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Frima Technology | PC & Laptop Repairs, Accessories, and Swap Deals",
  description:
    "Frima Technology offers expert PC and laptop repair services, sales of computers and accessories, and convenient swap deals. Our team ensures prompt and cost-effective solutions, providing top-quality service to restore and upgrade your devices.",
  keywords: [
    "PC repair",
    "laptop repair",
    "laptop repair in benin city",
    "computer accessories",
    "computer accessories in benin city",
    "swap deals",
    "swap deals in benin city",
    "Frima Technology",
    "computer sales",
    "gadget repair",
    "technology services",
    "affordable PC repairs",
    "device upgrade",
    "device upgrade in benin city",
    "laptop maintenance",
    "laptop maintenance in benin city",
    "desktop repair services",
    "desktop repair services in benin city",
    "computer gadget swap",
    "computer gadget swap in benin city",
  ],
  openGraph: {
    title:
      "Frima Technology | PC & Laptop Repairs, Accessories, and Swap Deals",
    description:
      "Trust Frima Technology for all your PC and laptop repair needs. We also offer sales of computers, gadgets, and accessories, along with flexible swap deals to meet your technology demands.",
    type: "website",
    url: "https://www.frimatechnology.com/",
    images: [
      {
        url: "https://www.frimatechnology.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Frima Technology Services Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frimatech",
    title:
      "Frima Technology | PC & Laptop Repairs, Accessories, and Swap Deals",
    description:
      "Expert repair services and a wide range of computer gadgets, accessories, and flexible swap deals. Frima Technology is your one-stop solution for all your technology needs.",
    images: ["https://www.frimatechnology.com/images/logo.jpeg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <QueryClientProvider>
      <SessionProvider session={session}>
        <html lang="en">
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="description"
              content="Frima Technology offers expert PC and laptop repair services, sales of computers and accessories, and convenient swap deals. Our team ensures prompt and cost-effective solutions, providing top-quality service to restore and upgrade your devices."
            />
            <meta
              name="keywords"
              content="PC repair, laptop repair, computer accessories, swap deals, Frima Technology, computer sales, gadget repair, technology services, affordable PC repairs, device upgrade, laptop maintenance, desktop repair services, computer gadget swap"
            />
            <meta
              property="og:title"
              content="Frima Technology | PC & Laptop Repairs, Accessories, and Swap Deals"
            />
            <meta
              property="og:description"
              content="Trust Frima Technology for all your PC and laptop repair needs. We also offer sales of computers, gadgets, and accessories, along with flexible swap deals to meet your technology demands."
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content="https://www.frimatechnology.com/"
            />
            <meta
              property="og:image"
              content="https://www.frimatechnology.com/images/logo.jpeg"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@frimatech" />
            <meta
              name="twitter:title"
              content="Frima Technology | PC & Laptop Repairs, Accessories, and Swap Deals"
            />
            <meta
              name="twitter:description"
              content="Expert repair services and a wide range of computer gadgets, accessories, and flexible swap deals. Frima Technology is your one-stop solution for all your technology needs."
            />
            <meta
              name="twitter:image"
              content="https://www.frimatechnology.com/images/logo.jpeg"
            />
            <link rel="icon" href="/favicon.ico" />
          </head>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <Navbar />
            <main className="mt-0">{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
