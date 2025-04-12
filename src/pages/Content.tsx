"use client"

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { DotBackground } from '@/components/dot-background';
import Link from 'next/link';

export default function Content() {
  const words = ["create", "build", "design", "develop"];
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    
      <main className="flex flex-col items-center justify-center h-auto">
        <DotBackground>
        <div className="flex flex-col items-center justify-center w-7xl pt-20 md:pt-40 pb-20 md:pb-40 z-10">
          <h1 className="text-4xl font-medium font-roboto text-center md:text-center">
            I'm Lawrence, a Web Developer
          </h1>
          <div className="text-4xl font-medium font-roboto h-12 overflow-hidden text-center md:text-center">
            <AnimatePresence mode="wait">
              <p>Let's <motion.span
                key={currentWord}
                initial={{ y: -40, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >{currentWord} </motion.span>something amazing</p>
            </AnimatePresence>
          </div>
          <div>
            <Badge variant="secondary" className="text-sm mt-4 rounded-full">Cavite, Philippines</Badge>
          </div>
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="tel:09614650542">
              <Button 
                variant="secondary"
                className="text-md mt-4 border-1 bg-white text-black relative overflow-hidden group hover:text-white pt-3 pb-3 pl-3 pr-3 rounded-full"
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-950 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                <span className="ml-1 hidden group-hover:inline transition-opacity duration-300 z-20"><ArrowRightIcon className="h-4 w-4" /></span>
              </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        </DotBackground>
      </main>
    
  );
}
