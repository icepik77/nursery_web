"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  category: string;
  animal: string;
  price: number;
  image: string;
  description?: string; // краткое описание товара
  attributes?: { key: string; value: string }[]; // характеристики товара
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  products: Product[]; // 👈 добавляем
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const productsData: Product[] = [
  {
    id: 1,
    name: "Амоксициллин 100мг",
    category: "Антибиотики",
    animal: "Собаки",
    price: 500,
    image: "/product.png",
    description: "Антибиотик широкого спектра действия для лечения бактериальных инфекций у собак.",
    attributes: [
      { key: "Форма выпуска", value: "Таблетки" },
      { key: "Дозировка", value: "100 мг" },
      { key: "Производитель", value: "VetPharma" },
      { key: "Состав", value: "Амоксициллин тригидрат, вспомогательные вещества" },
    ],
  },
  {
    id: 2,
    name: "Витамины для кошек",
    category: "Витамины",
    animal: "Кошки",
    price: 300,
    image: "/product.png",
    description: "Комплекс витаминов для поддержания здоровья кошек.",
    attributes: [
      { key: "Форма выпуска", value: "Порошок" },
      { key: "Вес", value: "50 г" },
      { key: "Производитель", value: "PetHealth" },
      { key: "Состав", value: "Витамин A, Витамин D3, Витамин E, микроэлементы" },
    ],
  },
  {
    id: 3,
    name: "Ивермектин 1%",
    category: "Противопаразитарные",
    animal: "Крупный рогатый скот",
    price: 1200,
    image: "/product.png",
    description: "Препарат для профилактики и лечения паразитарных заболеваний у КРС.",
    attributes: [
      { key: "Форма выпуска", value: "Раствор" },
      { key: "Концентрация", value: "1%" },
      { key: "Производитель", value: "AgroVet" },
      { key: "Состав", value: "Ивермектин, вода очищенная" },
    ],
  },
  {
    id: 4,
    name: "Кальций D3 для щенков",
    category: "Минеральные добавки",
    animal: "Собаки",
    price: 450,
    image: "/product.png",
    description: "Минеральная добавка для правильного роста костей и зубов щенков.",
    attributes: [
      { key: "Форма выпуска", value: "Таблетки" },
      { key: "Вес", value: "100 г" },
      { key: "Состав", value: "Кальций карбонат, Витамин D3, магний" },
    ],
  },
  {
    id: 5,
    name: "Иммуномодулятор Ветом",
    category: "Иммуномодуляторы",
    animal: "Кошки",
    price: 600,
    image: "/product.png",
    description: "Поддержка иммунитета кошек при стрессах и болезнях.",
    attributes: [
      { key: "Форма выпуска", value: "Капли" },
      { key: "Производитель", value: "VetCare" },
      { key: "Состав", value: "Экстракт эхинацеи, таурин, витамины" },
    ],
  },
  {
    id: 6,
    name: "Противоглистный комплекс",
    category: "Антипаразитарные",
    animal: "Собаки",
    price: 700,
    image: "/product.png",
    description: "Комплексное средство против глистов и внутренних паразитов у собак.",
    attributes: [
      { key: "Форма выпуска", value: "Таблетки" },
      { key: "Производитель", value: "PetPharma" },
      { key: "Состав", value: "Празиквантел, Пирантел, вспомогательные вещества" },
    ],
  },
  {
    id: 7,
    name: "Пробиотик Ветасепт",
    category: "Пробиотики",
    animal: "Птицы",
    price: 350,
    image: "/product.png",
    description: "Пробиотик для улучшения пищеварения и укрепления иммунитета птиц.",
    attributes: [
      { key: "Форма выпуска", value: "Порошок" },
      { key: "Вес", value: "25 г" },
      { key: "Состав", value: "Lactobacillus acidophilus, Bifidobacterium, дрожжи" },
    ],
  },
  {
    id: 8,
    name: "Антисептик для копыт",
    category: "Антисептики",
    animal: "Крупный рогатый скот",
    price: 900,
    image: "/product.png",
    description: "Защита от инфекций и воспалений копыт у КРС.",
    attributes: [
      { key: "Форма выпуска", value: "Раствор" },
      { key: "Объем", value: "1 л" },
      { key: "Состав", value: "Хлоргексидин, вода очищенная" },
    ],
  },
  {
    id: 9,
    name: "Кормовая добавка Омега-3",
    category: "Добавки",
    animal: "Лошади",
    price: 1100,
    image: "/product.png",
    description: "Добавка для улучшения состояния шерсти и кожи лошадей.",
    attributes: [
      { key: "Форма выпуска", value: "Масло" },
      { key: "Объем", value: "500 мл" },
      { key: "Состав", value: "Рыбий жир, витамин E" },
    ],
  },
  {
    id: 10,
    name: "Шампунь от блох",
    category: "Гигиена",
    animal: "Кошки и собаки",
    price: 400,
    image: "/product.png",
    description: "Эффективный шампунь против блох и клещей.",
    attributes: [
      { key: "Форма выпуска", value: "Жидкость" },
      { key: "Объем", value: "250 мл" },
      { key: "Состав", value: "Перметрин, вода очищенная, ароматизатор" },
    ],
  },
];


export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ⬇ Загружаем корзину из localStorage при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка чтения корзины из localStorage");
      }
    }
  }, []);

  // ⬇ Сохраняем корзину при каждом изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, products: productsData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
