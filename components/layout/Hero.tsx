"use client";

import Design from "@/app/ui/design";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";

function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Chroma key processing
  useEffect(() => {
    const video = hiddenVideoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    let isProcessing = false;

    const processFrame = () => {
      if (!isProcessing) return;

      // Set canvas size to match video
      if (
        canvas.width !== video.videoWidth ||
        canvas.height !== video.videoHeight
      ) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Chroma key - adjust these based on your background color
      const keyColor = { r: 0, g: 255, b: 0 }; // Green screen
      const threshold = 50;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate color difference
        const diff = Math.sqrt(
          Math.pow(r - keyColor.r, 2) +
            Math.pow(g - keyColor.g, 2) +
            Math.pow(b - keyColor.b, 2),
        );

        // Make transparent if close to key color
        if (diff < threshold) {
          data[i + 3] = 0; // Set alpha to 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameRef.current = requestAnimationFrame(processFrame);
    };

    const startProcessing = () => {
      isProcessing = true;
      processFrame();
    };

    const stopProcessing = () => {
      isProcessing = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    // Auto-play the video
    const playVideo = async () => {
      try {
        await video.play();
        startProcessing();
      } catch (err) {
        console.error("Video play failed:", err);
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      stopProcessing();
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const targetVideo = hiddenVideoRef.current;
    if (!targetVideo) return;

    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paragraphSplit = new SplitText(".paragraph", { type: "lines" });

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

    const startValue = isMobile ? "top 40%" : "center 60%";
    const endValue = isMobile ? "+=150%" : "+=200%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: canvasRef.current,
        start: startValue,
        end: endValue,
        scrub: isMobile ? 0.5 : true,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update video time based on scroll
          if (targetVideo.duration) {
            targetVideo.currentTime = self.progress * targetVideo.duration;
          }
        },
      },
    });

    // Remove the old video animation since we're using onUpdate now
  }, [isMobile]);

  return (
    <section className="min-h-screen relative hero w-full z-0 flex items-center justify-center overflow-hidden">
      <h1 className="font-bold logo relative title text-5xl sm:text-6xl md:text-[16rem] text-[#4a4a4a] opacity-25 tracking-[0.15em] md:tracking-[0.2em]">
        CABASH
      </h1>

      <div className="text-3xl sm:text-4xl md:text-5xl paragraph text-left text-[#2a2a2a] font-extrabold logo absolute top-24 left-4 sm:top-32 sm:left-6 md:top-80 md:left-32 z-20 flex flex-col gap-2 md:gap-4 leading-tight">
        <p>
          TAKE <br />
          THE
          <br />
          STEP
        </p>
      </div>

      <p className="text-base sm:text-lg md:text-xl paragraph text-left text-[#0a0a0a] font-extrabold absolute bottom-24 right-4 sm:bottom-32 sm:right-6 md:top-1/2 md:right-32 z-20 underline decoration-[#FF6B35] decoration-2 md:decoration-4 underline-offset-2 md:underline-offset-4">
        NIKE AIRMAX 95
      </p>

      <div className="absolute top-2/3 md:top-3/4 -left-6 md:-left-10">
        <Design className="dotted scale-75 md:scale-100" />
      </div>
      <div className="absolute bottom-2/3 md:bottom-3/4 -right-6 md:-right-10">
        <Design className="dotted scale-75 md:scale-100" />
      </div>

      <div className="w-full h-2/3 sm:h-3/4 md:h-[80%] video absolute -top-20 sm:-top-32 left-0 will-change-transform">
        {/* Hidden video for processing */}
        <video
          ref={hiddenVideoRef}
          className="hidden"
          muted
          playsInline
          preload="auto"
          loop
          src="/videos/shoe_smooth_transparent.webm"
        ></video>

        {/* Canvas displays the processed video */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover object-bottom md:object-contain"
          style={{ filter: "hue-rotate(180deg)" }}
        />
      </div>
    </section>
  );
}

export default Hero;
// import Design from "@/app/ui/design";
// import { useMediaQuery } from "@/lib/useMediaQuery";
// import { useGSAP } from "@/lib/useGSAP";
// import gsap from "gsap";
// import { useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitText from "gsap/src/SplitText";

// function Hero() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   useGSAP(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     if (!videoRef.current) return;

//     const heroSplit = new SplitText(".title", { type: "chars,words" });
//     const paragraphSplit = new SplitText(".paragraph", { type: "lines" });

//     // Faster animations on mobile
//     const animDuration = isMobile ? 1.2 : 1.8;
//     const staggerAmount = isMobile ? 0.03 : 0.05;

//     gsap.from(heroSplit.chars, {
//       yPercent: 100,
//       duration: animDuration,
//       ease: "expo.out",
//       opacity: 0,
//       stagger: staggerAmount,
//     });

//     gsap.from(paragraphSplit.lines, {
//       opacity: 0,
//       yPercent: 100,
//       duration: animDuration,
//       ease: "expo.out",
//       stagger: isMobile ? 0.04 : 0.06,
//       delay: isMobile ? 0.6 : 1,
//     });

//     gsap.from(".dotted", {
//       opacity: 0,
//       xPercent: 100,
//       duration: animDuration,
//       ease: "expo.out",
//       stagger: isMobile ? 0.04 : 0.06,
//     });

//     // Optimized scroll values for mobile
//     const startValue = isMobile ? "top 40%" : "center 60%";
//     const endValue = isMobile ? "+=150%" : "+=200%";

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: videoRef.current,
//         start: startValue,
//         end: endValue,
//         scrub: isMobile ? 0.5 : true, // Smoother scrub on mobile
//         pin: true,
//         // pinSpacing: false,
//         anticipatePin: 1, // Prevents jump on pin
//       },
//     });

//     const setupVideoAnimation = () => {
//       tl.to(videoRef.current, {
//         currentTime: videoRef.current?.duration || 0,
//         ease: "none",
//       });
//     };

//     if (videoRef.current.readyState >= 1) {
//       setupVideoAnimation();
//     } else {
//       videoRef.current.onloadedmetadata = setupVideoAnimation;
//     }
//   }, [isMobile]);

//   return (
//     <section className="min-h-screen relative hero w-full z-0 flex items-center justify-center overflow-hidden">
//       <h1 className="font-bold logo relative title text-5xl sm:text-6xl md:text-[16rem] text-[#4a4a4a] opacity-25 tracking-[0.15em] md:tracking-[0.2em]">
//         CABASH
//       </h1>

//       {/* Improved mobile positioning */}
//       <div className="text-3xl sm:text-4xl md:text-5xl paragraph text-left text-[#2a2a2a] font-extrabold logo absolute top-24 left-4 sm:top-32 sm:left-6 md:top-80 md:left-32 z-20 flex flex-col gap-2 md:gap-4 leading-tight">
//         <p>
//           TAKE <br />
//           THE
//           <br />
//           STEP
//         </p>
//       </div>

//       {/* Better mobile placement */}
//       <p className="text-base sm:text-lg md:text-xl paragraph text-left text-[#0a0a0a] font-extrabold absolute bottom-24 right-4 sm:bottom-32 sm:right-6 md:top-1/2 md:right-32 z-20 underline decoration-[#FF6B35] decoration-2 md:decoration-4 underline-offset-2 md:underline-offset-4">
//         NIKE AIRMAX 95
//       </p>

//       {/* Adjusted dot positions for mobile */}
//       <div className="absolute top-2/3 md:top-3/4 -left-16 md:-left-10">
//         <Design className="dotted scale-75 md:scale-100" />
//       </div>
//       <div className="absolute bottom-2/3 md:bottom-3/4 -right-16 md:-right-10">
//         <Design className="dotted scale-75 md:scale-100" />
//       </div>

//       {/* Optimized video container */}
//       <div className="w-full h-2/3 sm:h-3/4 md:h-[80%] video absolute -top-20 sm:-top-32 left-0 will-change-transform">
//         <video
//           ref={videoRef}
//           className="w-full h-full object-cover object-bottom md:object-contain"
//           muted
//           playsInline
//           preload="metadata"
//           style={{ filter: "hue-rotate(180deg)" }}
//           // src="/videos/shoe_smooth_transparent.webm"
//         >
//           <source
//             src="/videos/shoe_smooth_transparent.webm"
//             type="video/webm; codecs=vp9"
//           />
//           <source
//             src="/videos/shoe_smooth_transparent.mp4"
//             type="video/mp4; codecs=hvc1"
//           />
//         </video>
//       </div>
//     </section>
//   );
// }

// export default Hero;
