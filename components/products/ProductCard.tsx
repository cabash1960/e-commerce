import type { Products } from "@/lib/types";
import { inStock } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { ShoppingBag } from "lucide-react";

function ProductCard({ product }: { product: Products }) {
  const { addItems } = useCartStore();

  const onAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
    <div className="relative group w-full max-w-sm">
      <Link href={`/products/${product.id}`} className="block">
        <div
          className="relative p-6 rounded-2xl 
          bg-gradient-to-br from-[#2a150a] to-[#1a0a05]
          border border-[#ff6b35]/30
          hover:border-[#ff6b35]
          transition-all duration-300
          overflow-hidden
          shadow-lg hover:shadow-2xl hover:shadow-[#ff6b35]/20"
        >
          {/* Sale Badge */}
          {product.compareAtPrice && (
            <div className="absolute top-4 right-4 z-10 bg-[#ff6b35] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              SALE
            </div>
          )}

          <div className="flex flex-col gap-4">
            {/* Image */}
            <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm">
              <Image
                src={product.image || product.images[0]}
                alt={`${product.name} sneaker`}
                width={300}
                height={300}
                loading="lazy"
                className="w-full h-64 object-contain 
                  group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 text-center min-h-[120px]">
              <h3 className="font-bold text-lg text-[#F5EDE6] tracking-wide line-clamp-1">
                {product.name}
              </h3>

              <p className="text-sm text-[#b9b9b9] line-clamp-2 flex-1">
                {product.description || "Premium quality footwear"}
              </p>

              {/* Price */}
              <div className="flex items-center justify-center gap-3 mt-2">
                {/* Main price */}
                <p className="text-2xl font-bold text-[#FFB26B]">
                  ₦{product.price.toLocaleString()}
                </p>

                {/* Compare price */}
                {product.compareAtPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    ₦{product.compareAtPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom spacing for button */}
          <div className="h-16" />
        </div>
      </Link>

      <button
        className={`absolute bottom-0 left-0 right-0 mx-auto w-[calc(100%-3rem)] mb-3
          rounded-xl py-3.5 font-semibold text-sm
          flex items-center justify-center gap-2
          transition-all duration-300 transform
          ${
            inStock(product)
              ? "bg-[#ff6b35] opacity-100 text-white md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-[#ff8c5a] active:scale-95 shadow-lg z-20"
              : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-100"
          }
        `}
        onClick={onAddItem}
        disabled={!inStock(product)}
      >
        <ShoppingBag size={18} />
        {inStock(product) ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default ProductCard;
