import { LuLayoutDashboard } from "react-icons/lu";
import { LuPoundSterling } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiSettings5Line } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { GrBlog } from "react-icons/gr";
import { FcProcess } from "react-icons/fc";

export const clientLink = [
  // {
  //   id: 1,
  //   label: "Dashboard",
  //   link: "/dashboard",
  //   icon: <LuLayoutDashboard />,
  // },
  {
    id: 2,
    label: "My Orders",
    link: "/orders",
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
    label: "Orders",
    link: "/orders",
    icon: <FcProcess />,
  },
  {
    id: 3,
    label: "Products",
    link: "/products",
    icon: <LuClipboardList />,
  },
  {
    id: 4,
    label: "Category",
    link: "/categories",
    icon: <MdOutlineCategory />,
  },
  {
    id: 4,
    label: "Blog",
    link: "/blog",
    icon: <GrBlog />,
  },
  {
    id: 5,
    label: "Users",
    link: "/users",
    icon: <PiUsersThreeLight />,
  },
  {
    id: 6,
    label: "Settings",
    link: "/settings",
    icon: <RiSettings5Line />,
  },
];
