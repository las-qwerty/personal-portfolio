"use client";
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export default function MouseEffect() {
    useEffect(() => {
        gsap.set('.ball', { xPercent: -50, yPercent: -50, zIndex: 9999 });
        const targets = gsap.utils.toArray('.ball');
        const handleMouseMove = (e: MouseEvent) => {
            gsap.to(targets, {
                duration: 0.5,
                x: e.clientX,
                y: e.clientY,
                ease: 'power1.out',
                overwrite: 'auto',
                stagger: 0.02,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className="ball bg-black dark:bg-white w-4 h-4 fixed top-0 left-0 rounded-full pointer-events-none hidden md:block"></div>
            <div className="ball bg-black dark:bg-white w-4 h-4 fixed top-0 left-0 rounded-full pointer-events-none hidden md:block"></div>
            <div className="ball bg-black dark:bg-white w-4 h-4 fixed top-0 left-0 rounded-full pointer-events-none hidden md:block"></div>
            <div className="ball bg-black dark:bg-white w-4 h-4 fixed top-0 left-0 rounded-full pointer-events-none hidden md:block"></div>
            <div className="ball bg-black dark:bg-white w-4 h-4 fixed top-0 left-0 rounded-full pointer-events-none hidden md:block"></div>
        </>
    );
}