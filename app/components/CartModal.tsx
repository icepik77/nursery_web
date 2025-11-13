"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react"; // 👈 красивая иконка удаления

type CartModalProps = {
  onClose: () => void;
};

export default function CartModal({ onClose }: CartModalProps) {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    // 👇 светлая прозрачность вместо чёрного затемнения
    <div className="fixed inset-0 bg-[#F9FAF4]/70 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-[#F9FAF4] w-full sm:w-[420px] h-full p-6 overflow-y-auto shadow-lg relative border-l border-[#00796B]/20">
        {/* кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#00796B] hover:text-[#00564F] text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#00796B]">Корзина</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Ваша корзина пуста</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-[#00796B]/10"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image || "/product.png"}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover border border-[#00796B]/10"
                    />
                    <div>
                      <p className="font-semibold text-[#00796B]">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × {item.price} ₽
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#00796B] hover:text-red-600 transition"
                    title="Удалить"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="font-semibold text-lg mb-4 text-[#00796B] flex justify-between">
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>

            <button
              onClick={() => alert("Переход к оформлению заказа")}
              className="w-full bg-[#00796B] text-white py-2 rounded-lg hover:bg-[#00564F] transition"
            >
              Оформить заказ
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-2 border border-[#00796B] text-[#00796B] py-2 rounded-lg hover:bg-white transition"
            >
              Очистить корзину
            </button>
          </>
        )}
      </div>
    </div>
  );
}
