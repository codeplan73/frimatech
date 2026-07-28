"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {FaMapLocationDot, FaInstagram, FaYoutube} from "react-icons/fa6";
import {FiPhoneCall} from "react-icons/fi";
import {IoMailUnread} from "react-icons/io5";
import {FaXTwitter, FaFacebook, FaLinkedin} from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "react-toastify";

const quickLinks = [
  {label: "Training", href: "/training"},
  {label: "Repairs", href: "/shop"},
  {label: "Blog", href: "/posts"},
  {label: "Shop", href: "/shop"},
  {label: "About Us", href: "/about"},
  {label: "Contact", href: "/contact"},
];

const socials = [
  {name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com/frimatechnology"},
  {name: "Twitter", icon: <FaXTwitter />, href: "https://twitter.com/frimatechnology"},
  {name: "Facebook", icon: <FaFacebook />, href: "https://facebook.com/frimatechnology"},
  {name: "Youtube", icon: <FaYoutube />, href: "https://youtube.com/@frimatechnology"},
  {name: "LinkedIn", icon: <FaLinkedin />, href: "https://linkedin.com/company/frimatechnology"},
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
      });
      if (res.ok) {
        toast.success("Thanks for subscribing! Check your inbox for updates.");
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#E8D7BD] text-[#345B58]">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Company Description */}
        <div className="mb-12 max-w-2xl">
          <Link href="/" className="mb-4 inline-block">
            <Image
              src="/logo.png"
              alt="Frima Technology"
              height={60}
              width={60}
              className="h-12 w-auto drop-shadow-sm filter hue-rotate-90"
            />
          </Link>
          <p className="text-sm leading-relaxed text-[#345B58]/80">
            Frima Technology is your trusted partner for PC and laptop repairs,
            COMPTIA certification training, IT support services, and quality
            computer accessories. Serving Benin City and beyond with expert
            technology solutions since 2010.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#345B58]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#345B58]/70 transition-colors hover:text-[#345B58]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#345B58]">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[#345B58]/70">
                <FaMapLocationDot className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#345B58]" />
                <span>
                  15 Arala Street off Akenzuwa, Opposite Keystone Bank, Airport
                  Road, Benin City
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#345B58]/70">
                <FiPhoneCall className="h-4 w-4 flex-shrink-0 text-[#345B58]" />
                <a
                  href="tel:+2347060482923"
                  className="hover:text-[#345B58] transition-colors"
                >
                  +234 706 048 2923
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#345B58]/70">
                <IoMailUnread className="h-4 w-4 flex-shrink-0 text-[#345B58]" />
                <a
                  href="mailto:info@frimatechnology.com"
                  className="hover:text-[#345B58] transition-colors"
                >
                  info@frimatechnology.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#345B58]">
              Stay Updated
            </h3>
            <p className="mb-3 text-sm text-[#345B58]/70">
              Get the latest on new courses, products, and tech tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address for newsletter"
                className="h-10 min-w-0 border-[#345B58]/20 bg-white text-sm text-[#345B58] placeholder:text-[#345B58]/40"
              />
              <Button
                type="submit"
                disabled={subscribing}
                className="h-10 flex-shrink-0 bg-[#345B58] text-white hover:bg-[#2a4a47]"
              >
                {subscribing ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#345B58]">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#345B58]/10 text-xl text-[#345B58] transition-colors hover:bg-[#345B58] hover:text-[#E8D7BD]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#345B58]/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm text-[#345B58]/60 lg:flex-row lg:px-8">
          <p>
            &copy; 2022 – {currentYear} Frima Technology. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-[#345B58]"
            >
              Terms of Service
            </Link>
            <Link
              href="/policy"
              className="transition-colors hover:text-[#345B58]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
