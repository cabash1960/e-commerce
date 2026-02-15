import Hero from "@/components/layout/Hero";
import { fetchFeaturedProducts } from "@/lib/api";

import FeaturedProducts from "@/components/layout/featuredProduct";

import Carousel from "@/components/layout/customerCarousel";
import { notFound } from "next/navigation";

export default async function Home() {
  const products = await fetchFeaturedProducts();

  if (!products) return notFound();

  console.log(products);
  const featuredProducts = products.slice(0, 4);

  return (
    <section>
      <div className="">
        <Hero />
        <div>
          <FeaturedProducts featuredProducts={featuredProducts} />
        </div>
        <Carousel />
      </div>
    </section>
  );
}
