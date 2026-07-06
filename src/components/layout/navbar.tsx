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
  SheetHeader,
  SheetFooter,
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
              <SheetContent side="right" className="w-full sm:max-w-sm p-0">
                <div className="flex h-full flex-col bg-popover p-6">
                  <SheetHeader className="items-start gap-1 px-0 pb-4 border-b border-border">
                    <img
                      src="/fontlogo.svg"
                      alt="TugasKelar.io Logo"
                      className="h-15 w-30 rounded-2xl object-contain"
                    />
                    <div>
                      <SheetTitle className="text-lg font-semibold">
                        Menu Utama
                      </SheetTitle>
                      <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                        Kami Kelarin Tugasmu! Dapatkan bantuan profesional untuk tugas, makalah, coding, dan skripsi dengan cepat dan aman.
                      </p>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="rounded-2xl py-3 text-base font-medium text-foreground hover:bg-secondary/70 hover:text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <SheetFooter className="mt-6 px-0 pt-4 border-t border-border">
                    <Link href="/order" className="w-full">
                      <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                        Buat Pesanan
                      </Button>
                    </Link>
                  </SheetFooter>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}