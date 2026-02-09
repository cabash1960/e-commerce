export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  sku: string | null;
  barcode: string | null;
  quantity: number;
  category: string;
  tags: string[] | null;
  images: string;
  featured: boolean;
  published: boolean;
  isDefault: boolean;
  owner: null;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
