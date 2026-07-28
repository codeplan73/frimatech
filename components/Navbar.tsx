"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Menu, X, ShoppingCart, ChevronDown, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCartStore from "@/store/cartStore";

const links = [
  {label: "Home", href: "/"},
  {label: "Shop", href: "/shop"},
  {label: "Blog", href: "/posts"},
  {label: "Training", href: "/training"},
  {label: "About Us", href: "/about"},
  {label: "Contact", href: "/contact"},
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const {items} = useCartStore();
  const cartCount = hydrated ? items() : 0;

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    const res = await fetch("/api/logout", {method: "POST"});
    if (res.ok) {
      router.push("/");
    }
  };

  const isActive = (href: string) => currentPath === href;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500  ${
        scrolled
          ? "bg-[#345B58] shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-black/50 via-black/30 to-transparent backdrop-blur-sm"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8"
        aria-label="Primary"
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Frima Technology"
            height={48}
            width={48}
            className="h-10 w-auto drop-shadow-sm filter hue-rotate-90"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-white/15 text-white"
                    : scrolled
                      ? "text-[#E8D7BD] hover:bg-white/10 hover:text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Cart */}
          <Link
            href="/cart"
            className={`relative rounded-lg p-2 transition-colors ${
              isActive("/cart")
                ? "bg-white/15 text-white"
                : scrolled
                  ? "text-[#E8D7BD] hover:bg-white/10 hover:text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
            }`}
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#dbc547] text-xs font-bold text-[#345B58]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}

          {/* Get a Quote CTA */}
          <Button
            asChild
            className="ml-2 bg-[#dbc547] text-[#345B58] hover:bg-[#c9b33a] font-semibold"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Hamburger + Cart */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/cart"
            className={`relative rounded-lg p-2 ${
              scrolled ? "text-[#E8D7BD]" : "text-white/90"
            }`}
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#dbc547] text-xs font-bold text-[#345B58]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-lg p-2 hover:bg-white/10 ${
              scrolled ? "text-[#E8D7BD]" : "text-white/90"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Slide-in Menu */}
        {mobileOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu Panel */}
            <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden">
              <div className="flex items-center justify-between border-b px-4 py-4">
                <span className="text-lg font-semibold text-[#345B58]">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col py-2 bg-slate-100 h-screen">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-[#345B58]/10 text-[#345B58]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#345B58]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                     
                <li className="px-4 pt-3">
                  <Button
                    asChild
                    className="w-full bg-[#dbc547] text-[#345B58] hover:bg-[#c9b33a] font-semibold"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                    >
                      Get a Quote
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
