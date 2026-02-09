import type { Products } from "@/lib/types";
import Link from "next/link";

function ProductCard({ product }: { product: Products }) {
  return (
    <div className=" p-4 border border-gray-200 rounded-lg">
      <Link href={`/products/${product.id}`}>
        <p>{product.name}</p>
        <p>{product.description}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
