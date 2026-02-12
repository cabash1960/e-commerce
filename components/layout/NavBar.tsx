"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { BaggageClaim, UserRound } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@/lib/useGSAP";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function NavBar() {
  const { items } = useCartStore();
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
      { y: -100, opacity: 0, backgroundColor: "rgba(10,10,10,0.5)" },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        backgroundColor: "rgba(10,10,10,1)",
        backgroundFilter: "blur(10px)",
        ease: "power1.inOut",
      },
    );
  });

  return (
    <nav className=" h-20 fixed w-full z-50   p-6  bg-[#0A0A0A]">
      <div className="flex justify-between items-center  text-gray-100 max-w-7xl mx-auto">
        <div>
          <ul className="flex gap-7">
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
        </div>
        <div className="text-2xl logo font-bold">
          <Link href="/">CABASH</Link>
        </div>
        <div className="flex gap-7 items-center justify-center">
          <UserRound />
          <span>
            <Link href="/carts" className="relative">
              <BaggageClaim />
              <span className=" bg-red-800 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 left-4">
                {cartCount > 0 && cartCount}
              </span>
            </Link>
          </span>

          <p className="bg-[#D97642] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#E08856] transition-colors">
            Shop Now
          </p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
