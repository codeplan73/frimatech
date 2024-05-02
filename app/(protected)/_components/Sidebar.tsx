"use client";
import React from "react";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { menuLinks } from "./menuLinks";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const logout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <aside className="bg-white hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 px-4 py-6 gap-6 shadow-lg z-10">
      <Image
        src="/images/logo.png"
        alt="logo"
        height={100}
        width={100}
        className="rounded-full"
      />
      <div className="flex flex-col justify-start h-full space-y-5">
        <ul className="flex flex-col space-y-5">
          {menuLinks.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              className={classnames({
                "text-primaryColor bg-amber-50 p-2 rounded-xl":
                  link.link === currentPath,
                "text-slate-700": link.link !== currentPath,
                "flex text-lg items-center space-x-3 hover:bg-amber-50 py-2 px-2 rounded-xl":
                  true,
              })}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </ul>

        <div className="flex flex-col items-start space-y-2">
          <button
            onClick={(e) => {
              logout();
            }}
            className="flex items-center text-lg space-x-4 w-full hover:bg-amber-50 py-2 px-2"
          >
            <span>
              <LuLogOut />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
