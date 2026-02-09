import { fetchProducts } from "@/lib/api";
import ProductFilter from "@/components/products/ProductFilter";

async function ProductList() {
  const products = await fetchProducts();

  return <ProductFilter products={products} />;
}

export default ProductList;
