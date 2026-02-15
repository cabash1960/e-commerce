"use client";

import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useRef } from "react";
import SplitText from "gsap/SplitText";
import CarouselCard from "./carouselCard";
import { reviews } from "@/lib/constants";
import Autoplay from "embla-carousel-autoplay";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Carousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const carouselchar = new SplitText(headingRef.current, {
      type: "chars,words",
    });

    if (!headingRef.current) return;

    gsap.from(carouselchar.chars, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.Out",
      stagger: 0.03,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="min-h-[70vh] relative px-4 py-12 md:px-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="text-center mb-16 md:mb-24">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            ref={headingRef}
          >
            What Do Our Customers Say?
          </h2>
        </div>

        <ShadcnCarousel
          className="w-full max-w-7xl"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-1">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-full md:basis-1/2 lg:basis-1/3 pl-1  "
              >
                <div className="p-1 h-full">
                  <Card className="bg-[#4a4a4a17] h-full backdrop-blur-lg">
                    <CardContent className="flex items-center justify-center p-6 min-h-[400px]">
                      <CarouselCard review={review} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </ShadcnCarousel>
      </div>
    </section>
  );
}

export default Carousel;
