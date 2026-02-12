import type { Products } from "./types";
import axios, { AxiosError } from "axios";
import { productImages } from "./constants";

const API_URL = "https://api.oluwasetemi.dev";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error: unknown, context: string): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error(
      `API ERROR (${context}):`,
      axiosError.response?.status,
      axiosError.message,
    );
  } else {
    console.error(`Error (${context}):`, error);
  }
  throw error;
};

const parsePrice = (price: number): number => {
  const realPrice = +(+price / 10).toFixed(2);
  return realPrice;
};

const discountedPrice = (product: number): number => {
  return +(product * 0.75).toFixed(2);
};

const getImageUrl = (images: string | string[] | undefined | null): string => {
  if (!images) return "";
  if (Array.isArray(images)) return images[0] || "";
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed[0] || "" : parsed;
  } catch {
    return images;
  }
};

const mapProductsWithImages = (products: Products[]): Products[] => {
  return products.map((product, index) => ({
    ...product,
    price: product.price
      ? discountedPrice(parsePrice(product.price))
      : parsePrice(product.price),
    compareAtPrice: parsePrice(product.price),

    image: productImages[index] || getImageUrl(product.images),
  }));
};

export const fetchProducts = async (
  page: number = 1,
  limit: number = 10,
): Promise<Products[]> => {
  try {
    const response = await apiClient.get<{ data: Products[] }>("/products", {
      params: { page, limit },
    });
    return mapProductsWithImages(response.data.data);
  } catch (error) {
    return handleApiError(error, "fetching products");
  }
};

export const fetchProductById = async (id: string): Promise<Products> => {
  try {
    const response = await apiClient.get<{ data: Products }>(`/products/${id}`);

    const product = response.data?.data || response.data;
    console.log(product);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    const allProducts = await fetchProducts();
    const productIndex = allProducts.findIndex((p) => p.id === product.id);

    return {
      ...product,
      images:
        productIndex >= 0 ? [productImages[productIndex]] : product.images,
      image:
        productIndex >= 0
          ? productImages[productIndex]
          : getImageUrl(product.images),
      price: parsePrice(product.price),
      compareAtPrice: product.price
        ? discountedPrice(parsePrice(product.price))
        : null,
    };
  } catch (error) {
    return handleApiError(error, `fetching product ${id}`);
  }
};

export const fetchFeaturedProducts = async (): Promise<Products[]> => {
  try {
    const response = await apiClient.get<{ data: Products[] }>("/products", {
      params: { featured: true },
    });
    return mapProductsWithImages(response.data.data);
  } catch (error) {
    return handleApiError(error, "fetching featured products");
  }
};

// lib/api.ts
export const fetchProductsPaginated = async (
  page: number = 1,
  limit: number = 12,
  search?: string,
): Promise<{ products: Products[]; total: number; hasMore: boolean }> => {
  try {
    const params: any = { page, limit };
    if (search) params.search = search;

    const response = await apiClient.get<{ data: Products[]; total: number }>(
      "/products",
      { params },
    );

    const products = mapProductsWithImages(response.data.data);
    const total = response.data.total || products.length;
    const hasMore = page * limit < total;

    return { products, total, hasMore };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
