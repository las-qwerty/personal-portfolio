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
import { useEffect, useState, ReactNode, useRef } from "react";
import { LogoMarquee } from "@/components/logoMarquee";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import * as THREE from "three";

const LOGOS = [
  { src: WordPress.src, alt: "WordPress" },
  { src: Shopify.src, alt: "Shopify" },
  { src: TailwindImage.src, alt: "Tailwind CSS" },
  { src: Html5Image.src, alt: "HTML 5" },
  { src: CssImage.src, alt: "CSS" },
  { src: Js.src, alt: "JavaScript" },
  { src: GraphQL.src, alt: "GraphQL" },
];

// Three.js Background Component
const ThreeJSBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const particlesRef = useRef<THREE.Points>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: '#6F4E37',
      transparent: true,
      opacity: 0.8,
    });

    // Particles mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;

    // Add some geometric shapes
    const geometries = [
      new THREE.TetrahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.3),
      new THREE.SphereGeometry(0.4, 8, 6),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: '#C68642', 
        wireframe: true, 
        transparent: true, 
        opacity: 0.3 
      }),
      new THREE.MeshBasicMaterial({ 
        color: '#6F4E37', 
        wireframe: true, 
        transparent: true, 
        opacity: 0.4 
      }),
      new THREE.MeshBasicMaterial({ 
        color: '#8B4513', 
        wireframe: true, 
        transparent: true, 
        opacity: 0.2 
      }),
    ];

    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Animation
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.001;
        particlesRef.current.rotation.y += 0.002;
      }

      // Animate geometric shapes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 * (index + 1);
        mesh.rotation.y += 0.005 * (index + 1);
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      // Mouse interaction
      if (particlesRef.current) {
        particlesRef.current.rotation.x = mouseY * 0.1;
        particlesRef.current.rotation.y = mouseX * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.clear();
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometries.forEach(geo => geo.dispose());
      materials.forEach(mat => mat.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

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
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
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

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="about-me max-w-7xl mx-auto min-h-auto pt-20 pb-32 relative overflow-hidden"
    >
      {/* Three.js Background */}
      <ThreeJSBackground />
      
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-12 relative z-10">
        <motion.div
          style={{ y: imageY }}
          className={cn(
            "w-full md:w-1/2 flex justify-center items-stretch transition-all duration-700 relative",
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          {/* Enhanced floating arrows with parallax */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
            className="absolute top-10 left-10 z-10 animate__animated animate__fadeInTopLeft animate__slow animate__infinite"
          >
            <div className="text-6xl text-primary/30 font-bold select-none pointer-events-none animate__animated animate__pulse animate__infinite animate__slower">
              &lt;
            </div>
          </motion.div>

          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
            className="absolute bottom-10 right-10 z-10 animate__animated animate__fadeInBottomRight animate__slow animate__infinite"
          >
            <div className="text-6xl text-primary/30 font-bold select-none pointer-events-none animate__animated animate__bounce animate__infinite animate__slower">
              &gt;
            </div>
          </motion.div>

          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
            className="absolute top-1/4 left-5 z-10 animate__animated animate__fadeInLeft animate__delay-1s animate__slow animate__infinite"
          >
            <div className="text-4xl text-primary/20 font-bold select-none pointer-events-none animate__animated animate__heartBeat animate__infinite animate__slower">
              &lt;
            </div>
          </motion.div>

          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
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
            className="object-contain relative z-10"
          />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className={cn(
            "w-full md:w-1/2 flex flex-col justify-start items-stretch transition-all duration-700 delay-200 relative z-10",
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <h1 className="text-4xl font-bold text-primary">About Me</h1>
          <p className="pt-5 text-lg">
            Hello! I'm Lawrence A-J Soriano, a passionate web developer with a
            love for creating dynamic and engaging web applications. With a
            background in computer science and a keen eye for design, I strive
            to build user-friendly interfaces that provide seamless experiences.
          </p>
          <p className="pt-4 text-lg">
            When I'm not coding, you can find me exploring the latest tech
            trends, contributing to open-source projects, or enjoying a good
            book. I believe in continuous learning and am always looking for new
            challenges to tackle.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-row justify-start gap-4 pt-5"
          >
            <AnimatedButton href="tel:09614650542">Contact Me</AnimatedButton>
          </motion.div>

          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
            className={cn(
              "mt-10 transition-all duration-1000 delay-300",
              showContent ? "opacity-100" : "opacity-0"
            )}
          >
            <h2 className="text-2xl font-semibold text-center mb-8 text-muted-foreground">
              Technologies I Work With
            </h2>
            <LogoMarquee
              logos={LOGOS}
              direction="left"
              speed="normal"
              className="bg-background/50 backdrop-blur-sm rounded-xl py-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}