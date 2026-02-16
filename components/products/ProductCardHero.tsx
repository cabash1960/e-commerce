import type { Products } from "@/lib/types";
import { inStock } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { ShoppingBag } from "lucide-react";

function ProductCardHero({ product }: { product: Products }) {
  const { addItems } = useCartStore();

  const onAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock(product)) return;

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
    <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <Link
        href={`/products/${product.id}`}
        className="grid md:grid-cols-2 gap-0"
      >
        {/* Image Section */}
        <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={product.image || product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Sale Badge */}
          {product.compareAtPrice && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              SALE
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
              Featured Collection
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h3>

            <p className="text-base text-gray-600 leading-relaxed mb-6">
              {product.description ||
                "Engineered for comfort and designed for bold expression. Step forward with confidence and elevate your everyday movement."}
            </p>
          </div>

          <div>
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ₦{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ₦{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={onAddItem}
              disabled={!inStock(product)}
              className={`w-full flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold transition-all transform ${
                inStock(product)
                  ? "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={20} />
              {inStock(product) ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCardHero;
