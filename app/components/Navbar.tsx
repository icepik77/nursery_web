"use client";

import React, { useState } from "react";
import Link from "next/link";

type MenuItem = {
  label: string;
  href: string;
};

const MENU: MenuItem[] = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "О нас", href: "/about" },
  { label: "Цены", href: "/pricing" },
  { label: "Клиенты", href: "/clients" },
  { label: "Контакты", href: "/contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 bg-[#1A3129] mt-[26%]">
          <div className="flex items-center ml-[4%]">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-gradient-to-br from-pink-500 to-rose-400 rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <span className="text-lg font-semibold text-white">Dobriggs</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex items-center gap-6">
              {MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <Link
                href="/new"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Добавить питомца
              </Link>
            </div>
          </div>

          {/* Кнопка мобильного меню с зелеными полосками */}
          <div className="md:hidden mr-[6%]">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="flex flex-col justify-between w-[25.5px] h-[17px] focus:outline-none"
            >
              {/* Полоска 1 */}
              <span className="block w-full h-0.5 bg-[#CBEA7B] rounded"></span>
              {/* Полоска 2 */}
              <span className="block w-full h-0.5 bg-[#CBEA7B] rounded"></span>
              {/* Полоска 3 (70% длины) */}
              <span className="block w-[70%] h-0.5 bg-[#CBEA7B] rounded self-end"></span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-[#DCF1A7]">
          <div className="px-4 pt-4 pb-3 space-y-1">
            {MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 px-3">
              <Link
                href="/new"
                className="w-full block text-center px-4 py-2 rounded-md text-sm font-medium bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => setOpen(false)}
              >
                Добавить питомца
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}