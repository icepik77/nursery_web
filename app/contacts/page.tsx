import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты от Добриггс",
  openGraph: {
    title: "Контакты Добригс",
    description:
      "Контакты от Добриггс",
    locale: "ru_RU",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className="max-w-full mx-auto py-12 px-4 bg-[#F9FAF4] flex flex-col items-center">
      {/* Заголовок */}
      <h2 className="text-2xl font-bold text-[#00796B] mb-6 text-center">
        О компании
      </h2>

      {/* Основная информация */}
      <div className="max-w-3xl text-gray-700 text-center mb-10 leading-relaxed">
        <p className="mb-4">
          Наша компания работает на рынке более{" "}
          <span className="font-semibold text-[#00796B]">7 лет</span> и специализируется на поставках ветеринарных препаратов и товаров для животных.  
          Мы сотрудничаем с питомниками, клиниками и зоомагазинами по всей России.
        </p>
        <p>
          Мы стремимся обеспечить высокий уровень сервиса, надежные поставки и прозрачные условия сотрудничества.  
          Наш офис и склад расположены в удобной транспортной зоне, а также доступны онлайн-каналы для связи и оформления заказов.
        </p>
      </div>

      {/* Контакты */}
      <div className="max-w-3xl bg-white rounded-2xl shadow-sm border border-[#EAD6B9] p-6 mb-10">
        <h3 className="text-xl font-semibold text-[#00796B] mb-4 text-center">
          Контактная информация
        </h3>

        <div className="text-gray-700 space-y-3 text-center">
          <p>
            <span className="font-medium text-[#00796B]">Офис:</span>{" "}
            г. Москва, ул. Примерная, д. 10, офис 203
          </p>
          <p>
            <span className="font-medium text-[#00796B]">Email:</span>{" "}
            <a href="mailto:info@vetshop.ru" className="text-[#00796B] hover:underline">
              info@vetshop.ru
            </a>
          </p>
          <p>
            <span className="font-medium text-[#00796B]">Отдел продаж:</span>{" "}
            <a href="mailto:sales@vetshop.ru" className="text-[#00796B] hover:underline">
              sales@vetshop.ru
            </a>
          </p>
          <p>
            <span className="font-medium text-[#00796B]">Телефон:</span>{" "}
            <a href="tel:+74951234567" className="text-[#00796B] hover:underline">
              +7 (495) 123-45-67
            </a>
          </p>
        </div>
      </div>

      {/* Карта */}
      <div className="w-full max-w-6xl h-[500px] mb-10 rounded-2xl overflow-hidden shadow-md border border-[#EAD6B9]">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%CLC1n4je&source=constructor"
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>

      {/* Юридическая информация */}
      <div className="max-w-3xl bg-white rounded-2xl shadow-sm border border-[#EAD6B9] p-6">
        <h3 className="text-xl font-semibold text-[#00796B] mb-4 text-center">
          Юридическая информация
        </h3>

        <div className="text-gray-700 space-y-2 text-center">
          <p>ООО «ВетШоп»</p>
          <p>ИНН: 7701234567</p>
          <p>КПП: 770101001</p>
          <p>ОГРН: 1187746578901</p>
          <p>Юридический адрес: 123456, г. Москва, ул. Примерная, д. 10</p>
          <p>Р/с: 40702810000000000001 в ПАО «Сбербанк»</p>
          <p>БИК: 044525225</p>
          <p>К/с: 30101810400000000225</p>
        </div>
      </div>
    </section>
  );
}
