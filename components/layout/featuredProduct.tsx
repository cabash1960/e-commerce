"use client";
import { Products } from "@/lib/types";
import ProductCardHero from "@/components/products/ProductCardHero";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function FeaturedProduct({
  featuredProducts,
}: Readonly<{ featuredProducts: Products[] }>) {
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // --- Heading animation ---
    if (headingRef.current) {
      const featurechar = new SplitText(headingRef.current, {
        type: "chars,words",
      });

      gsap.from(featurechar.chars, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.03,
      });
    }

    // --- Paragraph animation ---
    if (paragraphRef.current) {
      gsap.from(paragraphRef.current, {
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    productsRef.current.forEach((card, index) => {
      if (!card) return;

      // Only animate cards that will be "buried" by a later card
      const isLast = index === featuredProducts.length - 1;
      if (isLast) return;

      const nextCard = productsRef.current[index + 1];
      if (!nextCard) return;

      gsap.to(card, {
        scrollTrigger: {
          trigger: nextCard,
          start: "top 80%",
          end: "top top+=80",
          scrub: 0.5,
        },
        scale: 0.96 - index * 0.01,
        opacity: 0.6,
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [featuredProducts]);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 py-16 md:px-8 md:py-24 bg-[#f6dac2]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            ref={headingRef}
          >
            Featured Collection
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            ref={paragraphRef}
          >
            Handpicked favorites from our latest arrivals
          </p>
        </div>

        <div className="relative">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product: Products, index: number) => (
              <div
                key={product.id}
                ref={(el) => {
                  productsRef.current[index] = el;
                }}
                className="sticky top-20 mb-6"
                style={{
                  zIndex: index + 1,

                  transformOrigin: "center top",
                  willChange: "transform, opacity",
                }}
              >
                <ProductCardHero product={product} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No featured products available.
            </p>
          )}
        </div>

        <div className="h-32" />
      </div>
    </section>
  );
}

export default FeaturedProduct;
