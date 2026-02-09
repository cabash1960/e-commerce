import Hero from "@/components/layout/Hero";
import ProductCard from "@/components/products/ProductCard";
import { fetchFeaturedProducts } from "@/lib/api";
import type { Products } from "@/lib/types";
// import Image from "next/image";

export default async function Home() {
  const products = await fetchFeaturedProducts();
  console.log("products:", typeof products);
  const featuredProducts = products.slice(0, 4);

  return (
    <section>
      <div className="">
        <Hero />
        <div>
          <div>
            <p>featured products</p>
          </div>
          <div className="min-h-screen">
            {featuredProducts.length > 0 ? (
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredProducts.map((product: Products) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No featured products available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
