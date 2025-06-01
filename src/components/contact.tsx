"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare, Clock, Globe } from 'lucide-react';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import dynamic from 'next/dynamic';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

// TypeScript types for props
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary';
}
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary';
}
interface AnimatedButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// shadcn/ui components (matching your existing style)
const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: CardContentProps) => (
  <div className={`p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const Input = ({ className = "", ...props }: InputProps) => (
  <input
    className={`flex h-12 w-full rounded-2xl border border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }: TextareaProps) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-2xl border border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 resize-none ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = "" }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block ${className}`}
  >
    {children}
  </label>
);

const Button = ({ children, className = "", variant = "default", ...props }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants: { default: string; secondary: string } = {
    default: "bg-gradient-to-r from-[#6F4E37] to-[#C68642] text-white hover:shadow-lg hover:scale-105 px-8 py-3",
    secondary: "bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/70 dark:hover:bg-white/20 px-8 py-3"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = "", variant = "default" }: BadgeProps) => {
  const variants: { default: string; secondary: string } = {
    default: "bg-gradient-to-r from-[#6F4E37] to-[#C68642] text-white",
    secondary: "bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 text-foreground"
  };

  return (
    <div className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Animated Button Component (matching your existing pattern)
const AnimatedButton = ({ children, type = "button", disabled = false, onClick }: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`text-lg relative overflow-hidden group py-6 px-8 transition-all duration-300 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 w-full">
          {children}
          <ArrowRightIcon className="h-4 w-4 group-hover:opacity-100 duration-300 transform group-hover:-rotate-[50deg] transition-transform" />
        </span>
      </Button>
    </motion.div>
  );
};



// Contact Form Component
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const containerRef = useRef(null);

  // Parallax effects (matching your existing pattern)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      setIsSubmitting(false);
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            projectType: ''
          });
          setRecaptchaToken(null);
        }, 3000);
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert('An error occurred. Please try again later.');
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+63 961 465 0542",
      href: "tel:09614650542"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "lawrence.dev25@gmail.com",
      href: "mailto:lawrence.dev25@gmail.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Cavite, Philippines",
      href: null
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Response Time",
      value: "Within 24 hours",
      href: null
    }
  ];

  const services = [
    "WordPress Development",
    "Shopify E-commerce",
    "Custom Web Applications",
    "Website Optimization",
    "API Integration",
    "Website Migration"
  ];

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background elements (matching your existing pattern) */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#6F4E37]/10 to-[#C68642]/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-[#6F4E37]/10 to-[#C68642]/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-[#6F4E37]/5 to-[#C68642]/5 rounded-full blur-xl" />
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
          Let's{' '}
          <span className="bg-gradient-to-r from-[#6F4E37] to-[#C68642] bg-clip-text text-transparent">
            Work Together
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Ready to bring your digital vision to life? Get in touch and let's discuss 
          how I can help you build something amazing.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left Column - Description & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* About Section */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#6F4E37] to-[#C68642] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Lawrence A-J Soriano</h3>
                  <p className="text-muted-foreground">Web Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A passionate self-taught web developer with 3+ years of experience in WordPress, 
                Shopify, and modern web technologies. I specialize in creating responsive, 
                user-friendly websites that drive real business results.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1 shadow-2xl">
                  <Globe className="w-3 h-3" />
                  Available Worldwide
                </Badge>
                <Badge variant="secondary" className="shadow-2xl">Remote Work</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="flex items-center gap-4 p-3 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6F4E37] to-[#C68642] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-muted-foreground text-sm">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/20">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6F4E37] to-[#C68642] flex items-center justify-center text-white">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-muted-foreground text-sm">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardContent>
              <h3 className="text-xl font-bold mb-6">Services I Offer</h3>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/20"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-[#6F4E37] to-[#C68642] rounded-full" />
                    <span className="text-sm font-medium">{service}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#6F4E37] to-[#C68642] flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Send Me a Message</h3>
                      <p className="text-muted-foreground">I'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="shadow-2xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="shadow-2xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+63 XXX XXX XXXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="shadow-2xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectType">Project Type</Label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="flex h-12 w-full shadow-2xl rounded-2xl border border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]/50 focus-visible:ring-offset-2 transition-all duration-300"
                        >
                          <option value="">Select project type</option>
                          <option value="wordpress">WordPress Development</option>
                          <option value="shopify">Shopify E-commerce</option>
                          <option value="webapp">Custom Web App</option>
                          <option value="optimization">Website Optimization</option>
                          <option value="migration">Website Migration</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Brief description of your project"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="shadow-2xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me more about your project requirements, timeline, and budget..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="shadow-2xl"
                      />
                    </div>

                    <div className="flex justify-center my-4">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                        onChange={handleRecaptchaChange}
                      />
                    </div>

                    <AnimatedButton
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </AnimatedButton>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#C68642] flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#6F4E37]">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out! I'll review your message and get back to you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Badge variant="secondary" className="px-4 py-2">
                      Response within 24 hours
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2">
                      Project discussion available
                    </Badge>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}