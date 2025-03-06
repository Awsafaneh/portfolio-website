"use client";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      // If on homepage and link starts with #, use smooth scroll
      if (pathname === "/") {
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
      } else {
        // If not on homepage, redirect to homepage
        router.push(`/${href}`);
      }
    } else {
      // Normal page navigation
      router.push(href);
    }

    setIsOpen(false);
  };

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full py-4 backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-bold text-xl hover:text-neutral-200 transition-colors"
        >
          ME
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex bg-neutral-900/50 backdrop-blur-sm rounded-full px-8 py-2 gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavigation(e, item.href)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 transition-transform duration-200 ease-in-out hover:scale-110"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-4 right-4 bg-neutral-900/95 backdrop-blur-sm md:hidden transform transition-all duration-300 ease-in-out rounded-2xl border border-neutral-800/50 ${
            isOpen
              ? "opacity-100 translate-y-2"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
                className="block py-2.5 text-neutral-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
