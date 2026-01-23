"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

export type User = {
  id: string;
  email: string;
  login: string;
  avatar?: string;
  role: "individual" | "company";
  fullname?: string;
  address?: string;
  inn?: string;
  phone?: string;
  contact_email?: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  setUserAndToken: (user: User, token: string) => Promise<void>;
  updateUser: (partialUser: Partial<User> & { avatar?: File }) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /* ===== LOAD FROM LOCALSTORAGE ===== */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  /* ===== SAVE USER & TOKEN ===== */
  const setUserAndToken = async (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  /* ===== UPDATE USER (WITH AVATAR) ===== */
  const updateUser = async (partialUser: Partial<User> & { avatar?: File }) => {
    if (!user || !token) throw new Error("Not authorized");

    const formData = new FormData();

    Object.entries(partialUser).forEach(([key, value]) => {
      if (value && key !== "avatar") {
        formData.append(key, String(value));
      }
    });

    if (partialUser.avatar) {
      formData.append("avatar", partialUser.avatar);
    }

    const response = await fetch(
      `http://83.166.244.36:3000/api/auth/${user.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const updatedUser: User = await response.json();
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  /* ===== UPDATE PASSWORD ===== */
  const updatePassword = async (password: string) => {
    if (!user || !token) throw new Error("Not authorized");

    const response = await fetch(
      `http://83.166.244.36:3000/api/auth/${user.id}/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!response.ok) {
      throw new Error("Password update failed");
    }
  };

  /* ===== LOGOUT ===== */
  const logout = async () => {
    try {
      await fetch("http://83.166.244.36:3000/api/auth/logout", {
        method: "POST",
        credentials: "include", // IMPORTANT: sends cookies
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.clear();
      router.replace("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        setUserAndToken,
        updateUser,
        updatePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
