"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [accountType, setAccountType] = useState<"individual" | "company">("individual");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
    phone: "",
    fullName: "",
    companyName: "",
    inn: "",
    address: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    const url =
      mode === "login"
        ? "http://83.166.244.36:3000/api/auth/login"
        : "http://83.166.244.36:3000/api/auth/register";

    const body =
      mode === "login"
        ? {
            email: form.email,
            password: form.password,
          }
        : accountType === "individual"
        ? {
            type: "private",
            login: form.login,
            email: form.email,
            password: form.password,
            phone: form.phone,
          }
        : {
            type: "legal",
            login: form.login,
            email: form.email,
            password: form.password,
            phone: form.phone,
            fullName: form.fullName,
            companyName: form.companyName,
            inn: form.inn,
            address: form.address,
          };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.message || "Ошибка");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      router.replace("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
      {/* Вкладки вход/регистрация */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-2 font-semibold ${
            mode === "login"
              ? "text-[#00796B] border-b-2 border-[#00796B]"
              : "text-gray-500"
          }`}
        >
          Вход
        </button>
        <button
          onClick={() => setMode("register")}
          className={`flex-1 py-2 font-semibold ${
            mode === "register"
              ? "text-[#00796B] border-b-2 border-[#00796B]"
              : "text-gray-500"
          }`}
        >
          Регистрация
        </button>
      </div>

      {mode === "register" && (
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={accountType === "individual"}
              onChange={() => setAccountType("individual")}
            />
            Частное лицо
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={accountType === "company"}
              onChange={() => setAccountType("company")}
            />
            Юр. лицо
          </label>
        </div>
      )}

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* LOGIN */}
        <div>
          <label className="block mb-1">Эл. почта</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Email */}
        {mode === "register" && (
          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        )}

        {/* Телефон — только при регистрации */}
        {mode === "register" && (
          <div>
            <label className="block mb-1">Телефон</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        )}

        {/* Только для юридического лица */}
        {mode === "register" && accountType === "company" && (
          <>
            <div>
              <label className="block mb-1">ФИО ответственного</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1">Название компании</label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1">ИНН</label>
              <input
                name="inn"
                value={form.inn}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1">Адрес</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        )}

        {/* Password */}
        <div>
          <label className="block mb-1">Пароль</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00796B] text-white py-2 rounded-xl font-semibold"
        >
          {mode === "login" ? "Войти" : "Создать аккаунт"}
        </button>
      </form>
    </div>
  );
}
