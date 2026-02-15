"use client";

import { Products } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { StepBack, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Feature from "../layout/feature";
import Link from "next/link";

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
    <section className="min-h-screen px-4 py-12 md:px-8 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto ">
        <div className="flex min-h-[75vh] gap-6 md:gap-8 flex-col md:flex-row justify-center items-center ">
          <div className="flex gap-3 flex-col  md:flex-row justify-center items-center w-full md:w-auto">
            <div className="rounded-lg shadow-md overflow-hidden w-full md:w-auto">
              <div className="text-xl hover:scale-105 transition-all duration-300 ease-in-out text-[#0a0a0a] absolute top-3 md:top-5 left-5 hover:underline hover:underline-offset-2 ">
                <Link href="/products">
                  <StepBack />
                </Link>
              </div>
              <div className="hover:scale-105 transition-all duration-300 ease-in-out">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={350}
                  height={350}
                  className="w-full md:w-[350px] h-auto"
                  loading="eager"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-row md:flex-col w-full md:w-auto justify-center items-center gap-2 md:gap-4  overflow-x-auto md:overflow-visible">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out shadow-md shrink-0"
                >
                  <Image
                    src={selectedProduct.image}
                    alt={`${selectedProduct.name} thumbnail ${i + 1}`}
                    width={80}
                    height={80}
                    className="object-cover md:w-[100px] md:h-[100px]"
                    loading="eager"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
          </div>

          {/* Product Info */}
          <div className="flex flex-col text-center md:text-left gap-6 md:gap-8 w-full md:w-auto">
            <div className="flex flex-col gap-3 md:gap-4">
              <h1 className="text-2xl md:text-4xl font-bold">
                {selectedProduct.name}
              </h1>

              <div className="flex text-center md:text-left justify-center items-center gap-3">
                <p className="font-medium text-xl  md:text-2xl">
                  <span className="text-gray-500 mr-1">₦</span>
                  {selectedProduct.price.toLocaleString()}
                </p>
                {selectedProduct.compareAtPrice &&
                  selectedProduct.compareAtPrice > selectedProduct.price && (
                    <p className="font-medium text-base md:text-lg text-gray-400 line-through">
                      <span>₦</span>
                      {selectedProduct.compareAtPrice.toLocaleString()}
                    </p>
                  )}
              </div>

              {selectedProduct.description && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-t border-gray-300 pt-4 md:pt-6">
              <div className="flex rounded-full items-center justify-center gap-2 px-4 py-2 bg-gray-200 w-full sm:w-fit font-medium">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-1 cursor-pointer text-lg"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <p className="px-4 py-1 min-w-[40px] text-center font-semibold">
                  {quantity}
                </p>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 cursor-pointer text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                className="flex gap-2 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center bg-[#0a0a0a] cursor-pointer text-gray-100 px-6 py-3 rounded-full w-full sm:w-auto font-medium"
                onClick={onAddItem}
              >
                <ShoppingBagIcon size={18} />
                <span>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <Feature featuredProducts={featuredProducts} />
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
