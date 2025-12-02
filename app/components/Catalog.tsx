"use client";

import { useCart } from "../context/CartContext";
import { useProductFilters } from "../context/ProductFilterContext";
import ProductCard from "./ProductCard";

const categories = ["Антибиотики", "Витамины", "Вакцины"];
const animals = ["Собаки", "Кошки", "Птицы", "Лошади"];

export default function Catalog() {
  const { products } = useCart();
  const {
    selectedCategory,
    selectedAnimal,
    searchTerm,
    setCategory,
    setAnimal,
    setSearch,
  } = useProductFilters();

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedAnimal || product.animal === selectedAnimal) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <section className="w-full bg-[#00796B] text-white py-8 px-6 rounded-2xl mb-12 mt-8 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold">
            Скидка 10% на все препараты для новых клиентов!
          </h2>
          <p className="text-sm md:text-base mt-2">
            Оформите первый заказ прямо сейчас и получите скидку на все товары.
          </p>
        </div>
        <a
          href="/login"
          className="bg-[#F9FAF4] text-[#00796B] font-semibold px-6 py-3 rounded-lg hover:bg-[#e0e5dd] transition"
        >
          Войти
        </a>
      </section>
      <div className="min-h-screen bg-[#F9FAF4] text-[#00796B] p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Фильтры */}
            <aside className="md:w-1/4 h-[80%] bg-white p-4 rounded-xl shadow-md">
              <div className="mb-4">
                <h2 className="font-semibold mb-2">Поиск</h2>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Название товара..."
                  className="w-full border border-[#00796B] rounded p-2"
                />
              </div>

              <div className="mb-4">
                <h2 className="font-semibold mb-2">Категория</h2>
                <ul>
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`cursor-pointer py-1 px-2 rounded hover:bg-[#00796B] hover:text-white ${
                        selectedCategory === cat ? "bg-[#00796B] text-white" : ""
                      }`}
                      onClick={() => setCategory(selectedCategory === cat ? null : cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Вид животного</h2>
                <ul>
                  {animals.map((animal) => (
                    <li
                      key={animal}
                      className={`cursor-pointer py-1 px-2 rounded hover:bg-[#00796B] hover:text-white ${
                        selectedAnimal === animal ? "bg-[#00796B] text-white" : ""
                      }`}
                      onClick={() => setAnimal(selectedAnimal === animal ? null : animal)}
                    >
                      {animal}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Сетка товаров */}
            <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length ? (
                filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <p>Товары не найдены</p>
              )}
            </div>
          </div>
        </div>
    </div>
    </>
    
  );
}
