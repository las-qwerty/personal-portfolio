"use client";

import Image from "next/image";
import AboutImage from "@/assets/about-me.png";
import TailwindImage from "@/assets/tailwind.png";
import Html5Image from "@/assets/html-5.png";
import CssImage from "@/assets/css-3.png";
import Js from "@/assets/js.png";
import GraphQL from "@/assets/graphql.png";
import WordPress from "@/assets/wordpress.png";
import Shopify from "@/assets/shopify.png";
import { useEffect, useState, ReactNode, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";


// for future use, if I want to display logos in a marquee or grid
// const LOGOS = [
//   { src: WordPress.src, alt: "WordPress" },
//   { src: Shopify.src, alt: "Shopify" },
//   { src: TailwindImage.src, alt: "Tailwind CSS" },
//   { src: Html5Image.src, alt: "HTML 5" },
//   { src: CssImage.src, alt: "CSS" },
//   { src: Js.src, alt: "JavaScript" },
//   { src: GraphQL.src, alt: "GraphQL" },
// ];

const BADGES = [
  "WordPress",
  "Shopify",
  "HTML 5",
  "CSS 3",
  "JavaScript",
  "GraphQL",
  "Tailwind CSS",
  "React JS",
  "Next Js",
  "Web Flow",
  "Github",
  "Gitlab",
  "Postman",
  "Chat GPT",
  "Claude AI",
  "Deep Seek",
];

// Animated button component
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
      <Link
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {buttonContent}
      </Link>
    </motion.div>
  );
};

export default function AboutMe() {
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const handleScroll = () => {
      const aboutMeSection = document.querySelector(".about-me");
      if (aboutMeSection) {
        const rect = aboutMeSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowContent(true);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="about-me max-w-7xl mx-auto min-h-auto pt-20 pb-20 relative overflow-hidden md:pt-32 md:pb-32"
    >
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-12 relative z-10 pr-5 pl-5 md:pr-10 md:pl-10">
        <motion.div
          style={{ opacity }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          className={cn(
            "w-full md:w-1/2 flex justify-center items-center transition-all duration-700 relative",
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          {/* Enhanced floating arrows with parallax */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -50]),
              opacity,
            }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="absolute top-10 left-10 z-10 animate__animated animate__fadeInTopLeft animate__slow animate__infinite"
          >
            <div className="text-6xl text-primary/30 font-bold select-none pointer-events-none animate__animated animate__pulse animate__infinite animate__slower">
              &lt;
            </div>
          </motion.div>

          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, 30]),
              opacity,
            }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="absolute bottom-10 right-10 z-10 animate__animated animate__fadeInBottomRight animate__slow animate__infinite"
          >
            <div className="text-6xl text-primary/30 font-bold select-none pointer-events-none animate__animated animate__bounce animate__infinite animate__slower">
              &gt;
            </div>
          </motion.div>

          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -80]),
              opacity,
            }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="absolute top-1/4 left-5 z-10 animate__animated animate__fadeInLeft animate__delay-1s animate__slow animate__infinite"
          >
            <div className="text-4xl text-primary/20 font-bold select-none pointer-events-none animate__animated animate__heartBeat animate__infinite animate__slower">
              &lt;
            </div>
          </motion.div>

          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, 20]),
              opacity,
            }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="absolute bottom-1/4 right-5 z-10 animate__animated animate__fadeInRight animate__delay-2s animate__slow animate__infinite"
          >
            <div className="text-4xl text-primary/20 font-bold select-none pointer-events-none animate__animated animate__rubberBand animate__infinite animate__slower">
              &gt;
            </div>
          </motion.div>

          <Image
            src={AboutImage}
            alt="Lawrence A-J Soriano standing"
            width={500}
            height={350}
            className="object-contain relative z-10 mx-auto"
          />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          className={cn(
            "w-full md:w-1/2 flex flex-col justify-start items-stretch transition-all duration-700 delay-200 relative z-10",
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <h1 className="text-4xl font-bold text-primary">About Me</h1>
          <p className="pt-5 text-lg">
            Hi, I'm Lawrence A-J Soriano, a passionate and self-taught Web
            Developer specializing in WordPress and Shopify development. With
            over three years of hands-on experience, I help businesses and
            individuals bring their digital visions to life through clean,
            responsive, and high-performing websites. Whether it's crafting
            custom WordPress themes, optimizing Shopify stores, or ensuring
            every page loads fast and looks great on any device—I focus on
            delivering results that truly support your goals.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="skills-tools mt-8"
          >
            <h3 className="font-bold mb-4 text-lg md:text-xl">Skills & Tools</h3>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 mt-6">
              {BADGES.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="text-sm rounded-full px-4 py-1 flex items-center gap-2"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-row justify-start gap-4 pt-5"
          >
            <AnimatedButton href="tel:09614650542">Contact Me</AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
