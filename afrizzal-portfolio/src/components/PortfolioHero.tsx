"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface RotatingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  className,
  interval = 3000, // Sesuai dengan index.html Anda
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent text-uppercase", // Diubah untuk gradient-red-yellow dan text-uppercase
            className
          )}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

interface HeroProps {
  backgroundImage?: string;
  titlePart1: string; // Dipecah untuk styling berbeda jika perlu
  titlePart2: string;
  roles: string[];
  subtitle: string;
  className?: string;
  cta1_text?: string;
  cta1_link?: string;
  cta2_text?: string;
  cta2_link?: string;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  titlePart1,
  titlePart2,
  roles,
  subtitle,
  className,
  cta1_text = "Get in Touch",
  cta1_link = "#contact",
  cta2_text = "View My Work",
  cta2_link = "#projects",
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const checkIfInView = useCallback(() => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible && !isInView) {
      setIsInView(true);
    }
  }, [isInView]);

  useEffect(() => {
    checkIfInView();
    window.addEventListener("scroll", checkIfInView);
    return () => window.removeEventListener("scroll", checkIfInView);
  }, [checkIfInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Mengambil gaya font-weight-bolder dari index.html
  const titleBaseClass = "font-extrabold tracking-tight"; // Tailwind equivalent for font-weight-bolder

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative flex min-h-[calc(100vh-var(--header-height,0px))] w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 md:px-6", // bg-white dan min-h disesuaikan
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover", // Sesuai index.html
              backgroundPosition: "top center", // Sesuai index.html
              backgroundRepeat: "repeat", // Sesuai index.html
            }
          : { backgroundColor: "#FFF" } // Fallback jika tidak ada image
      }
    >
      {/* Overlay bisa ditambahkan jika diperlukan untuk kontras teks, tapi hero-bg.svg mungkin sudah cukup terang */}
      {/* {backgroundImage && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" /> 
      )} */}

      <motion.div
        className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center" // max-w-5xl mungkin perlu disesuaikan
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Bagian title disesuaikan dengan h2 dan span dari index.html */}
        <motion.div className="mb-2" variants={itemVariants}>
          <h2 className={cn(titleBaseClass, "mb-0 text-4xl sm:text-5xl md:text-6xl text-gray-800")}> 
            {titlePart1}
          </h2>
          <h2 className={cn(titleBaseClass, "text-4xl sm:text-5xl md:text-6xl")}> 
            <RotatingText
              texts={roles}
              className="font-bold" // Pastikan ini tidak override gradient
            />
          </h2>
        </motion.div>
        
        <motion.div className="my-8" variants={itemVariants}> {/* br br di index.html */}
           <div className="mx-auto" style={{maxWidth: "600px"}}> {/* Peningkatan dari 500px untuk readability */}
            <p className="text-lg text-gray-700 md:text-xl leading-relaxed"> {/* font-weight-normal text-dark */}
              {subtitle}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="bg-[#f7c25e] hover:bg-[#f7c25e]/90 text-gray-900">
            <Link href={cta1_link}>{cta1_text}</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-[#f7c25e] text-[#f7c25e] hover:bg-[#f7c25e]/10 hover:text-[#f7c25e]">
            <Link href={cta2_link}>{cta2_text}</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Shape divider bisa ditambahkan di sini jika ada, tapi di hero index.html tidak ada di bottom */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" /> */}
    </section>
  );
};

const PortfolioHeroFinal: React.FC = () => {
  return (
    <Hero
      titlePart1="Hi there! I'm a professional:"
      titlePart2="" // Bagian kedua bisa dikosongkan jika RotatingText langsung di bawah
      roles={[
        "Digital Marketers",
        "Full Stack Developer",
        "Cloud Engineer"
      ]}
      subtitle="A self-driven, quick starter, and passionate individual with curious mind who enjoys solving a complex and challenging a problem."
      // Pastikan path ini benar dan gambar ada di public/images/
      backgroundImage="/images/hero-bg.svg" 
      // Sesuaikan CTA jika perlu, atau hapus jika tidak ada di index.html bagian hero
      cta1_text="Hubungi Saya"
      cta1_link="/contact" // Link ke halaman kontak baru
      cta2_text="Lihat Proyek"
      cta2_link="/projects" // Link ke halaman proyek baru
    />
  );
};

export default PortfolioHeroFinal; 