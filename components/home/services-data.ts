import {
  Wrench,
  GraduationCap,
  Building2,
  Network,
  ShoppingBag,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export const services: Service[] = [
  {
    icon: Wrench,
    title: "Computer Repair",
    description:
      "Expert diagnosis and repair for laptops, desktops, and all in ones. Screen replacement, battery, keyboard, motherboard, and more.",
    link: "/shop",
  },
  {
    icon: GraduationCap,
    title: "COMPTIA Training",
    description:
      "Hands on certification training for COMPTIA A+, Network+, and Security+. Learn from certified instructors with real world experience.",
    link: "/training",
  },
  {
    icon: Building2,
    title: "IT Support",
    description:
      "Managed IT services for businesses. Network setup, cybersecurity, cloud migration, and ongoing technical support for your team.",
    link: "/contact",
  },
  {
    icon: Network,
    title: "Networking",
    description:
      "Network design, installation, and troubleshooting. From small office LANs to enterprise infrastructure, we keep you connected.",
    link: "/contact",
  },
  {
    icon: ShoppingBag,
    title: "Sales",
    description:
      "Quality computer accessories, parts, cables, adapters, and peripherals. Genuine products at competitive prices with warranty.",
    link: "/shop",
  },
  {
    icon: Settings,
    title: "Custom Solutions",
    description:
      "Tailored technology solutions for your specific needs. Custom PC builds, server configurations, and specialized hardware sourcing.",
    link: "/contact",
  },
];
