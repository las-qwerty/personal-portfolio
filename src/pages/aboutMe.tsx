// app/about/page.tsx (updated)
"use client";

import Image from "next/image";
import AboutImage from "@/assets/about-me.png";
import TailwindImage from "@/assets/tailwind.png";
import { useEffect, useState } from "react";
import { LogoMarquee } from "@/components/logoMarquee";
import { cn } from "@/lib/utils";


// Sample logos - replace with your actual logo paths
const LOGOS = [
  { src: TailwindImage, alt: "Tailwind CSS" }, // Fixed: removed curly braces
  { src: TailwindImage, alt: "TypeScript" },
  { src: TailwindImage, alt: "React" },
  { src: TailwindImage, alt: "Node.js" },
  { src: TailwindImage, alt: "GraphQL" },
  { src: TailwindImage, alt: "Next.js" },
];

export default function AboutMe() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutMeSection = document.querySelector('.about-me');
      if (aboutMeSection) {
        const rect = aboutMeSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowContent(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-me max-w-7xl mx-auto min-h-auto pt-20 pb-32">
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-12">
        <div className={cn(
          "w-full md:w-1/2 flex justify-center items-stretch transition-all duration-700",
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Image 
            src={AboutImage} 
            alt="Lawrence A-J Soriano standing" 
            width={500} 
            height={350} 
            className="object-contain"
          />
        </div>
        
        <div className={cn(
          "w-full md:w-1/2 flex flex-col justify-start items-stretch transition-all duration-700 delay-200",
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h1 className="text-4xl font-bold text-primary">About Me</h1>
          <p className="pt-5 text-lg">
            Hello! I'm Lawrence A-J Soriano, a passionate web developer with a love for 
            creating dynamic and engaging web applications. With a background in computer 
            science and a keen eye for design, I strive to build user-friendly interfaces 
            that provide seamless experiences.
          </p>
          <p className="pt-4 text-lg">
            When I'm not coding, you can find me exploring the latest tech trends, 
            contributing to open-source projects, or enjoying a good book. I believe 
            in continuous learning and am always looking for new challenges to tackle.
          </p>

          <div className={cn(
        "mt-10 transition-all duration-1000 delay-300",
        showContent ? "opacity-100" : "opacity-0"
      )}>
        <h2 className="text-2xl font-semibold text-center mb-8 text-muted-foreground">
          Technologies I Work With
        </h2>
        <LogoMarquee 
          logos={LOGOS} 
          direction="left" 
          speed="normal"
          className="bg-background/50 backdrop-blur-sm rounded-xl py-2"
        />
      </div>
          
        </div>
        
      </div>
    </div>
  );
}