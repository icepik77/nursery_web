// components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

interface Props {
  onSuccess?: () => void;
}

export default function CheckoutForm({ onSuccess }: Props) {
  const { cart, clearCart } = useCart();
  const {user} = useAuth();
  const { createOrder, loading, error } = useOrders();
  const router = useRouter();

  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("user", user);

    if (!form.phone || !form.email || !form.address) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    if (cart.length === 0) {
      alert("Корзина пуста");
      return;
    }

    const payload = {
      phone: form.phone,
      email: form.email,
      user_id: user?.id!,
      address: form.address,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
    
    console.log("payload", payload);

    const order = await createOrder(payload);

    if (!order) return;

    clearCart();
    onSuccess?.();
    router.push("/success");
  };

  return (
    <>
      {/* Order summary */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b last:border-none py-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × {item.price} ₽
              </p>
            </div>
            <p className="font-semibold">
              {item.price * item.quantity} ₽
            </p>
          </div>
        ))}

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Итого:</span>
          <span>{total} ₽</span>
        </div>
      </div>

      {/* Checkout form */}
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

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00796B] text-white py-3 rounded-lg font-semibold hover:bg-[#00695C] transition disabled:opacity-50"
        >
          {loading ? "Оформляем заказ..." : "Подтвердить заказ"}
        </button>
      </form>
    </>
  );
}
