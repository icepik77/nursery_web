import CheckoutForm from "../components/CheckoutForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description:
    "Оформление заказа для жиотных от Добриггс",
  openGraph: {
    title: "Оформление заказа — Добригс",
    description:
      "Оформление заказа для жиотных от Добриггс",
    locale: "ru_RU",
    type: "website",
  },
};

export default function CheckoutPage() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 bg-[#F9FAF4] rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-[#00796B] mb-6 text-center">
        Оформление заказа
      </h2>

      <CheckoutForm />
    </section>
  );
}