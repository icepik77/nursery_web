"use client";

import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";

export default function UserData() {
  const { logout, user, updateUser, loading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    login: "",
    phone: "",
    fullname: "",
    address: "",
    contact_email: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        login: user.login || "",
        phone: user.phone || "",
        fullname: user.fullname || "",
        address: user.address || "",
        contact_email: user.contact_email || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        Загрузка...
      </div>
    );
  }

  if (!user) return null;

  const handleSave = async () => {
    try {
      await updateUser(form);
      setIsEditing(false);
    } catch (err) {
      alert("Ошибка при сохранении данных");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      login: user.login || "",
      phone: user.phone || "",
      fullname: user.fullname || "",
      address: user.address || "",
      contact_email: user.contact_email || "",
    });
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
            <strong>Логин:</strong> {user.login}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>

          {user.phone && (
            <p className="text-gray-700">
              <strong>Телефон:</strong> {user.phone}
            </p>
          )}

          {user.role === "company" && (
            <>
              <p className="text-gray-700">
                <strong>Компания:</strong> {user.fullname}
              </p>
              <p className="text-gray-700">
                <strong>Адрес:</strong> {user.address}
              </p>
              <p className="text-gray-700">
                <strong>Контактный email:</strong> {user.contact_email}
              </p>
            </>
          )}

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
              placeholder="Логин"
              value={form.login}
              onChange={(e) =>
                setForm({ ...form, login: e.target.value })
              }
              className="border rounded-xl p-3 w-full"
            />

            <input
              type="tel"
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="border rounded-xl p-3 w-full"
            />

            {user.role === "company" && (
              <>
                <input
                  type="text"
                  placeholder="Название компании"
                  value={form.fullname}
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                  className="border rounded-xl p-3 w-full"
                />

                <input
                  type="text"
                  placeholder="Адрес"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="border rounded-xl p-3 w-full"
                />

                <input
                  type="email"
                  placeholder="Контактный email"
                  value={form.contact_email}
                  onChange={(e) =>
                    setForm({ ...form, contact_email: e.target.value })
                  }
                  className="border rounded-xl p-3 w-full"
                />
              </>
            )}
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
