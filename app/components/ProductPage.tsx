"use client";

import React from "react";
import { Product, useCart } from "@/app/context/CartContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
      {/* Изображение товара */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={product.image || "/product.png"}
          alt={product.name}
          className="w-full h-auto max-h-96 object-cover rounded-xl"
        />
      </div>

      {/* Информация о товаре */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-700">
          Категория: <span className="font-semibold">{product.category}</span>
        </p>
        <p className="text-sm text-gray-700">
          Для: <span className="font-semibold">{product.animal}</span>
        </p>
        <p className="text-2xl font-bold text-[#00796B]">{product.price} ₽</p>

        {product.description && (
          <div className="mt-2">
            <h3 className="font-semibold mb-1">Описание</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        {product.attributes && product.attributes.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Характеристики</h3>
            <ul className="text-gray-700 space-y-1">
              {product.attributes.map((attr, index) => (
                <li key={index}>
                  <span className="font-medium">{attr.key}:</span> {attr.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-[#00796B] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#00564F] transition w-full md:w-auto"
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
