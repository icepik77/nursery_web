"use client";

import Link from "next/link";
import { FAQ } from "./components/FAQ";
import { useProductFilters } from "./context/ProductFilterContext";
import { Truck, ShieldCheck, Stethoscope, Users } from "lucide-react";

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Добриггс — товары для животных",
//   description:
//     "Будьте в курсе обновлений — скидки, акции, новые товары и ветеринарные препараты.",
//   openGraph: {
//     title: "Главная страница — Добригс",
//     description:
//       "Свежие скидки, акции и новые поступления товаров для питомцев.",
//     locale: "ru_RU",
//     type: "website",
//   },
// };

const categories = [
  { name: "Антибиотики", image: "/antibiotic.png" },
  { name: "Витамины", image: "/vitamins.png" },
  { name: "Вакцины", image: "/vaccine.png" },
  { name: "Игрушки", image: "/toys.png" },
  { name: "Корма", image: "/food.png" },
  { name: "Прочее", image: "/product.png" },
];

export default function Home() {
  const { setCategory, resetFilters } = useProductFilters();

  const handleSelect = (category: string) => {
    resetFilters(); // чтобы не зависали старые фильтры
    setCategory(category);
  };

  const DELIVERY_LIMIT = 8000; // можно менять сумму бесплатной доставки

  const promos = [
    {
      id: 1,
      title: "Скидка новому клиенту",
      text: "Получите −10% на первый заказ при регистрации на сайте.",
      btn: "Получить скидку",
      href: "/login",
    },
    {
      id: 2,
      title: "Бесплатная доставка",
      text: `Оформите заказ от ${DELIVERY_LIMIT} ₽ и доставка будет бесплатной.`,
      btn: "Перейти к товарам",
      href: "/shop",
    },
    {
      id: 3,
      title: "Спецпредложение для питомников и клиник",
      text: "Индивидуальные цены и условия сотрудничества для юридических лиц.",
      btn: "Узнать условия",
      href: "/partners",
    },
  ];

  const features = [
    {
      id: 1,
      icon: <Truck size={40} />,
      title: "Быстрая отправка по РФ",
      text: "Отправляем заказ в день подтверждения. Доставка удобной для вас курьерской службой.",
    },
    {
      id: 2,
      icon: <ShieldCheck size={40} />,
      title: "Сертифицированные препараты",
      text: "Вся продукция официально сертифицирована и хранится по ветеринарным стандартам.",
    },
    {
      id: 3,
      icon: <Stethoscope size={40} />,
      title: "Сопровождение ветеринарного врача",
      text: "Помогаем с подбором дозировки и ответим на вопросы по применению.",
    },
    {
      id: 4,
      icon: <Users size={40} />,
      title: "Работаем с юр. и физ. лицами",
      text: "Поддержка питомников, клиник и частных владельцев. Отгрузка от 1 позиции.",
    },
  ];

  return (
    <>
      <main className="">
        <section className="w-full bg-[#F9FAF4] py-20 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            
            {/* Левый блок — текст */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-[#00796B] mb-6">
                Ветеринарные препараты и товары для животных с доставкой по всей России
              </h1>

              <p className="text-gray-700 text-lg md:text-xl mb-6">
                <span className="font-semibold text-[#00796B]">Добриггс</span> — надежный поставщик для питомников,
                ветеринарных клиник и частных владельцев с 2017 года.
              </p>

              <ul className="text-gray-700 space-y-2 mb-8 text-lg">
                <li>✔ Сертифицированные препараты</li>
                <li>✔ Подбор дозировки с ветеринаром</li>
                <li>✔ Быстрая доставка по РФ</li>
              </ul>

              {/* CTA кнопки */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="/shop"
                  className="px-8 py-4 bg-[#00796B] text-white rounded-2xl font-semibold shadow-md hover:opacity-90 transition"
                >
                  Перейти в каталог
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white text-[#00796B] border-2 border-[#00796B] rounded-2xl font-semibold shadow-sm hover:bg-[#F9FAF4] transition"
                >
                  Получить консультацию
                </a>
              </div>
            </div>

            {/* Правый блок — изображение */}
            <div className="flex-1 flex justify-center">
              <img
                src="/1a5c7e7b-6a7b-420e-b1c1-7d166004f3cd.png"
                alt="Ветеринарные товары"
                className="w-full max-w-[650px] rounded-3xl shadow-md object-cover"
              />
            </div>
          </div>
        </section>
        <section className="py-16 bg-[#F9FAF4] text-[#00796B]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Популярные категории
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href="/shop"
                  onClick={() => handleSelect(cat.name)}
                  className="relative group rounded-xl overflow-hidden shadow-md border border-[#00796B]/20 cursor-pointer"
                >
                  {/* Изображение на всю ширину */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Затемнение при наведении */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />

                  {/* Текст */}
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white font-semibold text-xl drop-shadow-lg">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-16 px-6 bg-[#F9FAF4]">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#00796B]">Акции и спецпредложения</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="bg-white border border-[#00796B]/20 shadow-sm rounded-3xl p-8 flex flex-col items-start text-left hover:shadow-md transition"
              >
                <h3 className="text-2xl font-bold text-[#00796B] mb-4">{promo.title}</h3>
                <p className="text-gray-700 mb-8 leading-relaxed">{promo.text}</p>

                <Link
                  href={promo.href}
                  className="mt-auto inline-block bg-[#00796B] px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90 transition"
                >
                  {promo.btn}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full bg-[#F9FAF4] py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-[#00796B] mb-2">
              Почему нас выбирают
            </h2>
            <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
              Мы работаем так, чтобы каждый клиент был уверен в качестве, скорости и поддержке.
            </p>

            {/* Карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#00796B]/15 rounded-2xl p-8 shadow-sm hover:shadow-md transition 
                            flex flex-col items-center text-center"
                >
                  <div className="text-[#00796B] mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-[#00796B] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <FAQ />
      </main>
    </>
  );
}
