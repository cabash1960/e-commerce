"use client";

import { Products } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Feature from "../layout/feature";

function ProductDetails({
  selectedProduct,
  featuredProducts,
}: {
  selectedProduct: Products | undefined;
  featuredProducts: Products[];
}) {
  const { items, addItems } = useCartStore();

  const cartItem = items.find((item) => item.id === selectedProduct?.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }
  console.log("Adding item with image:", selectedProduct.image);

  const onAddItem = () => {
    addItems({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity,
      description: selectedProduct.description,
      image: selectedProduct.image,
    });
  };

  return (
    <section className="min-h-10 px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex min-h-[75vh] gap-8 justify-center items-center">
          <div className="flex gap-3">
            <div className="rounded-lg shadow-md overflow-hidden">
              <div className="hover:scale-105 transition-all duration-300 ease-in-out">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={350}
                  height={350}
                  loading="eager"
                />
              </div>
            </div>
            <div className="flex flex-col h-fit justify-center items-center gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out shadow-md"
                >
                  <Image
                    src={selectedProduct.image}
                    alt={`${selectedProduct.name} thumbnail ${i + 1}`}
                    width={100}
                    height={100}
                    className="object-cover"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col text-left gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl">{selectedProduct.name}</h1>

              {/* Fixed: Show both prices properly */}
              <div className="flex items-center gap-3">
                <p className="font-medium text-2xl">
                  <span className="text-gray-500">₦</span>
                  {selectedProduct.price}
                </p>
                {selectedProduct.compareAtPrice &&
                  selectedProduct.compareAtPrice > selectedProduct.price && (
                    <p className="font-medium text-lg text-gray-400 line-through">
                      <span>₦</span>
                      {selectedProduct.compareAtPrice}
                    </p>
                  )}
              </div>

              {selectedProduct.description && (
                <p className="text-gray-500">{selectedProduct.description}</p>
              )}
            </div>
            <div className="flex gap-6 border-t border-gray-300 py-4">
              <div className="flex rounded-full items-center justify-center gap-2 px-4 py-1 bg-gray-300 w-fit font-medium cursor-pointer">
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-2 cursor-pointer py-2"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <p className="px-2 py-2 w-fit text-center">{quantity}</p>
                <button
                  className="px-2 cursor-pointer py-2"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))} // Fixed: minimum 1
                  aria-label="Decrease quantity"
                >
                  -
                </button>
              </div>
              <button
                className="flex gap-2 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center bg-[#0a0a0a] cursor-pointer text-gray-100 px-6 py-2 rounded-full"
                onClick={onAddItem}
              >
                <ShoppingBagIcon size={16} />
                <span>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>

        <Feature featuredProducts={featuredProducts} />
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
      </div>
    </section>
  );
}

export default ProductDetails;
