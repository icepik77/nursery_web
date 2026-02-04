"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

import { setAccessToken } from "../api/authFetch";

export default function AuthForm() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [accountType, setAccountType] = useState<"individual" | "company">("individual");
  const [error, setError] = useState("");

  const {setUserAndToken} = useAuth(); 

  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
    phone: "",
    fullname: "",
    inn: "",
    address: "",
    contact_email: "",
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
        : {
            role: accountType,
            login: form.login,
            email: form.email,
            password: form.password,
            phone: form.phone,
            fullname: accountType === "company" ? form.fullname : undefined,
            inn: accountType === "company" ? form.inn : undefined,
            address: accountType === "company" ? form.address : undefined,
            contact_email:
              accountType === "company" ? form.contact_email : undefined,
          };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ошибка");
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUserAndToken(data.user, data.accessToken); 
      

      router.replace("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
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
        {mode === "register" && (
          <input
            name="login"
            placeholder="Логин"
            value={form.login}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        )}

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />

        {mode === "register" && (
          <input
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        )}

        {mode === "register" && accountType === "company" && (
          <>
            <input
              name="fullname"
              placeholder="ФИО ответственного"
              value={form.fullname}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              name="contact_email"
              placeholder="Контактный Email"
              value={form.contact_email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              name="inn"
              placeholder="ИНН"
              value={form.inn}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              name="address"
              placeholder="Адрес"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </>
        )}

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />

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
