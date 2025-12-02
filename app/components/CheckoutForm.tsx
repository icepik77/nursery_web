// components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { Order } from "../context/OrderContext";

interface Props {
  onSuccess?: () => void;
}

export default function CheckoutForm({ onSuccess }: Props) {
  const { cart, clearCart } = useCart();
  const { createOrder } = useOrders();
  const router = useRouter();

  const [form, setForm] = useState({ phone: "", email: "", address: "" });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.phone || !form.email || !form.address) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: "USER-123", // позже подтянется из авторизации
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      phone: form.phone,
      email: form.email,
      address: form.address,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    createOrder(newOrder);
    clearCart();

    if (onSuccess) onSuccess();
    router.push("/success");
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b last:border-none py-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × {item.price} ₽
              </p>
            </div>
            <p className="font-semibold">{item.price * item.quantity} ₽</p>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Итого:</span>
          <span>{total} ₽</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+7 (999) 123-45-67"
          className="w-full border rounded-lg p-2"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@mail.ru"
          className="w-full border rounded-lg p-2"
          required
        />

        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="г. Москва, ул. Лесная, д. 5"
          className="w-full border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#00796B] text-white py-3 rounded-lg font-semibold hover:bg-[#00695C] transition"
        >
          Подтвердить заказ
        </button>
      </form>
    </>
  );
}
