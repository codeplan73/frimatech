"use client";

import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { menuLinks } from "./menuLinks";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const session = useSession();

  const logout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <nav className="z-10 flex items-center w-full px-5 py-5 mx-auto space-x-2 shadow-md bg-textPrimary md:bg-white">
      <ul className="flex items-center justify-between w-full space-x-4 md:hidden">
        {/* <Link href="/profile" className="block md:hidden">
          <div className="flex items-center justify-start space-x-2">
            <CiUser className="p-1 text-4xl border rounded-full hover:bg-warningColor hover:text-white hover:border-warningColor border-slate-500 drop-shadow-xl" />
          </div>
        </Link> */}

        <Image
          src="/images/logo.jpeg"
          alt="logo"
          height={100}
          width={100}
          className="rounded"
        />

        <IoMenuSharp
          className="block text-2xl cursor-pointer md:hidden"
          onClick={() => setIsOpen(!open)}
        />
      </ul>
      <ul className="items-center justify-end hidden w-full space-x-4 md:flex">
        <Link href="/settings">
          <div className="flex items-center justify-start space-x-2">
            <CiUser className="p-1 text-4xl border rounded-full hover:bg-warningColor hover:text-white hover:border-warningColor border-slate-500 drop-shadow-xl" />
            <div className="flex flex-col items-start text-sm ">
              <span className="font-bold">{session?.data?.user?.name}</span>
              <span>{session?.data?.user?.email}</span>
            </div>
          </div>
        </Link>
      </ul>

      {open && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-70"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <ul
        className={`w-8/12 absolute z-20 bg-textPrimary h-screen backdrop:bg-slate-400 -left-2 top-0 transform  p-2 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <Link href="/">
          <Image
            src="/images/logo.jpeg"
            alt="logo"
            height={100}
            width={100}
            className="w-full p-2 my-4 rounded-full"
          />
        </Link>
        {open &&
          menuLinks.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              onClick={() => setIsOpen(false)}
              className={classnames({
                "text-primaryColor bg-amber-50 rounded-xl":
                  link.link === currentPath,
                "text-slate-700": link.link !== currentPath,
                "flex text-lg items-center space-x-4 w-full hover:bg-amber-50 py-2 px-2 ":
                  true,
              })}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        <button
          className="flex items-center w-full px-4 py-4 space-x-4 text-lg hover:bg-amber-50"
          onClick={(e) => {
            logout();
            setIsOpen(false);
          }}
        >
          <span>
            <LuLogOut />
          </span>
          <span>Logout</span>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
