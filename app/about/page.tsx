"use client";
import React from "react";

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

  return (
    <section className="max-w-full mx-auto py-12 px-4 bg-[#F9FAF4] flex flex-col items-center">
      {/* Заголовок */}
      <h2 className="text-2xl font-bold text-[#00796B] mb-6 text-center">
        О компании
      </h2>

      {/* Описание компании */}
      <div className="max-w-3xl text-gray-700 text-center mb-10 leading-relaxed">
        <p className="mb-4">
          Наша компания работает на рынке уже более{" "}
          <span className="font-semibold text-[#00796B]">7 лет</span>.  
          За это время мы зарекомендовали себя как надежный партнёр для питомников, ветеринарных клиник и зоомагазинов.
        </p>
        <p>
          Мы верим, что <span className="font-medium text-[#00796B]">долгосрочное сотрудничество</span> — это основа успеха,  
          и именно поэтому с нами работают десятки компаний по всей стране.  
          Мы ценим доверие наших партнёров и стремимся развиваться вместе с ними.
        </p>
      </div>

      {/* Блок с партнёрами */}
      <h3 className="text-xl font-semibold text-[#00796B] mb-6 text-center">
        Компании, с которыми мы сотрудничаем
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="border border-[#EAD6B9] bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center hover:shadow-md transition"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-20 h-20 object-contain mb-2 grayscale hover:grayscale-0 transition"
            />
            <p className="text-sm font-medium text-gray-800 text-center">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
