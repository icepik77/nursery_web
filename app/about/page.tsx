import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании",
  description: "О нашей компании",
  openGraph: {
    title: "О компании",
    description: "Описание компании для продажи ветеринарных товаров",
    locale: "ru_RU",
    type: "website",
  },
};

export default function AboutPage() {
  const partners = [
    { id: 1, name: "VetClinic Pro", logo: "/producers/vc5z41wgszvphrnjl0y091v8t7z7ssgs.png" },
    { id: 2, name: "PetShop24", logo: "/producers/59rermwuqfcthovw9l1v8y2ebccp6wdf.png" },
    { id: 3, name: "ZooCare", logo: "/producers/147x32vjvfhf6y3t1bmm2ufhtkd7f2d2.png" },
    { id: 4, name: "HappyPets", logo: "/producers/h0j36r9u8s1q5yeg24nzjj86gi5w2qis.jpg" },
    { id: 5, name: "BioVet", logo: "/producers/ixkamgq179j59x56cgv9j90hj9wtqnl8.jpg" },
    { id: 6, name: "PetWorld", logo: "/producers/rlt678pgcdd0zguo6cmmivblejn1nmoy.png" },
    { id: 7, name: "PetWorld", logo: "/producers/sztf9mnvj8ru8un93if8y6ka6ziu89d7.png" },
    { id: 8, name: "PetWorld", logo: "/producers/udxfh7m8p19yzf07k2cz10ewytzj4w9a.jpg" },
  ];

  const steps = [
    {
      id: 1,
      title: "Принимаем заказ",
      text: "Вы оформляете заказ на сайте или по телефону. Мы подтверждаем его в течение нескольких минут.",
      image: "/steps/1.png",
    },
    {
      id: 2,
      title: "Подготавливаем продукцию",
      text: "Проверяем наличие и качество препаратов. Отправляем только свежие и сертифицированные товары.",
      image: "/steps/2.png",
    },
    {
      id: 3,
      title: "Отправляем заказ",
      text: "Сотрудничаем с надёжными курьерскими службами, чтобы вы получили заказ максимально быстро.",
      image: "/steps/3.png",
    },
    {
      id: 4,
      title: "Получаете и проверяете",
      text: "При получении вы можете убедиться в целостности упаковки и правильности заказа.",
      image: "/steps/4.png",
    },
    {
      id: 5,
      title: "Поддерживаем вас",
      text: "Помогаем с любыми вопросами по применению препаратов и поддерживаем после покупки.",
      image: "/steps/5.png",
    },
  ];

  return (
    <section className="max-w-full mx-auto py-12 px-4 bg-[#F9FAF4] flex flex-col items-center">
      {/* Заголовок */}
      <h2 className="text-2xl font-bold text-[#00796B] mb-6 text-center">
        О компании
      </h2>

      {/* Описание компании */}
      <div className="max-w-3xl text-gray-700 text-center mb-12 leading-relaxed">
        <p className="mb-4">
          Мы работаем на рынке более{" "}
          <span className="font-semibold text-[#00796B]">7 лет</span> и
          обеспечиваем ветеринарные клиники, питомники и зоомагазины качественными препаратами и товарами для животных.
        </p>
        <p>
          Главное для нас — <span className="font-medium text-[#00796B]">доверие и долгосрочное сотрудничество</span>.
          Именно поэтому с нами работают десятки компаний по всей России.
        </p>
      </div>

      {/* Компании-партнёры */}
      <div className="max-w-6xl w-full mb-20">
        <h3 className="text-xl font-semibold text-[#00796B] mb-8 text-center">
          Компании, которые работают с нами
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
          {partners.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-center justify-center bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-[#EAD6B9] w-40 h-40"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="w-24 h-24 object-contain mb-2"
              />
              <p className="text-sm font-medium text-[#00796B] text-center">
                {p.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Как мы работаем */}
      <div className="max-w-6xl w-full mb-10">
        <h3 className="text-xl font-semibold text-[#00796B] mb-8 text-center">
          Как мы работаем
        </h3>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-md border border-[#EAD6B9]"
              />
              <div className="md:w-1/2 text-center md:text-left">
                <h4 className="text-2xl font-semibold text-[#00796B] mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-700 leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
