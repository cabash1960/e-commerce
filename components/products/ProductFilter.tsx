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
    <section>
      <div>
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
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProduct.map((product: Products) => (
                <li key={product.id}>
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
