"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect, ReactNode, useRef, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { DotBackground } from "@/components/dot-background";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// Animated word component with realistic sketch underline
type AnimatedWordProps = {
  word: string;
};
const AnimatedWord = ({ word }: AnimatedWordProps) => {
  return (
    <span className="relative inline-block">
      <motion.span
        key={word}
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-gradient-to-r from-[#6F4E37] to-[#C68642] bg-clip-text text-transparent font-medium"
      >
        {word}
      </motion.span>

      {/* Hand-drawn sketch underline */}
      <motion.svg
        key={`${word}-underline`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { duration: 0.8, ease: "easeInOut", delay: 0.3 },
          opacity: { duration: 0.1, delay: 0.3 },
        }}
        width="100%"
        height="20"
        viewBox="0 0 120 20"
        className="absolute -bottom-2 left-0 w-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="my-gradient"
            x1="0"
            y1="0"
            x2="120"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6F4E37" />
            <stop offset="100%" stopColor="#C68642" />
          </linearGradient>
        </defs>
        <motion.path
          d="M8,14 Q18,11 28,13 Q38,15 48,12 Q58,10 68,13 Q78,15 88,12 Q98,11 108,14 Q112,15 115,13"
          stroke="url(#my-gradient)"
          strokeWidth="3.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0px 1px 2px rgba(233, 30, 99, 0.3))",
          }}
        />
        <motion.path
          d="M10,13 Q20,12 30,14 Q40,16 50,13 Q60,11 70,14 Q80,16 90,13 Q100,12 110,15"
          stroke="url(#my-gradient)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
      </motion.svg>
    </span>
  );
};

// Animated button component with variant support
type AnimatedButtonProps = {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  variant?: "primary" | "inverse";
};
const AnimatedButton = ({
  href,
  children,
  isExternal = false,
  variant = "primary",
}: AnimatedButtonProps) => {
  const isInverse = variant === "inverse";
  const buttonContent = (
    <Button
      variant="secondary"
      className={
        `text-lg border relative overflow-hidden group py-6 px-6 rounded-full transition-all duration-300 ` +
        (isInverse
          ? "bg-stone-900 text-white hover:text-black"
          : "bg-white text-black hover:text-white")
      }
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {children}
        <ArrowRightIcon className="h-4 w-4 group-hover:opacity-100 duration-300 transform group-hover:-rotate-[50deg] transition-transform" />
      </span>
      <span
        className={
          "absolute inset-0 transition-all duration-300 ease-in-out rounded-full " +
          (isInverse
            ? "bg-white w-0 group-hover:w-full"
            : "bg-gradient-to-r from-stone-900 to-stone-950 w-0 group-hover:w-full")
        }
      ></span>
    </Button>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {isExternal ? (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </Link>
      ) : (
        <Link href={href}>{buttonContent}</Link>
      )}
    </motion.div>
  );
};

// Parallax floating elements component
const ParallaxElements = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for various elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Floating geometric shapes with parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#6F4E37] to-[#C68642] rounded-full blur-sm"
      />

      <motion.div
        style={{ y: y2, rotate }}
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-[#6F4E37]/20 to-[#C68642]/20 rounded-lg"
      />

      <motion.div
        style={{ y: y3, scale }}
        className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-[#6F4E37]/20 to-[#C68642]/20 rounded-full"
      />

      <motion.div
        style={{ y: y1 }}
        className="absolute top-60 right-10 w-8 h-24 bg-gradient-to-b from-[#6F4E37]/20 to-[#C68642]/20 rounded-full blur-sm"
      />

      {/* Floating code symbols */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-32 right-1/4 text-6xl text-primary/10 font-mono select-none"
      >
        {"{"}
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-40 left-1/4 text-4xl text-primary/15 font-mono select-none"
      >
        &lt;/&gt;
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/2 left-10 text-5xl text-primary/12 font-mono select-none"
      >
        #
      </motion.div>
    </div>
  );
};

export default function Content() {
  const words = ["create", "build", "design", "develop"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const containerRef = useRef(null);

  // Fixed useEffect dependency warning by wrapping 'words' in useMemo
  const memoizedWords = useMemo(() => words, [words]);

  // Parallax effect for main content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = memoizedWords.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % memoizedWords.length;
        return memoizedWords[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [memoizedWords]);

  return (
    <main
      ref={containerRef}
      className="flex flex-col items-center justify-center pt-20 lg:pt-0 min-h-screen max-h-fit relative"
    >
      <DotBackground>
        <ParallaxElements />

        <motion.div
          style={{ y, opacity }}
          className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 py-20 md:py-40 z-10 relative"
        >
          {/* Main heading with subtle parallax */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-7xl font-medium font-roboto text-center mb-4 relative z-10"
          >
            Hi, I&apos;m Lawrence, a web developer
          </motion.h1>

          {/* Animated tagline */}
          <div className="text-3xl md:text-7xl font-medium font-roboto h-16 md:h-20 text-center mb-8 relative z-10">
            <p className="leading-tight">
              Let&apos;s{" "}
              <AnimatePresence mode="wait">
                <AnimatedWord key={currentWord} word={currentWord} />
              </AnimatePresence>{" "}
              something amazing
            </p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-center mt-4 mb-6 px-4 md:px-16 max-w-4xl leading-relaxed relative z-10"
          >
            A proficient Shopify and WordPress developer with expertise building
            and maintaining websites for different types of companies. My area
            of expertise is creating web platforms that are practical,
            responsive, and easy to use so that businesses can increase their
            online visibility.
          </motion.p>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10"
          >
            <Badge
              variant="secondary"
              className="text-sm mb-8 rounded-full px-4 py-1 flex items-center gap-1"
            >
              <MapPinIcon className="w-4 h-4 mr-1" />
              Cavite, Philippines
            </Badge>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-row justify-center gap-4 relative z-10"
          >
            <AnimatedButton href="tel:09614650542">Contact Me</AnimatedButton>
            <AnimatedButton
              href="/Lawrence-A-J-Soriano-CV.pdf"
              isExternal
              variant="inverse"
            >
              View CV
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </DotBackground>
    </main>
  );
}
