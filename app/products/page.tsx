import { fetchProducts } from "@/lib/api";
import ProductFilter from "@/components/products/ProductFilter";

async function ProductList() {
  const products = await fetchProducts();

  return <ProductFilter />;
}

export default ProductList;
