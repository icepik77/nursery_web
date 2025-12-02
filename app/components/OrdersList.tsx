"use client";

import { useOrders } from "../context/OrderContext";
import { Order } from "../context/OrderContext";

export default function OrdersList() {
  const { orders } = useOrders();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-[#00796B]">
        История заказов
      </h3>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">У вас пока нет заказов</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="border rounded-xl p-5 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-[#00796B] text-lg">
                  Заказ {order.id}
                </p>

                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold
                    ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "pending"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {order.status === "delivered"
                    ? "Доставлен"
                    : order.status === "processing"
                    ? "В обработке"
                    : order.status === "pending"
                    ? "Ожидает"
                    : "Отменён"}
                </span>
              </div>

              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.productId} className="py-2 flex justify-between">
                    <span className="text-gray-700">
                      {item.name} — {item.quantity} шт.
                    </span>
                    <span className="font-medium">{item.price * item.quantity} ₽</span>
                  </div>
                ))}
              </div>

              <p className="font-semibold text-lg mt-4">
                Итого: {order.total} ₽
              </p>

              <div className="text-sm text-gray-600 mt-3 space-y-1">
                <p><strong>Адрес доставки:</strong> {order.address}</p>
                <p><strong>Телефон:</strong> {order.phone}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Дата заказа:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
