import {
  Wrench,
  GraduationCap,
  Building2,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export interface HeroSlide {
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const heroSlides: HeroSlide[] = [
  {
    image:
      "/images/bg-2.png",
    imageAlt:
      "Professional computer and laptop repair service at a workbench",
    icon: Wrench,
    heading: "Computer Sales Repair and Maintainace",
    subtitle:
      "Fast, reliable repairs for all brands. From screen replacements to motherboard fixes, our certified technicians get your device back to peak performance.",
    ctaText: "Shop Repairs",
    ctaLink: "/shop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop&auto=format",
    imageAlt:
      "Students in a technology training classroom with computers",
    icon: GraduationCap,
    heading: "Technology Trainings on IT Support and Networking",
    subtitle:
      "Launch your IT career with expert led COMPTIA A+, Network+, and Security+ training. Hands on labs, exam prep, and career guidance included.",
    ctaText: "View Training",
    ctaLink: "/training",
  },
  {
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&auto=format",
    imageAlt: "IT support team working in a modern office server room",
    icon: Building2,
    heading: "IOT and Technology Security",
    subtitle:
      "Keep your business running smoothly with our managed IT support services. Network setup, cybersecurity, cloud migration, and ongoing maintenance.",
    ctaText: "Contact Us",
    ctaLink: "/contact",
  },
  {
    image:
      "/images/bg-1.png",
    imageAlt:
      "Computer accessories, cables, and parts displayed on a shelf",
    icon: ShoppingBag,
    heading: "Quality Accessories & Parts",
    subtitle:
      "Browse our selection of genuine computer accessories, replacement parts, cables, adapters, and peripherals at competitive prices with fast delivery.",
    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
];
