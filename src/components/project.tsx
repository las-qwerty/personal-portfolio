"use client";
import React, { useState, useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Eye, Globe, ShoppingCart } from 'lucide-react';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import VwtlImage from '@/assets/vwtl-image.png';
import GenCool from '@/assets/gencool.png';

const projects = [
    {
        id: 1,
        title: 'E-Commerce Shopify Store',
        description:
            'Developed and customized a complete Shopify e-commerce website for a clothing store, focusing on user experience and conversion optimization.',
        longDescription:
            'Created a clean looking clothing store on Shopify with custom theme modifications, product catalog management, inventory tracking, and payment gateway integration. Implemented responsive design principles and optimized for mobile shopping experience.',
        image:
            VwtlImage,
        tags: ['Shopify', 'Liquid', 'CSS', 'JavaScript', 'Payment Integration', 'Responsive Design'],
        category: 'Shopify',
        year: '2024',
        client: 'Vibe With The Legends',
        featured: true,
        stats: {
            dailysessions: '350+',
            mobile: '95%',
            speed: '3.3s',
        },
        highlights: [
            'Custom Shopify theme',
            'Mobile-first approach',
            'Payment gateway integration'
        ]
    },
    {
        id: 2,
        title: 'Business Portfolio',
        description:
            'Designed, developed, and fully customized a high-performance WordPress website for a leading business corporation, tailored to showcase their portfolio, services, and achievements.',
        longDescription:
            'Created a modern clothing store on Shopify with custom theme modifications, product catalog management, inventory tracking, and payment gateway integration. Implemented responsive design principles and optimized for mobile shopping experience.',
        image:
            GenCool,
        tags: ['WordPress', 'PHP', 'CSS','JavaScript', 'Responsive Design'],
        category: 'WordPress',
        year: '2024',
        client: 'Gencool HVAC Mechanical',
        featured: true,
        stats: {
            conversion: '+65%',
            mobile: '95%',
            sales: '+140%',
        },
        highlights: [
            'Custom WordPress theme',
            'Mobile-first approach',
        ]
    },
];

const categories = [
    'All',
    'WordPress',
    'Shopify',
];

// Enhanced project card component
type Project = typeof projects[number];

type ProjectCardProps = {
    project: Project;
    index: number;
    onSelect: (project: Project) => void;
};

const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'WordPress': return <Globe className="w-4 h-4" />;
            case 'Shopify': return <ShoppingCart className="w-4 h-4" />;
            default: return <Code className="w-4 h-4" />;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onSelect(project)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-gradient-to-r from-[#6F4E37] to-[#C68642] text-white border-0  rounded-full">
                            Featured
                        </Badge>
                    </div>
                )}

                {/* Project image */}
                <div className="relative overflow-hidden h-48">
                    <motion.div
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-full"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>

                    {/* Overlay with actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4"
                    >
                        <Button
                            size="sm"
                            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(project);
                            }}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                        </Button>
                    </motion.div>
                </div>

                {/* Project info */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs flex items-center rounded-full">
                            {getCategoryIcon(project.category)}
                            {project.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                            {project.year}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs rounded-full">
                                {tag}
                            </Badge>
                        ))}
                        {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{project.tags.length - 3}
                            </Badge>
                        )}
                    </div>

                    {/* Client */}
                    <div className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">Client: {project.client}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                        <div className="flex gap-4">
                            {Object.entries(project.stats)
                                .slice(0, 2)
                                .map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="font-medium text-foreground">
                                            {String(value)}
                                        </span>
                                        <span className="capitalize">{key}</span>
                                    </div>
                                ))}
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Project detail modal
type ProjectModalProps = {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-50 w-full md:w-3/4 lg:w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[90vh] rounded-3xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-colors"
                        >
                            ✕
                        </button>

                        <div className="h-full overflow-y-auto">
                            {/* Hero image */}
                            <div className="relative h-64 md:h-80">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 75vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <Badge className="bg-gradient-to-r from-[#6F4E37] to-[#C68642] text-white border-0 mb-2">
                                        {project.category}
                                    </Badge>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {project.title}
                                    </h2>
                                    <p className="text-white/80 text-lg">
                                        {project.client} • {project.year}
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                <div className="max-w-4xl mx-auto">
                                    {/* Description */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold mb-4">
                                            Project Overview
                                        </h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {project.longDescription}
                                        </p>
                                    </div>

                                    {/* Key Highlights */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold mb-4">
                                            Key Highlights
                                        </h3>
                                        <div className="grid gap-3">
                                            {project.highlights.map((highlight: string, index: number) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20">
                                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                                    <span>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech stack */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold mb-4">
                                            Technologies Used
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {project.tags.map((tag: string) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="text-sm px-4 py-2 rounded-full bg-white dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:text-white/80 hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold mb-4">
                                            Project Results
                                        </h3>
                                        <div className="grid grid-cols-3 gap-6">
                                            {Object.entries(project.stats).map(
                                                ([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="text-center p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20"
                                                    >
                                                        <div className="text-2xl font-bold text-primary mb-1">
                                                            {String(value)}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact CTA */}
                                    <div className="text-center p-6 rounded-2xl bg-white dark:bg-black shadow-2xl border border-white/20">
                                        <h4 className="text-lg font-bold mb-2">Interested in similar work?</h4>
                                        <p className="text-muted-foreground mb-4">Let&apos;s discuss your project requirements</p>
                                        <Button className="px-6 py-3 rounded-full">
                                            Get In Touch
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

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

// Main projects section component
export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);

    

    // Parallax effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const filteredProjects =
        activeCategory === 'All'
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <>
            <motion.section
                ref={containerRef}
                style={{ opacity }}
                className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative overflow-hidden"
                id="projects"
            >
                {/* Background elements */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                >
                    <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#6F4E37]/10 to-[#C68642]/10 rounded-full blur-xl" />
                    <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-[#6F4E37]/10 to-[#C68642]/10 rounded-full blur-xl" />
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        My{' '}
                        <span className="bg-gradient-to-r from-[#6F4E37] to-[#C68642] bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A showcase of real projects I&apos;ve built for clients, featuring WordPress development, 
                        e-commerce solutions, and custom web applications with measurable results.
                    </p>
                </motion.div>

                {/* Category filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-2xl ${
                                activeCategory === category
                                    ? 'bg-gradient-to-r from-[#6F4E37] to-[#C68642] text-white shadow-lg'
                                    : 'bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm border border-white/20'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onSelect={handleProjectSelect}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Experience summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 p-8 rounded-3xl bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/20"
                >
                    <h3 className="text-2xl font-bold mb-4">3+ Years of Experience</h3>
                    <p className="mb-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                        Self-taught web developer specializing in WordPress, Shopify, and modern web technologies. 
                        Focused on delivering user-friendly, responsive websites that drive real business results.
                    </p>
                    <AnimatedButton
              href="tel:09614650542"
            >
              Let&apos;s Work Together
            </AnimatedButton>
                </motion.div>
            </motion.section>

            {/* Project detail modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}