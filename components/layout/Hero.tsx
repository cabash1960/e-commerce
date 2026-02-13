"use client";

import Design from "@/app/ui/design";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";

function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!videoRef.current) return;

    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paragraphSplit = new SplitText(".paragraph", { type: "lines" });

    // Faster animations on mobile
    const animDuration = isMobile ? 1.2 : 1.8;
    const staggerAmount = isMobile ? 0.03 : 0.05;

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: animDuration,
      ease: "expo.out",
      opacity: 0,
      stagger: staggerAmount,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: animDuration,
      ease: "expo.out",
      stagger: isMobile ? 0.04 : 0.06,
      delay: isMobile ? 0.6 : 1,
    });

    gsap.from(".dotted", {
      opacity: 0,
      xPercent: 100,
      duration: animDuration,
      ease: "expo.out",
      stagger: isMobile ? 0.04 : 0.06,
    });

    // Optimized scroll values for mobile
    const startValue = isMobile ? "top 40%" : "center 60%";
    const endValue = isMobile ? "+=150%" : "+=200%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoRef.current,
        start: startValue,
        end: endValue,
        scrub: isMobile ? 0.5 : true, // Smoother scrub on mobile
        pin: true,
        pinSpacing: false,
        anticipatePin: 1, // Prevents jump on pin
      },
    });

    const setupVideoAnimation = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current?.duration || 0,
        ease: "none",
      });
    };

    if (videoRef.current.readyState >= 1) {
      setupVideoAnimation();
    } else {
      videoRef.current.onloadedmetadata = setupVideoAnimation;
    }
  }, [isMobile]);

  return (
    <section className="min-h-screen relative hero w-full z-0 flex items-center justify-center overflow-hidden">
      <h1 className="font-bold logo relative title text-5xl sm:text-6xl md:text-[16rem] text-[#4a4a4a] opacity-25 tracking-[0.2em] md:tracking-[0.2em]">
        CABASH
      </h1>

      {/* Improved mobile positioning */}
      <div className="text-3xl sm:text-4xl md:text-5xl paragraph text-left text-[#2a2a2a] font-extrabold logo absolute top-24 left-4 sm:top-32 sm:left-6 md:top-80 md:left-32 z-20 flex flex-col gap-2 md:gap-4 leading-tight">
        <p>
          TAKE <br />
          THE
          <br />
          STEP
        </p>
      </div>

      {/* Better mobile placement */}
      <p className="text-base sm:text-lg md:text-xl paragraph text-left text-[#0a0a0a] font-extrabold absolute bottom-24 right-4 sm:bottom-32 sm:right-6 md:top-1/2 md:right-32 z-20 underline decoration-[#FF6B35] decoration-2 md:decoration-4 underline-offset-2 md:underline-offset-4">
        NIKE AIRMAX 95
      </p>

      {/* Adjusted dot positions for mobile */}
      <div className="absolute top-2/3 md:top-3/4 -left-16 md:-left-10">
        <Design className="dotted scale-75 md:scale-100" />
      </div>
      <div className="absolute bottom-2/3 md:bottom-3/4 -right-16 md:-right-10">
        <Design className="dotted scale-75 md:scale-100" />
      </div>

      {/* Optimized video container */}
      <div className="w-full h-2/3 sm:h-3/4 md:h-[80%] video absolute -top-20 sm:-top-32 left-0 will-change-transform">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-bottom md:object-contain"
          muted
          playsInline
          preload="metadata"
          style={{ filter: "hue-rotate(180deg)" }}
          src="/videos/shoe_smooth_transparent.webm"
        ></video>
      </div>
    </section>
  );
}

export default Hero;
