import React, { useState } from "react";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  category: string;
  animal: string;
  price: number;
  image: string;
};

const productsData: Product[] = [
  {
    id: 1,
    name: "Амоксициллин 100мг",
    category: "Антибиотики",
    animal: "Собаки",
    price: 500,
    image: "/product.png",
  },
  {
    id: 2,
    name: "Витамины для кошек",
    category: "Витамины",
    animal: "Кошки",
    price: 300,
    image: "/product.png",
  },
  {
    id: 3,
    name: "Ивермектин 1%",
    category: "Противопаразитарные",
    animal: "Крупный рогатый скот",
    price: 1200,
    image: "/product.png",
  },
  {
    id: 4,
    name: "Кальций D3 для щенков",
    category: "Минеральные добавки",
    animal: "Собаки",
    price: 450,
    image: "/product.png",
  },
  {
    id: 5,
    name: "Иммуномодулятор Ветом",
    category: "Иммуномодуляторы",
    animal: "Кошки",
    price: 600,
    image: "/product.png",
  },
  {
    id: 6,
    name: "Противоглистный комплекс",
    category: "Антипаразитарные",
    animal: "Собаки",
    price: 700,
    image: "/product.png",
  },
  {
    id: 7,
    name: "Пробиотик Ветасепт",
    category: "Пробиотики",
    animal: "Птицы",
    price: 350,
    image: "/product.png",
  },
  {
    id: 8,
    name: "Антисептик для копыт",
    category: "Антисептики",
    animal: "Крупный рогатый скот",
    price: 900,
    image: "/product.png",
  },
  {
    id: 9,
    name: "Кормовая добавка Омега-3",
    category: "Добавки",
    animal: "Лошади",
    price: 1100,
    image: "/product.png",
  },
  {
    id: 10,
    name: "Шампунь от блох",
    category: "Гигиена",
    animal: "Кошки и собаки",
    price: 400,
    image: "/product.png",
  },
];


const categories = ["Антибиотики", "Витамины", "Вакцины"];
const animals = ["Собаки", "Кошки", "Птицы", "Лошади"];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useCart(); 

  const filteredProducts = productsData.filter((product) => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedAnimal || product.animal === selectedAnimal) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#F9FAF4] text-[#00796B] p-4">
      <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Фильтры */}
        <aside className="md:w-1/4 h-[80%] bg-white p-4 rounded-xl shadow-md">
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Поиск</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
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
                  onClick={() =>
                    setSelectedAnimal(selectedAnimal === animal ? null : animal)
                  }
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
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col"
              >
                <img
                  src={product.image || "/product.png"}
                  alt={product.name}
                  className="h-48 w-full object-cover mb-4 rounded"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm mb-2">{product.category}</p>
                <p className="font-bold mb-2">{product.price} ₽</p>
                <button
                  onClick={() => addToCart(product)} // 👈 вот здесь действие
                  className="mt-auto bg-[#00796B] text-white py-2 px-4 rounded hover:bg-[#00564F] transition"
                >
                  В корзину
                </button>
              </div>
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
}
