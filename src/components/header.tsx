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
import { useTheme } from "next-themes";
import Link from "next/link";

const ThemeLogo = ({ className = "" }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Link href="/" aria-label="Home">
      <span
        className={`font-bold text-3xl select-none ${className}`}
        style={{
          color: isDark ? "#fff" : "#000",
          fontFamily: "Roboto, sans-serif",
          letterSpacing: "-0.05em",
        }}
        aria-label="Logo"
      >
        L
      </span>
    </Link>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/", className: "group-hover:w-[100%]" },
    { name: "About", href: "#about", className: "group-hover:w-[100%]" },
    { name: "Projects", href: "#projects", className: "group-hover:w-[100%]" },
    { name: "Contact", href: "#contact", className: "group-hover:w-[100%]" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      {/* Floating glass container */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`
          flex items-center justify-between max-w-6xl mx-auto px-6 py-4 
          rounded-full transition-all duration-300 ease-out
          border border-white/30 dark:border-white/10
          shadow-xl shadow-black/10 dark:shadow-black/60
          ${
            isScrolled
              ? "backdrop-blur-2xl bg-white/40 dark:bg-transparent"
              : "backdrop-blur-xl bg-white/30 dark:bg-transparent"
          }
          ring-1 ring-white/40 dark:ring-white/10
        `}
      >
        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full hover:bg-white/20 dark:hover:bg-white/10"
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
        <motion.div
          className="md:items-end"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/">
            {mounted && <ThemeLogo className="hidden md:block" />}
          </Link>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <div className="flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <NavigationMenuLink
                    href={item.href}
                    className="text-sm font-roboto font-medium hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 origin-center group-hover:w-[calc(100%-24px)] group-hover:left-3"></span>
                  </NavigationMenuLink>
                </motion.div>
              ))}
            </div>
          </NavigationMenu>
        </div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ModeToggle />
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mounted && mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-3/4 max-w-xs rounded-3xl backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-white/20 dark:border-white/10 shadow-xl z-50 md:hidden overflow-hidden"
            >
              {/* Close Button*/}
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                type="button"
              >
                <motion.span
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ rotate: 180, scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  style={{ display: "inline-block" }}
                >
                  <X className="h-6 w-6" />
                </motion.span>
              </button>
              <motion.div
                className="flex flex-col p-6 space-y-6 h-full"
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
                  className="flex justify-between items-center pb-4 border-b border-white/10 dark:border-white/5"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    {mounted && <ThemeLogo />}
                  </Link>
                </motion.div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4">
                  {navigation.map((item, i) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-base font-roboto font-medium hover:text-primary relative group w-fit px-4 py-3 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.05 * (i + 2),
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 origin-left group-hover:w-full"></span>
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
