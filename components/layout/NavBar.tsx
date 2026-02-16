"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { BaggageClaim, UserRound, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@/lib/useGSAP";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function NavBar() {
  const [open, isOpen] = useState(false);

  const { items } = useCartStore();
  const mobileNavRef = useRef<HTMLLIElement | null>(null);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      { y: -100, opacity: 0, backgroundColor: "none" },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
      },
    );
  });
  useGSAP(() => {
    if (open && mobileNavRef.current) {
      gsap.from(mobileNavRef.current.children, {
        y: 50,
        ease: "power1.inOut",
        duration: 0.5,
        opacity: 0,
        stagger: 0.1,
      });
    }
  }, [open]);

  return (
    <nav className="fixed top-0 w-full z-50 lg:h-20 lg:p-6 p-4 bg-none">
      <div className="flex justify-between items-center text-gray-100 max-w-7xl mx-auto">
        <ul className=" hidden md:flex gap-7">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>

        <div className="lg:text-2xl text-xl logo font-bold">
          <Link href="/">CABASH</Link>
        </div>
        <div className="lg:flex gap-7 hidden items-center justify-center">
          <UserRound />
          <span>
            <Link href="/carts" className="relative" aria-label="View cart">
              <BaggageClaim />
              <span className=" bg-red-800 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 left-4">
                {cartCount > 0 && cartCount}
              </span>
            </Link>
          </span>
          <Link href="/products">
            <p
              className="bg-[#F5EDE6] text-[#3b1d0e] px-4 py-2 hidden md:flex cursor:pointer rounded-md text-sm font-semibold hover:bg-[#F5EDE6] hover:text-[#3b1d0e]
 transition-colors duration-300 ease-in-out"
            >
              Shop Now
            </p>
          </Link>
        </div>
        <div className="flex gap-2 md:hidden">
          <UserRound />
          <span>
            <Link href="/carts" className="relative" aria-label="View cart">
              <BaggageClaim />
              <span className=" bg-red-800 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 left-4">
                {cartCount > 0 && cartCount}
              </span>
            </Link>
          </span>
          <Link href="/products">
            <p className="bg-[#D97642] text-white px-4 py-2 hidden md:flex cursor:pointer rounded-md text-sm font-semibold hover:bg-[#E08856] transition-colors">
              Shop Now
            </p>
          </Link>

          {open ? (
            <button
              className="md:hidden"
              onClick={() => isOpen(!open)}
              aria-label="Close menu"
            >
              <X />
            </button>
          ) : (
            <button
              className="md:hidden"
              onClick={() => isOpen(!open)}
              aria-label="Open menu"
            >
              <Menu />
            </button>
          )}
        </div>
      </div>
      {open && (
        <ul
          ref={mobileNavRef}
          className="  md:hidden flex flex-col  items-center py-6 gap-6 absolute  top-15 left-0 w-full bg-[#3b1d0e] text-gray-300"
        >
          <li>
            <Link href="/" onClick={() => isOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" onClick={() => isOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => isOpen(false)}>
              About
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/products" onClick={() => isOpen(false)}>
              Shop Now
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
