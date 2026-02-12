import React from "react";
import { Products } from "@/lib/types";
import ProductCard from "../products/ProductCard";

function Feature({ featuredProducts }: { featuredProducts: Products[] }) {
  return (
    <div className="mt-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          You May Also Like
        </h2>
      </div>
      <div className="mt-8 md:mt-16">
        {featuredProducts.length > 0 ? (
          <ul className="flex justify-center gap-8 items-center">
            {featuredProducts.slice(0, 4).map((product: Products) => (
              <li key={product.id}>
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
    </div>
  );
}

export default Feature;
