import React from "react";
import ProductDetails from "@/components/products/ProductDetails";
import { fetchProductById } from "@/lib/api";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await fetchProductById(id);

  return (
    <section>
      <ProductDetails selectedProduct={products} />
    </section>
  );
}

export default ProductPage;
