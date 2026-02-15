import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Products } from "./types";
// import { useRef } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function inStock(product: Products) {
  return typeof product.quantity === "number" ? product.quantity > 0 : true;
}
