import { navDetails } from "@/lib/constants";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bottom-0  bg-[#0A0A0A] w-full ">
      <div className="container  p-10 flex flex-col gap-15 max-w-7xl mx-auto">
        <div className="  text-gray-100  grid grid-cols-1 text-center md:grid-cols-3 gap-8">
          <div className=" flex flex-col gap-6">
            <div className="md:text-3xl text-2xl text-center logo font-bold">
              <Link href="/">CABASH</Link>
            </div>
            <div>
              <p className="text-sm text-center ">
                We curate a growing collection of high-quality shoes designed
                for comfort, performance, and style, helping you step
                confidently wherever life takes you.
              </p>
            </div>
          </div>
          <div>
            <p className="text-xl text-center text-gray-500 font-bold">Pages</p>
            <ul className="mt-2 flex items-center flex-col gap-2 text-sm">
              {navDetails.map((item) => (
                <li key={item.path} className=" w-fit  hover:text-[#ff6b35]">
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl text-gray-500 font-bold">
              Join our Newsletter
            </p>
            <p className="mt-2 text-sm ">
              Subscribe to our newsletter to get updates on new arrivals,
              special offers, and exclusive content. We promise that we do not
              share your information.
            </p>
            <form className="mt-4 flex flex-col justify-center items-center lg:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 placeholder:text-center text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
              />
              <button
                type="submit"
                className="bg-[#ff6b35] hover:bg-[#e55a2c] text-white px-4 py-2 rounded-md transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="logo text-center ">
        <span className="lg:text-[250px] text-7xl md:text-9xl tracking-widest text-center text-gray-300">
          CABASH
        </span>{" "}
      </div>
      <div className="text-center border-t text-gray-300 text-sm mt-2 border-gray-700 p-6">
        {" "}
        {`©${new Date().getFullYear()}  Cabash, Inc. All rights reserved.`}
      </div>
    </footer>
  );
}

export default Footer;
