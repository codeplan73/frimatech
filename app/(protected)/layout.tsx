import type { Metadata } from "next";
import { Inter as FontSans, Heebo } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import QueryClientProvider from "./QueryClientProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const heebo = Heebo({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Musa Shop",
  description: "Frima Tech Solutions",
};

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <QueryClientProvider>
      <SessionProvider session={session}>
        <html lang="en" suppressHydrationWarning>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <body className={`${heebo.className}, ${cn(fontSans.variable)}`}>
            <div className="flex flex-col w-full">
              <Sidebar />
              <div className="flex flex-col md:ml-56">
                <Navbar />
                <main className="px-6 py-6 overflow-y-auto md:px-20 bg-slate-100">
                  {children}
                </main>
              </div>
            </div>
            <ToastContainer />
          </body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
