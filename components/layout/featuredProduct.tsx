"use client";
import { Products } from "@/lib/types";
import ProductCard from "@/components/products/ProductCard";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function FeaturedProduct({
  featuredProducts,
}: Readonly<{ featuredProducts: Products[] }>) {
  const productsRef = useRef<(HTMLLIElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const featurechar = new SplitText(headingRef.current, {
      type: "chars,words",
    });

    productsRef.current.forEach((product, index) => {
      if (product) {
        const isLeftColumn = index === 0 || index === 2;

        gsap.fromTo(
          product,
          {
            opacity: 0,
            x: isLeftColumn ? -100 : 100,
          },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: product,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
              toggleActions: "play reverse play reverse",
              // markers: true,
            },
          },
        );
      }
    });
    if (!headingRef.current) return;

    gsap.from(featurechar.chars, {
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

    if (paragraphRef.current) {
      gsap.from(paragraphRef.current, {
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [featuredProducts]);

  return (
    <section className="min-h-screen relative px-4 py-12 md:px-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center  mb-16 md:mb-24">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl  font-bold text-gray-900 mb-4"
            ref={headingRef}
          >
            Featured Collection
          </h2>
          <p
            className="text-lg md:text-xl  text-gray-600 max-w-2xl mx-auto"
            ref={paragraphRef}
          >
            Handpicked favorites from our latest arrivals
          </p>
        </div>
        {featuredProducts.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-16 md:gap-x-32 lg:gap-x-48 xl:gap-x-72 md:gap-y-12">
            {featuredProducts.map((product: Products, index: number) => (
              <li
                key={product.id}
                ref={(el) => {
                  productsRef.current[index] = el;
                }}
                className={`flex items-center justify-center transition-all ${
                  index === 0 || index === 2
                    ? "mt-6 md:mt-12 lg:mt-20"
                    : "-mt-6 md:-mt-12 lg:-mt-20"
                }`}
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No featured products available.
          </p>
        )}
      </div>
    </section>
  );
}

export default FeaturedProduct;
