// components/LogoMarquee.tsx (updated with tooltips)
"use client";

import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Logo = {
  src: string;
  alt: string;
};

interface LogoMarqueeProps {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function LogoMarquee({
  logos,
  direction = "left",
  speed = "normal",
  className,
}: LogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Calculate animation duration based on speed
  const speedMap = {
    slow: "40s",
    normal: "25s",
    fast: "15s"
  };

  useEffect(() => {
    // Clone logos for seamless looping
    if (contentRef.current && containerRef.current) {
      const clone = contentRef.current.cloneNode(true);
      containerRef.current.appendChild(clone);
    }
  }, [logos]);

  return (
    <TooltipProvider>
      <Card className={cn("overflow-hidden bg-transparent border-none", className)}>
        <CardContent className="py-8 px-0">
          <div 
            ref={containerRef}
            className="flex w-max"
            style={{ 
              animation: `marquee-${direction} ${speedMap[speed]} linear infinite`,
            }}
          >
            <div ref={contentRef} className="flex items-center">
              {logos.map((logo, index) => (
                <div 
                  key={index} 
                  className="mx-12 transition-all duration-300 hover:scale-110 hover:brightness-110"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={120}
                            height={80}
                            className="max-h-20 w-auto object-contain filter drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-primary text-primary-foreground font-medium px-3 py-2 text-sm shadow-lg border"
                    >
                      <p>{logo.alt}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}