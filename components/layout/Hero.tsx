"use client";

import Design from "@/app/ui/design";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";

function Hero() {
  useGSAP(() => {
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

    return () => {
      heroSplit.revert();
      paragraphSplit.revert();
    };
  }, []);
  return (
    <div className="min-h-screen relative hero  w-full z-10  flex items-center justify-center overflow-hidden ">
      <h1 className="font-bold logo relative  title text-[16rem] text-[#4a4a4a]! opacity-25 tracking-[0.2em]">
        CABASH
      </h1>
      <div className="text-5xl paragraph text-left text-[#2a2a2a] font-extrabold logo absolute top-80 left-30 flex flex-col gap-4  ">
        <p>
          TAKE <br />
          THE
          <br />
          STEP
        </p>
      </div>
      <p className="text-xl paragraph text-left text-[#0a0a0a] font-extrabold absolute top-1/2 right-30 underline decoration-[#FF6B35] decoration-4 underline-offset-4">
        NIKE AIRMAX 95
      </p>
      <div className="absolute top-3/4 dot-left -left-10">
        <Design className="dotted" />
      </div>
      <div className="absolute bottom-3/4 dot-right -right-10">
        <Design className="dotted" />
      </div>
    </div>
  );
}

export default Hero;
