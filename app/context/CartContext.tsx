"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type ProductAttribute = {
  key: string;
  value: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  animal: string;
  price: number;
  image: string;
  description?: string;
  attributes?: ProductAttribute[];
};

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;

  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_URL =
   "http://83.166.244.36:3000/api";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  /* =====================
     PRODUCTS (backend)
  ===================== */
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setProductsError("Не удалось загрузить товары");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =====================
     CART
  ===================== */
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        console.warn("Invalid cart data");
      }
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
