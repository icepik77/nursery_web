"use client";

import React from "react";
import Image from "next/image";
import { Product, useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md flex flex-col cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div className="relative h-48 w-full mb-4">
        <Image
          src="/product.png"
          alt={product.name}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm mb-2">{product.category}</p>
      <p className="font-bold mb-2">{product.price} ₽</p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        className="mt-auto bg-[#00796B] text-white py-2 px-4 rounded hover:bg-[#00564F] transition"
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;
