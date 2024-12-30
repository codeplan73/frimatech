"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { CgMenuMotion } from "react-icons/cg";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsCart4 } from "react-icons/bs";
import useCartStore from "@/store/cartStore";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  // { label: "Blog", href: "/posts" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const linksAuth = [
  { label: "Cart", href: "/cart" },
  { label: "SignIn", href: "/auth/login" },
];

const Navbar = () => {
  const [open, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();
  const [position, setPosition] = useState("bottom");
  const auth = false;
  const session = useSession();
  const router = useRouter();

  const { items } = useCartStore();

  const logout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.push("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full px-5 top-0 z-50 transition-all duration-300 mb-40
      }`}
    >
      <div
        className={`group w-90 md:w-[80vw] md:px-20 mx-auto transition-all duration-300 border rounded-b-3xl  ${
          isScrolled
            ? "bg-bgPrimary bg-opacity-90 backdrop-blur-md"
            : "bg-transparent border-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 mx-auto text-white">
          <Link href="/" className="">
            <Image
              src="/logo.png"
              alt="Shop Logo"
              height={1000}
              width={1000}
              className="w-24 h-full rounded drop-shadow-2xl filter hue-rotate-90"
            />
          </Link>

          <ul className="items-center justify-start hidden space-x-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classnames({
                  "text-white p-2 rounded-xl font-semibold":
                    link.href === currentPath,
                  "text-textPrimary": link.href !== currentPath,
                  "text-white": isScrolled,
                  "transition-colors hover:text-[#dbc547] p-2 rounded-xl": true,
                })}
              >
                {link.label}
              </Link>
            ))}
          </ul>
          <ul className="items-center justify-start hidden space-x-2 md:flex">
            <Link
              href="/cart"
              className={classnames({
                "text-white p-2 rounded-xl font-semibold":
                  "/cart" === currentPath,
                "text-textPrimary": "/cart" !== currentPath,
                "text-white": isScrolled,
                "flex items-start gap-1 transition-colors hover:text-[#dbc547] p-2 rounded-xl":
                  true,
              })}
            >
              <BsCart4 className="z-10 text-xl" />
              <span className="flex flex-col font-semibold text-">
                {items()}
              </span>
            </Link>
            {session.data?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-0 text-textPrimary hover:bg-slate-900 hover:text-white"
                  >
                    {session?.data?.user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                    className="flex flex-col px-2 space-y-1"
                  >
                    {session?.data?.user.role === "ADMIN" ? (
                      <>
                        <Link href={"/dashboard"}>Dashboard</Link>
                        <Link href={"/orders"}>My Orders</Link>
                        <Link href={"/Settings"}>Settings</Link>
                        <button
                          className="text-start"
                          onClick={(e) => {
                            logout();
                          }}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href={"/orders"}>My Orders</Link>
                        <Link href={"/Settings"}>Settings</Link>
                        <button
                          className="text-start"
                          onClick={(e) => {
                            logout();
                          }}
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/auth/login"
                className={classnames({
                  "text-white p-2 rounded-xl font-semibold":
                    "/auth/login" === currentPath,
                  "text-textPrimary": "/auth/login" !== currentPath,
                  "text-white": isScrolled,
                  "transition-colors hover:text-[#dbc547] p-2 rounded-xl": true,
                })}
              >
                Login
              </Link>
            )}
          </ul>

          {open ? (
            <CgMenuMotion
              className="block h-full text-3xl font-semibold cursor-pointer md:hidden text-slate-300"
              onClick={() => setIsOpen(!open)}
            />
          ) : (
            <TiThMenu
              className="block h-full text-3xl cursor-pointer md:hidden text-slate-300"
              onClick={() => setIsOpen(!open)}
            />
          )}
        </div>
      </div>

      {/* mobile menu section */}
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-70"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <ul
        className={`w-8/12 absolute z-20 h-screen bg-white backdrop:bg-slate-400 left-0 -top-0 transform py-6 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {open && (
          <>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex w-full p-4 text-slate-700 hover:bg-secondaryColor hover:text-bgPrimary"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
              </Link>
            ))}
            {linksAuth.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex w-full p-4 text-slate-700 hover:bg-secondaryColor hover:text-bgPrimary"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
