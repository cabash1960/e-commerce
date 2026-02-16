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
    const featurechar = new SplitText(headingRef.current, {
      type: "chars,words",
    });

    // Heading animation
    if (headingRef.current) {
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

    // Paragraph animation
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

    // Stacked cards animation
    productsRef.current.forEach((card, index) => {
      if (card) {
        // Set initial state
        gsap.set(card, {
          y: index * 60,
          scale: 1 - index * 0.05,
          opacity: 1,
        });

        // Animate on scroll
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top center",
            end: "bottom top",
            scrub: 1,
            onEnter: () => {
              gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              });
            },
          },
          y: -index * 100,
          opacity: 1,
          ease: "none",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

        {/* Stacked Cards */}
        <div className="relative space-y-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product: Products, index: number) => (
              <div
                key={product.id}
                ref={(el) => {
                  productsRef.current[index] = el;
                }}
                className={`sticky top-20 `}
                style={{ zIndex: featuredProducts.length + index }}
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

        {/* Spacer to prevent footer overlap */}
        <div className="h-96"></div>
      </div>
    </section>
  );
}

export default FeaturedProduct;
