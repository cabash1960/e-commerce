"use client";

import { useState } from "react";
import type { Products } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductFilterProps {
  products: Products[];
}

export default function ProductFilter({ products }: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.trim().toLowerCase();
    const nameCheck = product.name.toLowerCase().includes(term);
    const descriptionCheck = product.description
      ? product.description.trim().toLowerCase().includes(term)
      : false;

    return nameCheck || descriptionCheck;
  });

  return (
    <section className="min-h-screen pt-8">
      <div>
        <div className="text-center  mb-16 md:mb-24">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl  font-bold text-gray-900 mb-4"
            // ref={headingRef}
          >
            Step Into The Void
          </h2>
          <p
            className="text-lg md:text-xl  text-gray-600 max-w-2xl mx-auto"
            // ref={paragraphRef}
          >
            Handpicked favorites from our latest arrivals
          </p>
        </div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
          />
        </div>
        <div>
          {filteredProduct.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
              {filteredProduct.map((product: Products) => (
                <li key={product.id} className="w-fit">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
