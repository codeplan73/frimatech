import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const links = [
  {
    label: "Account Settings",
    href: "/settings/account",
    description: "Customize your account settings",
  },
  {
    label: "Password Settings",
    href: "/settings/password",
    description: "Change Password",
  },
  {
    label: "Notification Settings",
    href: "/settings/notification",
    description: "Manage your notification settings",
  },
  {
    label: "Billing Settings",
    href: "/settings/billing",
    description: "Manage your billing settings",
  },
  {
    label: "Subscription Settings",
    href: "/settings/subscription",
    description: "Manage your subscription settings",
  },
  {
    label: "Security Settings",
    href: "/settings/security",
    description: "Manage your security settings",
  },
  {
    label: "Privacy Settings",
    href: "/settings/privacy",
    description: "Manage your privacy settings",
  },
  {
    label: "Support Settings",
    href: "/settings/support",
    description: "Manage your support settings",
  },
  {
    label: "Help Settings",
    href: "/settings/help",
    description: "Manage your help settings",
  },
  {
    label: "Feedback Settings",
    href: "/settings/feedback",
    description: "Manage your feedback settings",
  },
  {
    label: "Logout",
    href: "/settings/logout",
    description: "Logout from your account",
  },
];

const SettingLink = () => {
  return (
    <div className="flex flex-col gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="border rounded-md py-8 px-4  bg-slate-50 flex items-center justify-between shadow-sm"
        >
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">{link.label}</h4>
            <p className="text-xs text-slate-500">{link.description}</p>
          </div>
          <IoIosArrowForward className="" />
        </Link>
      ))}
    </div>
  );
};

export default SettingLink;
