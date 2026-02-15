"use client";
import { CartItem } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { ShoppingBagIcon } from "lucide-react";
import { Products } from "@/lib/types";
import Feature from "../layout/feature";
import Link from "next/link";
import { useState } from "react";

function CartComp({ featuredProducts }: { featuredProducts: Products[] }) {
  const { items, removeFromCart, clearItems, addItems } = useCartStore();

  const [vatRate] = useState(0.075);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subTotal = +items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
  const vat = +(subTotal * vatRate).toFixed(2);
  const total = (subTotal + vat).toFixed(2);

  const onAddItem = (item: CartItem) => {
    return addItems({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      quantity: 1,
    });
  };

  const removeItem = (item: CartItem) => {
    if (item.quantity === 0) {
      return;
    }
    return addItems({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      quantity: -1,
    });
  };

  return (
    <section className="min-h-screen px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-7xl mx-auto min-h-[60vh]">
        <div className="text-center mb-8 md:mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
            Cart
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-center text-gray-500 text-base md:text-lg">
              Your cart is empty
            </p>
            <Link href="/products">
              <button className="flex gap-2 hover:scale-105 w-fit transition-all group hover:gap-4 duration-300 ease-in-out justify-center items-center bg-[#0a0a0a] cursor-pointer text-gray-100 px-6 py-3 rounded-full">
                <span className="group-hover:rotate-12 transition-transform duration-300">
                  <ShoppingBagIcon size={18} />
                </span>
                <span className="text-base md:text-lg">Add To Cart</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row border p-4 rounded-lg border-[#b5afa7] gap-4"
                >
                  {/* Product Info */}
                  <div className="flex gap-4 flex-1">
                    <div className="shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px]"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="font-medium text-base md:text-lg truncate">
                        {item.name}
                      </p>
                      <p className="text-sm md:text-base text-gray-500 line-clamp-2">
                        {item.description || "No description"}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline cursor-pointer hover:underline-offset-3 transition-all ease-in-out duration-300 text-xs md:text-sm mt-2 self-start"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex sm:flex-col justify-between sm:justify-center items-center gap-4 sm:gap-2">
                    {/* Quantity Controls */}
                    <div className="flex rounded-full items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 border border-[#b5afa7] bg-[#b5afa750] font-medium">
                      <button
                        onClick={() => removeItem(item)}
                        className="px-2 sm:px-3 cursor-pointer py-1 sm:py-2 text-base sm:text-lg"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <p className="px-2 sm:px-3 py-1 sm:py-2 min-w-[30px] text-center text-sm sm:text-base">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => onAddItem(item)}
                        className="px-2 sm:px-3 cursor-pointer py-1 sm:py-2 text-base sm:text-lg"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-gray-600 font-medium text-base md:text-lg whitespace-nowrap">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearItems}
                className="mt-4 w-full sm:w-fit border text-[#0a0a0a] border-[#b5afa7] text-sm hover:bg-[#b5afa7] hover:text-gray-200 px-4 py-2 rounded transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>

            {/* Summary Section */}
            <div className="border p-4 md:p-6 rounded-lg h-fit border-[#b5afa7] flex flex-col gap-3 sticky top-4">
              <h3 className="font-bold text-lg md:text-xl mb-2">
                Order Summary
              </h3>

              <div className="flex justify-between text-sm md:text-base border-t border-t-[#b5afa7] pt-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₦{subTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm md:text-base">
                <span className="text-gray-600">Total Items</span>
                <span className="font-medium">{totalItems}</span>
              </div>

              <div className="flex justify-between text-sm md:text-base">
                <span className="text-gray-600">
                  VAT ({(vatRate * 100).toFixed(1)}%)
                </span>
                <span className="font-medium text-gray-900">
                  ₦{vat.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-lg md:text-xl font-bold pt-3 border-t border-t-[#b5afa7]">
                <span>Total</span>
                <span>₦{parseFloat(total).toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                className="bg-[#0a0a0a] hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-center px-6 py-3 rounded-full mt-2"
              >
                <span className="text-gray-100 font-medium">
                  Proceed to Checkout
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Featured Products */}
      <div className="mt-12 md:mt-16">
        <Feature featuredProducts={featuredProducts} />
      </div>
    </section>
  );
}

export default CartComp;
