import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function inStock(product: any) {
  return typeof product.quantity === "number" ? product.quantity > 0 : true;
}
