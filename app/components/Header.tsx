"use client";

import { useState } from "react";
import Link from "next/link"; // 👈 импортируем Link
import ShoppingCart from "./ShoppingCart";
import Menu from "./Menu";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-[#00796B] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 👇 Логотип с переходом на главную */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/icon.png" alt="VetShop" className="w-[60px] h-[60px] rounded-[20px]" />
          <span className="text-xl font-semibold">Добриггс</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-[#EAD6B9] transition">Главная</a>
          <a href="/shop" className="hover:text-[#EAD6B9] transition">Каталог</a>
          <a href="/about" className="hover:text-[#EAD6B9] transition">О компании</a>
          <a href="/news" className="hover:text-[#EAD6B9] transition">Новости</a>
          <a href="/contacts" className="hover:text-[#EAD6B9] transition">Контакты</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCart(true)}
            className="flex items-center space-x-1 bg-[#EAD6B9] text-[#00796B] px-3 py-1.5 rounded-xl hover:bg-white transition"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline font-medium">
              Корзина ({totalCount})
            </span>
          </button>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            <Menu size={24} />
          </button>

          <Link
            href="/profile"
            className="hidden sm:flex items-center justify-center bg-white/20 p-2.5 rounded-xl hover:bg-white/30 transition"
          >
            <FiUser size={22} />
          </Link>
        </div>
      </div>

      {open && (
        <div className="bg-[#00675B] md:hidden px-4 pb-4 space-y-2">
          <Link
            href="/"
            className="block py-1 hover:text-[#EAD6B9]"
            onClick={() => setOpen(false)}
          >
            Главная
          </Link>
          <Link
            href="/shop"
            className="block py-1 hover:text-[#EAD6B9]"
            onClick={() => setOpen(false)}
          >
            Каталог
          </Link>
          <Link
            href="/about"
            className="block py-1 hover:text-[#EAD6B9]"
            onClick={() => setOpen(false)}
          >
            О компании
          </Link>
          <Link
            href="/news"
            className="block py-1 hover:text-[#EAD6B9]"
            onClick={() => setOpen(false)}
          >
            Новости
          </Link>
          <Link
            href="/contacts"
            className="block py-1 hover:text-[#EAD6B9]"
            onClick={() => setOpen(false)}
          >
            Контакты
          </Link>
          <Link
            href="/profile"
            className="block py-1 hover:text-[#EAD6B9]"
            onClick={() => setOpen(false)}
          >
            Профиль
          </Link>
        </div>
      )}

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </header>
  );
}
