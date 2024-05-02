import { LuLayoutDashboard } from "react-icons/lu";
import { LuPoundSterling } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiSettings5Line } from "react-icons/ri";

export const menuLinks = [
  {
    id: 1,
    label: "Dashboard",
    link: "/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,
    label: "Payments",
    link: "/payments",
    icon: <LuPoundSterling />,
  },
  {
    id: 3,
    label: "All Bookings",
    link: "/bookings",
    icon: <LuClipboardList />,
  },
  {
    id: 4,
    label: "All Staff",
    link: "/users",
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
