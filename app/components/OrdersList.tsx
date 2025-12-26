"use client";

import { useOrders } from "../context/OrderContext";
import { Order } from "../context/OrderContext";

const statusMap = {
  delivered: {
    label: "Доставлен",
    className: "bg-green-100 text-green-700",
  },
  processing: {
    label: "В обработке",
    className: "bg-yellow-100 text-yellow-700",
  },
  pending: {
    label: "Ожидает",
    className: "bg-blue-100 text-blue-700",
  },
  cancelled: {
    label: "Отменён",
    className: "bg-red-100 text-red-700",
  },
};

export default function OrdersList() {
  const { orders } = useOrders();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-[#00796B]">
        История заказов
      </h3>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">
          У вас пока нет заказов
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="border rounded-xl p-5 hover:bg-gray-50 transition"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <p className="font-semibold text-[#00796B] text-lg">
                  Заказ #{order.id.slice(0, 8)}
                </p>

                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold w-fit
                    ${statusMap[order.status].className}`}
                >
                  {statusMap[order.status].label}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="py-3 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}

                      <div>
                        <p className="text-gray-800 font-medium">
                          {item.product?.name ?? "Товар удалён"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × {item.priceAtPurchase} ₽
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold">
                      {item.quantity * item.priceAtPurchase} ₽
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <p className="font-semibold text-lg mt-4">
                Итого: {order.total} ₽
              </p>

              {/* Meta */}
              <div className="text-sm text-gray-600 mt-4 space-y-1">
                <p>
                  <strong>Адрес доставки:</strong> {order.address}
                </p>
                <p>
                  <strong>Телефон:</strong> {order.phone}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Дата заказа:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
