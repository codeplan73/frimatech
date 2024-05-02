"use client";

import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { menuLinks } from "./menuLinks";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";

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

  console.log(session);

  return (
    <nav className="w-full mx-auto px-5 py-5 flex items-center space-x-2  shadow-md z-10 bg-white">
      <ul className="flex md:hidden items-center justify-between w-full space-x-4">
        <IoMenuSharp
          className="block md:hidden cursor-pointer text-2xl"
          onClick={() => setIsOpen(!open)}
        />
        <Link href="/profile" className="block md:hidden">
          {session?.data?.user?.image ? (
            <div className="flex items-center justify-start space-x-2">
              <Image
                src={session?.data?.user?.image}
                alt={session?.data?.user?.name!}
                className="text-4xl rounded-full border-2 border-slate-500 drop-shadow-xl p-1"
              />
              <div className="flex flex-col items-start text-sm ">
                <span className="font-bold">{session?.data?.user?.name}</span>
                <span>{session?.data?.user?.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-start space-x-2">
              <CiUser className="text-4xl hover:bg-warningColor hover:text-white hover:border-warningColor rounded-full border border-slate-500 drop-shadow-xl p-1" />
              <div className="flex flex-col items-start text-sm ">
                <span className="font-bold">{session?.data?.user?.name}</span>
                <span>{session?.data?.user?.email}</span>
              </div>
            </div>
          )}
        </Link>
      </ul>
      <ul className="hidden md:flex items-center justify-end w-full space-x-4">
        <Link href="/notification">
          <IoMailOutline className="text-2xl hover:border-warningColor hover:text-warningColor rounded-full border border-slate-500 drop-shadow-xl p-1" />
        </Link>
        <Link href="/mail">
          <FaRegBell className="text-2xl hover:border-warningColor hover:text-warningColor rounded-full border border-slate-500 drop-shadow-xl p-1" />
        </Link>
        <Separator orientation="vertical" />
        <Link href="/profile">
          {session?.data?.user?.image ? (
            <Image
              src={session?.data?.user?.image}
              alt={session?.data?.user?.name!}
              className="text-4xl rounded-full border-2 border-slate-500 drop-shadow-xl p-1"
            />
          ) : (
            <div className="flex items-center justify-start space-x-2">
              <CiUser className="text-4xl hover:bg-warningColor hover:text-white hover:border-warningColor rounded-full border border-slate-500 drop-shadow-xl p-1" />
              <div className="flex flex-col items-start text-sm ">
                <span className="font-bold">{session?.data?.user?.name}</span>
                <span>{session?.data?.user?.email}</span>
              </div>
            </div>
          )}
        </Link>
      </ul>

      {open && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <ul
        className={`w-6/12 absolute z-20 bg-white h-screen backdrop:bg-slate-400 -left-2 top-0 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {open &&
          menuLinks.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              onClick={() => setIsOpen(false)}
              className={classnames({
                "text-primaryColor bg-amber-50 p-2 rounded-xl":
                  link.link === currentPath,
                "text-slate-700": link.link !== currentPath,
                "flex text-lg items-center space-x-4 w-full hover:bg-amber-50 py-4 px-4 ":
                  true,
              })}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        <button
          className="flex items-center text-lg space-x-4 w-full hover:bg-amber-50 py-4 px-4"
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
