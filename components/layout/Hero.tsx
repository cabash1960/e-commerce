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

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      opacity: 0,
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.from(".dotted", {
      opacity: 0,
      xPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    const startValue = isMobile ? "top 50%" : "center 50%"; // top screen
    const endValue = isMobile ? "120% top" : "+=300%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoRef.current,
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
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
    <section className="min-h-screen relative hero  w-full z-10  flex items-center justify-center overflow-hidden ">
      <h1 className="font-bold logo relative  title text-[16rem] text-[#4a4a4a]! opacity-25 tracking-[0.2em]">
        CABASH
      </h1>
      <div className="text-5xl paragraph text-left text-[#2a2a2a] font-extrabold logo absolute top-80 left-32 z-20 flex flex-col gap-4  ">
        <p>
          TAKE <br />
          THE
          <br />
          STEP
        </p>
      </div>
      <p className="text-xl paragraph text-left text-[#0a0a0a] font-extrabold absolute top-1/2 right-32 z-20 underline decoration-[#FF6B35] decoration-4 underline-offset-4">
        NIKE AIRMAX 95
      </p>
      <div className="absolute top-3/4 dot-left -left-10">
        <Design className="dotted" />
      </div>
      <div className="absolute bottom-3/4 dot-right -right-10">
        <Design className="dotted" />
      </div>
      <div className="w-full md:h-[80%] video h-3/4 absolute -top-32 left-0">
        <video
          ref={videoRef}
          className="w-full h-full md:object-contain object-cover object-bottom"
          muted
          style={{ filter: "hue-rotate(180deg)" }}
          src="/videos/shoe_smooth_transparent.webm"
          playsInline
          preload="auto"
        ></video>
      </div>
    </section>
  );
}

export default Hero;
