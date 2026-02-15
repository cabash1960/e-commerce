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
  images: string | string[];
  featured: boolean;
  published: boolean;
  isDefault: boolean;
  owner: null;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

export interface reviews {
  id: string;
  names: string;
  rating: number;
  title: string;
  comment: string;
  product: string;
  size: string;
  location: string;
  avatar: string;
  date: string;
  verified: boolean;
}
