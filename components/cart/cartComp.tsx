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
    <section className="min-h-10 px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-7xl mx-auto min-h-[60vh]">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Cart
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-center text-gray-500">Your cart is empty</p>
            <Link href="/products">
              <button className="flex gap-2 hover:scale-105  w-fit transition-all group hover:gap-4 duration-300 ease-in-out justify-center items-center bg-[#0a0a0a] cursor-pointer text-gray-100 px-6 py-2 rounded-full">
                <span className="group-hover:rotate-12 transition-tranform duration-300 ">
                  <ShoppingBagIcon size={16} />
                </span>

                <span className="text-lg  ">Add To Cart</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8 ">
            <div className="col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex border p-4 rounded-lg border-[#b5afa7]"
                >
                  <div className="grow flex  gap-4">
                    <div className="shrink-0 flex ">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-col  ">
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className=" text-lg text-gray-500">
                        {item.description || "No description"}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline cursor-pointer hover:underline-offset-3 transition-all ease-in-out duration-300 text-sm  mt-2 self-start"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center  ">
                    <div className="flex gap-6   py-4">
                      <div className="flex rounded-full items-center justify-center gap-2 px-4 py-1 border border-[#b5afa7] bg-[#b5afa750] w-fit font-medium cursor-pointer">
                        <button
                          onClick={() => onAddItem(item)}
                          className="px-2 cursor-pointer py-2"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <p className="px-2 py-2 w-fit text-center">
                          {item.quantity}
                        </p>
                        <button
                          className="px-2 cursor-pointer py-2"
                          aria-label="Decrease quantity"
                          onClick={() => removeItem(item)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600">₦{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={clearItems}
                className="mt-4 w-fit border text-[#0a0a0a] border-[#b5afa7] text-sm hover:bg-[#b5afa7] hover:text-gray-200  px-4 py-2 rounded "
              >
                Clear Cart
              </button>
            </div>

            <div className="border p-4 rounded-lg h-fit border-[#b5afa7] flex flex-col gap-3">
              <h3 className="font-bold text-xl mb-2">Summary</h3>
              <p className="border-t border-t-[#b5afa7] pt-2">
                Total Items: {totalItems}
              </p>
              {/* <p className="border-t border-t-[#b5afa7] pt-2">
                VAT: ${vatRate}
              </p> */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  VAT ({(vatRate * 100).toFixed(1)}%)
                </span>
                <span className="font-medium text-gray-900">
                  ₦{vat.toFixed(2)}
                </span>
              </div>

              <p className="text-xl font-bold pt-2 border-t border-t-[#b5afa7]">
                Total: ₦{total}
              </p>
              <Link
                href="/checkout"
                className="bg-[#0a0a0a] cursor-pointer text-center px-6 py-2"
              >
                <button className=" cursor-pointer  text-gray-100 ">
                  <span>Checkout</span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Feature featuredProducts={featuredProducts} />
    </section>
  );
}

export default CartComp;
