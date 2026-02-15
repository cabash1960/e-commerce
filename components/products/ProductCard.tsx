import type { Products } from "@/lib/types";
import { inStock } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import Images from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

function ProductCard({ product }: { product: Products }) {
  const { addItems } = useCartStore();

  const onAddItem = (product: Products) => {
    if (!inStock(product)) {
      return;
    }

    addItems({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      description: product.description,
      image: product.image || product.images[0],
    });
    toast.success("Added to cart");
  };

  return (
    <div className=" p-4 border border-[#ff6b35] relative   hover:ring-2 hover:ring-[#ff6b35] rounded-lg transition-all group duration-300 overflow-hidden backdrop-blur-xs cursor-pointer">
      <Link href={`/products/${product.id}`}>
        <div className=" flex flex-col gap-2 ">
          <Images
            src={`${product.image ? product.image : product.images[0]}`}
            alt={`${product.name} image`}
            width={250}
            height={250}
            loading="lazy"
            className="rounded-sm group-hover:scale-105  transition-all duration-300 ease-in-out "
          />{" "}
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="font-bold logo ">{product.name}</p>
            <p className="text-sm text-[#4a4a4a] opacity-70">
              {" "}
              {product.description
                ? product.description
                : "No description available"}
            </p>
            <div className="flex gap-2 items-center justify-center">
              <p className=" text-gray-500 line-through  opacity-75 font-bold text-xl">
                <span className="text-xl">₦</span>
                {product.price}
              </p>
              <p className=" text-[#c95023] font-bold text-2xl flex items-center justify-center">
                <span className="opacity-90 text-xl ">₦</span>

                <span>{product.compareAtPrice}</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`absolute w-full h-full bg-[#0a0a0a23] ${!inStock(product) ? "group-hover:opacity-100" : "group-hover:opacity-0"} opacity-0 inset-0 flex justify-center items-center text-2xl text-white font-bold transition-all duration-300 ease-in-out`}
        >
          <p>Out of Stock</p>
        </div>
        <button
          className={` text-xl text-gray-100 absolute top-0 right-0 ${!inStock(product) ? "group-hover:opacity-0" : "group-hover:opacity-100"} opacity-0  -translate-y-1 group-hover:translate-y-0 transition-all duration-300 ease-in-out w-full flex justify-center items-center bg-[#ff6b35] px-2 py-4 cursor-pointer`}
          onClick={() => onAddItem(product)}
          disabled={!inStock(product)}
        >
          {inStock(product) ? "Add to Cart" : "Out of Stock"}
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
