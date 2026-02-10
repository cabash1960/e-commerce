import type { Products } from "@/lib/types";
import Images from "next/image";
import Link from "next/link";

function ProductCard({ product }: { product: Products }) {
  return (
    <div className=" p-4 border border-[#ff6b35] hover:border-2 rounded-lg transition-all duration-300 overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className=" flex flex-col gap-2 hover:scale-105  transition-all duration-300 ease-in-out">
          <Images
            src={`${product.image ? product.image : product.images[0]}`}
            alt={`${product.name} image`}
            width={250}
            height={250}
            className="rounded-sm "
          />{" "}
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="font-bold logo ">{product.name}</p>
            <p className="text-sm text-[#4a4a4a] opacity-70">
              {" "}
              {product.description}
            </p>
            <p className=" text-[#c95023] font-bold text-2xl">
              <span className="opacity-75 text-xl">$</span>
              {product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
