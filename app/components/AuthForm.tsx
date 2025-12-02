// components/AuthForm.tsx
"use client";

import { useState } from "react";

interface Props {
  onSubmit?: (data: {
    mode: "login" | "register";
    email: string;
    password: string;
    phone?: string;
    isKennel?: boolean;
    isLegal?: boolean;
  }) => void;
}

export default function AuthForm({ onSubmit }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    isKennel: false,
    isLegal: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = { mode, ...form };
    console.log("Submit:", payload);

    if (onSubmit) onSubmit(payload);
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
      {/* Табы */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-2 text-center font-semibold ${
            mode === "login"
              ? "text-[#00796B] border-b-2 border-[#00796B]"
              : "text-gray-500"
          }`}
        >
          Вход
        </button>
        <button
          onClick={() => setMode("register")}
          className={`flex-1 py-2 text-center font-semibold ${
            mode === "register"
              ? "text-[#00796B] border-b-2 border-[#00796B]"
              : "text-gray-500"
          }`}
        >
          Регистрация
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00796B]"
          />
        </div>

        {/* Телефон — только при регистрации */}
        {mode === "register" && (
          <div>
            <label className="block mb-1 font-medium">Телефон</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            />
          </div>
        )}

        {/* Пароль */}
        <div>
          <label className="block mb-1 font-medium">Пароль</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00796B]"
          />
        </div>

        {/* Чекбоксы — только при регистрации */}
        {mode === "register" && (
          <div className="space-y-2 pt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isKennel"
                checked={form.isKennel}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Заводчик / Питомник</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isLegal"
                checked={form.isLegal}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Юр. лицо</span>
            </label>
          </div>
        )}

        {/* Кнопка */}
        <button
          type="submit"
          className="w-full bg-[#00796B] text-white py-2 rounded-xl font-semibold hover:bg-[#015F52] transition"
        >
          {mode === "login" ? "Войти" : "Создать аккаунт"}
        </button>
      </form>
    </div>
  );
}
