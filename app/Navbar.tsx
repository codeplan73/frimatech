"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { CgMenuMotion } from "react-icons/cg";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const linksAuth = [
  { label: "Cart", href: "/Cart" },
  { label: "Account", href: "/profile" },
];

const Navbar = () => {
  const [open, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();
  const [position, setPosition] = useState("bottom");
  const auth = false;

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
      className={`fixed w-full px-5 top-0 z-50 transition-all duration-300
      }`}
    >
      <div
        className={`group w-90 md:w-[80vw] md:px-20 mx-auto transition-all duration-300 border rounded-b-3xl  ${
          isScrolled
            ? "bg-bgPrimary bg-opacity-90 backdrop-blur-md"
            : "bg-transparent border-none"
        }`}
      >
        <div className="mx-auto px-4  py-4 flex items-center justify-between text-white">
          <Link href="/" className="">
            <Image
              src="/images/logo.png"
              alt="Shop Logo"
              height={1000}
              width={1000}
              className="h-full w-14 rounded drop-shadow-2xl"
            />
          </Link>
          <ul className="hidden md:flex items-center justify-start space-x-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classnames({
                  "text-white p-2 rounded-xl": link.href === currentPath,
                  "text-textPrimary": link.href !== currentPath,
                  "text-white": isScrolled,
                  "transition-colors hover:text-[#dbc547] p-2 rounded-xl": true,
                })}
              >
                {link.label}
              </Link>
            ))}
          </ul>
          <ul className="hidden md:flex items-center justify-start space-x-2">
            {linksAuth.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classnames({
                  "text-white p-2 rounded-xl": link.href === currentPath,
                  "text-textPrimary": link.href !== currentPath,
                  "text-white": isScrolled,
                  "transition-colors hover:text-[#dbc547] p-2 rounded-xl": true,
                })}
              >
                {link.label}
              </Link>
            ))}

            {auth && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-slate-900 bg-transparent border-0 hover:bg-slate-900 hover:text-white"
                  >
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                    className="flex flex-col space-y-1"
                  >
                    <Link href={"/profile"}>Profile</Link>
                    <Link href={"/orders"}>My Orders</Link>
                    <Link href={"/Settings"}>Settings</Link>
                    <Link href={"/logout"}>Logout</Link>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </ul>

          {open ? (
            <CgMenuMotion
              className="block md:hidden text-slate-300 text-3xl font-semibold cursor-pointer h-full"
              onClick={() => setIsOpen(!open)}
            />
          ) : (
            <TiThMenu
              className="block md:hidden text-slate-300 text-3xl cursor-pointer h-full"
              onClick={() => setIsOpen(!open)}
            />
          )}
        </div>
      </div>

      {/* mobile menu section */}
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <ul
        className={`w-8/12 absolute z-20 bg-white h-screen backdrop:bg-slate-400 left-0 -top-5 transform py-6 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {open && (
          <>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex p-4 text-slate-700 w-full hover:bg-secondaryColor hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
              </Link>
            ))}
            {linksAuth.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex p-4 text-slate-700 w-full hover:bg-secondaryColor hover:text-white"
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
