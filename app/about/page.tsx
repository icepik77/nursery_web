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
    },
    {
      id: 2,
      title: "Подготавливаем продукцию",
      text: "Проверяем наличие и качество препаратов. Отправляем только свежие и сертифицированные товары.",
    },
    {
      id: 3,
      title: "Отправляем заказ",
      text: "Сотрудничаем с надёжными курьерскими службами, чтобы вы получили заказ максимально быстро.",
    },
    {
      id: 4,
      title: "Получаете и проверяете",
      text: "При получении вы можете убедиться в целостности упаковки и правильности заказа.",
    },
    {
      id: 5,
      title: "Поддерживаем вас",
      text: "Помогаем с любыми вопросами по применению препаратов и поддерживаем после покупки.",
    },
  ];

  return (
    <section className="max-w-full mx-auto py-12 px-4 bg-[#F9FAF4] flex flex-col items-center">
      {/* Заголовок */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#00796B] mb-8 text-center">
        О компании
      </h2>

      {/* Описание компании */}
      {/* Описание компании */}
      <div className="max-w-3xl text-gray-700 text-center mb-16 leading-relaxed text-lg">
        <p className="mb-4">
          Мы работаем на рынке уже более{" "}
          <span className="font-semibold text-[#00796B]">7 лет</span>, обеспечивая
          ветеринарные клиники, питомники и зоомагазины по всей стране
          сертифицированными препаратами, кормами и товарами для ухода за животными.
          За это время мы сформировали партнёрскую сеть из более чем{" "}
          <span className="font-semibold text-[#00796B]">120 организаций</span> и
          выстроили стабильную систему поставок, охватывающую{" "}
          <span className="font-semibold text-[#00796B]">40+ регионов</span>.
        </p>

        <p className="mb-4">
          Ежемесячно мы отгружаем свыше{" "}
          <span className="font-semibold text-[#00796B]">18 000 единиц продукции</span>,
          поддерживая на складе более{" "}
          <span className="font-semibold text-[#00796B]">350 наименований</span>.
          Благодаря собственной логистике мы обеспечиваем доставку в срок в{" "}
          <span className="font-semibold text-[#00796B]">97% случаев</span>, даже в пиковые периоды.
        </p>

        <p>
          Главное для нас —{" "}
          <span className="font-medium text-[#00796B]">доверие и долгосрочное сотрудничество</span>.
          Более <span className="font-semibold text-[#00796B]">70% наших клиентов</span> работают с нами
          уже несколько лет, что подтверждает качество сервиса и надёжность поставок.
        </p>
      </div>


      {/* Компании-партнёры */}
      <div className="max-w-6xl w-full mb-20">
        <h3 className="text-2xl font-semibold text-[#00796B] mb-8 text-center">
          Компании, которые работают с нами
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-2 place-items-center">
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

      {/* Как мы работаем (новый красивый стиль без картинок) */}
      <div className="max-w-5xl w-full mb-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#00796B] mb-10 text-center">
          Как мы работаем
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col justify-start p-6 rounded-2xl shadow-lg border border-[#EAD6B9] transition hover:scale-105 ${
                index % 2 === 0 ? "bg-white" : "bg-[#E8F3F0]"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00796B] text-white flex items-center justify-center font-bold text-lg mr-4">
                  {index + 1}
                </div>
                <h4 className="text-xl font-semibold text-[#00796B]">
                  {step.title}
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
