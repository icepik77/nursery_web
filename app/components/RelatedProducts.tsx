"use client";

import React from "react";
import { Product, useCart } from "../context/CartContext";

type RelatedProductsProps = {
  currentProductId: number;
};

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
  const { products, addToCart } = useCart();

  const related = products.filter((p) => p.id !== currentProductId).slice(0, 8);

  console.log("Related products", related); // 🔍

  if (!related.length) return <p className="text-center text-gray-500 mt-6">Нет других товаров</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6">С этим товаром покупают</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-md flex flex-col cursor-pointer">
            <img
              src={ "/product.png"}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="font-bold text-[#00796B]">{product.price} ₽</p>
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
        ))}
      </div>
    </div>
  );
};
