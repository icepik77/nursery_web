"use client";

import React from "react";
import { Product, useCart } from "../context/CartContext";
import { useRouter } from "next/navigation"; // <- важно

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter(); // теперь работает с app/dir

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md flex flex-col cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <img
        src={"/product.png"}
        alt={product.name}
        className="h-48 w-full object-cover mb-4 rounded"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm mb-2">{product.category}</p>
      <p className="font-bold mb-2">{product.price} ₽</p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // останавливаем клик по карточке
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
