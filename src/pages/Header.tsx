"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenuLink,
  NavigationMenu,
} from "@radix-ui/react-navigation-menu";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import LogoWhite from "@/assets/logo-white.png";
import Link from "next/link";
import { useTheme } from "next-themes";

const ThemeLogo = ({ className = "" }) => {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? LogoWhite : Logo;

  return (
    <Image
      src={logoSrc}
      alt="logo"
      width={40}
      height={40}
      className={className}
      priority
    />
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navigation = [
    { name: "Home", href: "/", className: "group-hover:w-[70%]" },
    { name: "About", href: "/about", className: "group-hover:w-[70%]" },
    { name: "Projects", href: "/projects", className: "group-hover:w-[80%]" },
    { name: "Contact", href: "/contact", className: "group-hover:w-[80%]" },
  ];

  return (
    <header className="relative sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileMenuOpen ? "close" : "menu"}
              initial={{ rotate: mobileMenuOpen ? -90 : 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: mobileMenuOpen ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>

        {/* Logo */}
        <div className="md:items-end">
          <Link href="/">
            {mounted && <ThemeLogo className="hidden md:block" />}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuLink>
            {navigation.map((item) => (
              <NavigationMenuLink
                key={item.name}
                href={item.href}
                className="text-sm font-roboto font-medium pr-4 hover:text-primary transition-colors relative group text-center"
              > 
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 origin-left ${item.className}`}
                ></span>
              </NavigationMenuLink>
            ))}
          </NavigationMenuLink>
        </NavigationMenu>

        {/* Mode Toggle */}
        <ModeToggle />
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mounted && mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 h-screen w-3/4 max-w-xs bg-background border-r z-50 md:hidden overflow-hidden"
          >
            <motion.div
              className="flex flex-col p-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.1,
                staggerChildren: 0.05,
                delayChildren: 0.05,
              }}
            >
              {/* Logo in mobile menu */}
              <motion.div
                className="flex justify-between items-center pb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
              >
                <Link href="/">{mounted && <ThemeLogo />}</Link>
              </motion.div>

              {navigation.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-roboto hover:text-primary relative group w-fit ${item.className}`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.05 * (i + 1),
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  whileHover={{ x: 5 }}
                >
                  <span className="relative px-1 font-medium">
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 origin-left ${item.className}`}></span>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
