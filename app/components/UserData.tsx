"use client";

import { useAuth } from "../context/authContext";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
}

export default function UserData() {
  const { logout } = useAuth();

  const [user, setUser] = useState<User>({
    name: "Пользователь",
    email: "example@mail.ru",
    phone: "+7 (999) 123-45-67",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(user);

  const handleSave = () => {
    setUser(form);
    setIsEditing(false);
    // TODO: API request later
  };

  const handleCancel = () => {
    setForm(user);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#00796B]">
          Мои данные
        </h3>

      </div>

      {!isEditing ? (
        <>
          <p className="text-gray-700">
            <strong>Имя:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>Телефон:</strong> {user.phone}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-[#00796B] text-white px-5 py-2 rounded-xl hover:bg-[#02695C] transition"
          >
            Редактировать
          </button>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border rounded-xl p-3 w-full"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="border rounded-xl p-3 w-full"
            />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="border rounded-xl p-3 w-full"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="bg-[#00796B] text-white px-5 py-2 rounded-xl hover:bg-[#02695C] transition"
            >
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              className="border px-5 py-2 rounded-xl hover:bg-gray-50 transition"
            >
              Отмена
            </button>
          </div>
        </>
      )}
        <hr className="my-6" />

        <div className="flex justify-end">
          <button
            onClick={logout}
            className="text-red-600 border border-red-500 px-4 py-2 rounded-xl
                      hover:bg-red-50 transition text-sm"
          >
            Выйти
          </button>
        </div>
      </div>
  );
}
