import React from "react";
import { Products } from "@/lib/types";
import ProductCard from "../products/ProductCard";

function Feature({ featuredProducts }: { featuredProducts: Products[] }) {
  return (
    <div className="mt-12 md:mt-16 flex flex-col gap-12 md:gap-16 items-center justify-center">
      <div className="text-center ">
        <h2 className="text-4xl  lg:text-6xl font-bold text-gray-900">
          You May Also Like
        </h2>
      </div>
      <div>
        {featuredProducts.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 w-fit  md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.slice(0, 4).map((product: Products) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-base md:text-lg">
            No featured products available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Feature;
