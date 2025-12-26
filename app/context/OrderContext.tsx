"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

/* =======================
   Types
======================= */

export type OrderStatus =
  | "pending"
  | "processing"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product?: {
    name: string;
    image: string;
  };
};

export type Order = {
  id: string;
  userId: string | null;
  total: number;
  phone: string;
  email: string;
  address: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
};

type CreateOrderPayload = {
  phone: string;
  email: string;
  address: string;
  items: {
    productId: number;
    quantity: number;
  }[];
};

type OrderContextType = {
  orders: Order[];
  loading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  getOrderById: (id: string) => Promise<Order | null>;
  createOrder: (payload: CreateOrderPayload) => Promise<Order | null>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
};

/* =======================
   Context
======================= */

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const API_URL = "/api";

/* =======================
   Provider
======================= */

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  /* =======================
     Fetch all orders
  ======================= */

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers,
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data: Order[] = await res.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* =======================
     Get order by ID
  ======================= */

  const getOrderById = async (id: string): Promise<Order | null> => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        headers,
      });

      if (!res.ok) return null;

      return await res.json();
    } catch {
      return null;
    }
  };

  /* =======================
     Create order
  ======================= */

  const createOrder = async (
    payload: CreateOrderPayload
  ): Promise<Order | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const newOrder: Order = await res.json();
      setOrders((prev) => [newOrder, ...prev]);

      return newOrder;
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     Update order status
  ======================= */

  const updateOrderStatus = async (
    id: string,
    status: OrderStatus
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/orders/${id}/status`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status } : o
        )
      );
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     Auto-load orders
  ======================= */

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        getOrderById,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

/* =======================
   Hook
======================= */

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrders must be used inside <OrderProvider>");
  }
  return ctx;
};
