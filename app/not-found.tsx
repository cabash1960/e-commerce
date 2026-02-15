"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, ShoppingBag, ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function NotFound() {
  const router = useRouter();
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numberRef.current || !textRef.current || !buttonRef.current) return;

    const tl = gsap.timeline();

    // Animate 404 number
    tl.from(numberRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Animate text
    tl.from(
      textRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3",
    );

    // Animate buttons
    tl.from(
      buttonRef.current.children,
      {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.2",
    );
  }, []);

  return (
    <section className="min-h-screen relative px-4 py-12 md:px-8 md:py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100 flex items-center justify-center">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/30 via-transparent to-slate-200/40 animate-pulse-slow" />

      {/* Radial gradient accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-orange-200/20 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-slate-300/20 to-transparent blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* 404 Number */}
        <div ref={numberRef} className="mb-8">
          <h1 className="text-[120px] sm:text-[180px] md:text-[240px] lg:text-[300px] font-bold leading-none bg-gradient-to-br from-slate-400 via-gray-500 to-slate-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Text Content */}
        <div ref={textRef} className="mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            The page you're looking for seems to have wandered off. Don't worry,
            even the best explorers get lost sometimes!
          </p>
        </div>

        {/* Action Buttons */}
        <div
          ref={buttonRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out justify-center bg-[#0a0a0a] text-gray-100 px-6 py-3 rounded-full font-medium w-full sm:w-auto group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span>Go Back</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out justify-center border-2 border-[#b5afa7] bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-medium w-full sm:w-auto group"
          >
            <Home
              size={18}
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            <span>Home Page</span>
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out justify-center border-2 border-[#b5afa7] bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-medium w-full sm:w-auto group"
          >
            <ShoppingBag
              size={18}
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            <span>Browse Products</span>
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-16 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products"
              className="text-sm text-gray-700 hover:text-[#0a0a0a] hover:underline underline-offset-4 transition-all"
            >
              All Products
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/cart"
              className="text-sm text-gray-700 hover:text-[#0a0a0a] hover:underline underline-offset-4 transition-all"
            >
              Shopping Cart
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/checkout"
              className="text-sm text-gray-700 hover:text-[#0a0a0a] hover:underline underline-offset-4 transition-all"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 md:left-20 opacity-20 animate-bounce-slow">
        <ShoppingBag size={48} className="text-orange-500" />
      </div>
      <div className="absolute bottom-20 right-10 md:right-20 opacity-20 animate-bounce-slow delay-300">
        <Search size={48} className="text-slate-500" />
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default NotFound;
