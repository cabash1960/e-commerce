"use client";

import { Products } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

function ProductDetails({
  selectedProduct,
}: {
  selectedProduct: Products | undefined;
}) {
  const { items, addItems } = useCartStore();

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const cartItem = items.find((item) => item.id === selectedProduct.id);
  const quantity = cartItem?.quantity || 0;

  const onAddItem = () => {
    addItems({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1,
    });
  };

  const onRemoveItem = () => {
    addItems({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: -1,
    });
  };

  let imageUrl = "";
  try {
    const parsedImages = JSON.parse(selectedProduct.images);
    imageUrl = Array.isArray(parsedImages) ? parsedImages[0] : parsedImages;
  } catch {
    imageUrl = selectedProduct.images;
  }

  return (
    <div className="flex  gap-3">
      {selectedProduct.image ? (
        <Image
          src={selectedProduct.image}
          alt="product-image"
          width={500}
          height={500}
        />
      ) : (
        <Image src={imageUrl} alt="product-image" width={500} height={500} />
      )}
      <h1>{selectedProduct.name}</h1>
      {selectedProduct.description && <p>{selectedProduct.description}</p>}
      <p>Price: ${selectedProduct.price}</p>
      <button onClick={() => onAddItem()}>+</button>
      <p>{quantity}</p>

      <button onClick={() => onRemoveItem()}>-</button>
    </div>
  );
}

export default ProductDetails;
