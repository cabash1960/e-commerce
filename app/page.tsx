import Hero from "@/components/layout/Hero";
import { fetchFeaturedProducts } from "@/lib/api";

import FeaturedProducts from "@/components/layout/featuredProduct";
// import Image from "next/image";

export default async function Home() {
  const products = await fetchFeaturedProducts();

  const featuredProducts = products.slice(0, 4);

  return (
    <section>
      <div className="">
        <Hero />
        <div>
          <FeaturedProducts featuredProducts={featuredProducts} />
        </div>
      </div>
    </section>
  );
}
