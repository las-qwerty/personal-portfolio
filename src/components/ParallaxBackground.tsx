import React, { useEffect, useState } from "react";

interface ParallaxBackgroundProps {
  className?: string;
  speed?: number; // Higher = slower movement
  children: React.ReactNode;
  imageUrl?: string; // Optional: custom background image
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  className = "",
  speed = 4,
  children,
  imageUrl,
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY / speed);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          backgroundAttachment: "fixed",
          backgroundPosition: `center ${offset}px`,
          backgroundSize: "cover",
          transition: "background-position 0.2s cubic-bezier(0.4,0,0.2,1)",
          opacity: 0.7,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
