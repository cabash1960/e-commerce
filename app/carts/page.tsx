import CartComp from "@/components/cart/cartComp";
import { fetchFeaturedProducts } from "@/lib/api";

async function Cartpage() {
  const products = await fetchFeaturedProducts();
  if (!products) {
    throw new Error("Failed to fetch Products ");
  }

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <CartComp featuredProducts={featuredProducts} />
    </div>
  );
}

export default Cartpage;
