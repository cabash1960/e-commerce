import type { Products } from "./types";
import axios from "axios";

const API_URL = "https://api.oluwasetemi.dev";

export const fetchProducts = async (): Promise<Products[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const { data } = response.data;
    console.log("Products data: ", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API ERROR", error.response?.status, error.message);
    } else {
      console.error("Error fetching products:", error);
    }
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Products> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    const { data } = response.data;

    console.log(JSON.parse(response.data.images)[0]);
    console.log(`Product ${id} response:`, response.data);
    console.log(`Product ${id} data:`, data);

    return data || response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API ERROR fetching product ${id}:`,
        error.response?.status,
        error.message,
      );
    } else {
      console.error(`Error fetching product ${id}:`, error);
    }
    throw error;
  }
};

export const fetchFeaturedProducts = async (): Promise<Products[]> => {
  try {
    const response = await axios.get(`${API_URL}/products?featured=true`);
    const { data } = response.data;
    // console.log("featured: ", data);

    return data as Products[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API ERROR", error.response?.status, error.message);
    } else {
      console.error("Error fetching featured Product:", error);
    }
    throw error;
  }
};
