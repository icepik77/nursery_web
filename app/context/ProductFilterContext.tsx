"use client";

import React, { createContext, useContext, useState } from "react";

type FilterContextType = {
  selectedCategory: string | null;
  selectedAnimal: string | null;
  searchTerm: string;

  setCategory: (value: string | null) => void;
  setAnimal: (value: string | null) => void;
  setSearch: (value: string) => void;
  resetFilters: () => void;
};

const ProductFilterContext = createContext<FilterContextType | undefined>(undefined);

export const ProductFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedAnimal(null);
    setSearchTerm("");
  };

  return (
    <ProductFilterContext.Provider
      value={{
        selectedCategory,
        selectedAnimal,
        searchTerm,
        setCategory: setSelectedCategory,
        setAnimal: setSelectedAnimal,
        setSearch: setSearchTerm,
        resetFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilters = () => {
  const context = useContext(ProductFilterContext);
  if (!context) throw new Error("useProductFilters must be used within ProductFilterProvider");
  return context;
};
