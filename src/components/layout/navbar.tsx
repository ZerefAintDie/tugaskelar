"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
// import { ThemeToggle } from "../shared/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "../ui/sheet";

const navLinks = [
  { name: "Layanan", href: "#services" },
  { name: "Cara Kerja", href: "#how-it-works" },
  // { name: "Testimoni", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 transition-all duration-300 rounded-3xl border border-border ${
        isScrolled
          ? "bg-white backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-md shadow-lg"
      }`}
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between h-12">
          {/* Logo / Brand */}
          <div className="mb-8">
            <img src="/fontlogo.svg" alt="TugasKelar.io Logo" className="h-25 w-25 pt-7 cursor-pointer" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary/80 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            {/* <Link href="/admin/login">
              <Button variant="ghost" className="text-sm font-medium">
                Admin
              </Button>
            </Link> */}
            <Link href="/order">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-6">
                Buat Pesanan
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mr-2 h-10 w-10 rounded-full border border-border/70 bg-background/80 shadow-sm transition-colors hover:bg-accent/80"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Buka menu utama</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="text-left font-heading font-bold mb-6">
                  Menu Navigasi
                </SheetTitle>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-2 py-1 text-lg font-medium text-foreground hover:text-primary/80 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-6 mt-6 border-t border-border flex flex-col space-y-3">
                    <Link href="/order" className="w-full">
                      <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                        Buat Pesanan
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}