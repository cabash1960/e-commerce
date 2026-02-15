import React from "react";
import ProductDetails from "@/components/products/ProductDetails";
import { fetchProductById, fetchFeaturedProducts } from "@/lib/api";
import { notFound } from "next/navigation";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await fetchProductById(id);

  if (!products) {
    notFound();
  }
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <section>
      <ProductDetails
        selectedProduct={products}
        featuredProducts={featuredProducts}
      />
    </section>
  );
}

export default ProductPage;
