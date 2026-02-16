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
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const carouselchar = new SplitText(headingRef.current, {
      type: "chars,words",
    });

    // Heading animation
    if (headingRef.current) {
      gsap.from(carouselchar.chars, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.02,
      });
    }

    // Carousel fade in
    if (carouselRef.current) {
      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative px-4 py-20 md:px-8 md:py-28 bg-gradient-to-br from-[#f6dac2] via-[#fae8d5] to-[#f6dac2] overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3"
            ref={headingRef}
          >
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from people who trust our products
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef}>
          <ShadcnCarousel
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={review.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-md">
                    <CardContent className="flex items-center justify-center p-6 md:p-8 min-h-[300px]">
                      <CarouselCard review={review} />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-1/2 bg-white shadow-lg hover:bg-gray-50 border-gray-200" />
              <CarouselNext className="right-0 translate-x-1/2 bg-white shadow-lg hover:bg-gray-50 border-gray-200" />
            </div>
          </ShadcnCarousel>

          <div className="md:hidden mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Join{" "}
            <span className="font-semibold text-gray-900">
              {reviews.length}+
            </span>{" "}
            happy customers
          </p>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
