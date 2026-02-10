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
  const realPrice = +(+price / 100).toFixed(2);
  return realPrice;
};
const mapProductsWithImages = (products: Products[]): Products[] => {
  return products.map((product, index) => ({
    ...product,
    price: parsePrice(product.price),
    image: productImages[index] || product.images?.[0], // Use first image or fallback
  }));
};

export const fetchProducts = async (): Promise<Products[]> => {
  try {
    const response = await apiClient.get<{ data: Products[] }>("/products");
    return mapProductsWithImages(response.data.data);
  } catch (error) {
    return handleApiError(error, "fetching products");
  }
};

export const fetchProductById = async (id: string): Promise<Products> => {
  try {
    const response = await apiClient.get<any>(`/products/${id}`);
    // Handle potential API structure differences (wrapped in data vs direct object)
    const product = response.data?.data || response.data;

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
        productIndex >= 0 ? productImages[productIndex] : product.images?.[0],
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
