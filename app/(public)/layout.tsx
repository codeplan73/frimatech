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
  title: "Musa Shop",
  description:
    "Musa Shop is a modern e-commerce platform built with Next.js and Prisma.",
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
