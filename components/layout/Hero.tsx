"use client";

import Design from "@/app/ui/design";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Image from "next/image";

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const heroSplit = new SplitText(".title", { type: "chars" });
    const paragraphSplit = new SplitText(".paragraph", { type: "lines" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });

    // Smooth premium shoe movement
    tl.to(".object", {
      x: 180,
      y: 150,
      scale: 0.6,
      rotate: 45,
      ease: "power2.out",
    });

    // Heading animation
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      opacity: 0,
      stagger: isMobile ? 0.03 : 0.05,
      duration: 1.4,
      ease: "expo.out",
    });

    // Paragraph animation
    gsap.from(paragraphSplit.lines, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1.4,
      delay: 0.6,
      ease: "expo.out",
    });
  }, [isMobile]);

  return (
    <section
      ref={heroRef}
      aria-label="Hero showcase for Nike Airmax 95"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 
    bg-[radial-gradient(ellipse_at_center,#985125_0%,#5a2d12_100%)]"
      />

      <div
        className="absolute inset-0 
    bg-gradient-to-b from-black/40 via-transparent to-black/40"
      />

      <div
        className="absolute top-1/2 left-1/2 w-[min(900px,90vw)] aspect-square
    -translate-x-1/2 -translate-y-1/2
    bg-[radial-gradient(circle,rgba(255,160,90,0.3)_0%,transparent_70%)]
    blur-3xl pointer-events-none"
      />

      {/* Single noise texture */}
      <div className="absolute inset-0 noise opacity-20 mix-blend-overlay pointer-events-none" />

      <h1
        className="title absolute font-bold text-7xl md:text-[16rem]
    bg-gradient-to-b from-[#F5EDE6] to-[#8a7a6d]
    bg-clip-text text-transparent
    opacity-20 md:opacity-30 blur-[1px]
    tracking-[0.2em] select-none pointer-events-none"
      >
        CABASH
      </h1>

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-0">
        {/* Main Heading */}
        <div className="md:absolute md:top-80 md:left-32">
          <p
            className="title text-4xl sm:text-5xl md:text-6xl text-white font-extrabold 
        leading-tight drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]"
          >
            TAKE <br />
            THE
            <br />
            STEP
          </p>
        </div>

        {/* Product Name Badge */}
        <div className="md:absolute md:top-1/2 md:right-32 self-end md:self-auto mt-auto md:mt-0">
          <p
            className="paragraph text-lg sm:text-xl md:text-2xl font-bold
        bg-gradient-to-r from-[#FF6B35] to-[#FFB26B] 
        text-white px-6 py-3 rounded-lg
        shadow-[0_8px_24px_rgba(255,107,53,0.4)]
        border border-white/20"
          >
            NIKE AIRMAX 95
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2/3 -left-10 opacity-60">
        <Design className="scale-75 md:scale-100" />
      </div>
      <div className="absolute bottom-2/3 -right-10 opacity-60">
        <Design className="scale-75 md:scale-100" />
      </div>

      {/* Shoe Image */}
      <div
        className="object absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-[85%] sm:w-[70%] md:w-[55%] max-w-[700px] z-10"
      >
        <Image
          src="/her-img.png"
          width={800}
          height={800}
          alt="Nike Airmax 95 premium athletic shoe"
          className="w-full h-full object-contain rotate-[330deg]
        drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]
        filter brightness-110"
          priority
        />
      </div>
    </section>
  );
}

export default Hero;
