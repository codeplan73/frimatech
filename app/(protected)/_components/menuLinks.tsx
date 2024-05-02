import { LuLayoutDashboard } from "react-icons/lu";
import { LuPoundSterling } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiSettings5Line } from "react-icons/ri";

export const clientLink = [
  {
    id: 1,
    label: "Dashboard",
    link: "/dasboard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,
    label: "My Orders",
    link: "/products",
    icon: <LuClipboardList />,
  },
  {
    id: 6,
    label: "Settings",
    link: "/settings",
    icon: <RiSettings5Line />,
  },
];

export const menuLinks = [
  {
    id: 1,
    label: "Dashboard",
    link: "/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,
    label: "Orderes",
    link: "/orders",
    icon: <LuPoundSterling />,
  },
  {
    id: 3,
    label: "Products",
    link: "/products",
    icon: <LuClipboardList />,
  },
  {
    id: 4,
    label: "Blog",
    link: "/blog",
    icon: <FiUsers />,
  },
  {
    id: 5,
    label: "Clients",
    link: "/clients",
    icon: <PiUsersThreeLight />,
  },
  {
    id: 6,
    label: "Settings",
    link: "/settings",
    icon: <RiSettings5Line />,
  },
];
