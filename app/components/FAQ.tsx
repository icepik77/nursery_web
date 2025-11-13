import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Как сделать заказ на сайте?",
    answer:
      "Выберите нужные товары в каталоге, добавьте их в корзину и оформите заказ, указав контактные данные и адрес доставки.",
  },
  {
    id: 2,
    question: "Есть ли доставка по России?",
    answer:
      "Да, мы отправляем заказы по всей России. Сроки и стоимость зависят от региона и выбранной транспортной компании.",
  },
  {
    id: 3,
    question: "Можно ли оплатить заказ при получении?",
    answer:
      "Да, для большинства регионов доступна оплата при получении (наложенным платежом). Также вы можете оплатить онлайн.",
  },
  {
    id: 4,
    question: "Как хранить ветеринарные препараты?",
    answer:
      "Все препараты следует хранить в прохладном, сухом месте при температуре от +5 до +25 °C, вдали от прямых солнечных лучей.",
  },
  {
    id: 5,
    question: "Можно ли вернуть товар?",
    answer:
      "Возврат возможен только при сохранении товарного вида и целостности упаковки. Подробнее — в разделе 'Условия возврата'.",
  },
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 bg-[#F9FAF4] flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#00796B] mb-6 text-center">
        Частые вопросы
      </h2>

      <div className="w-full max-w-3xl space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="border border-[#EAD6B9] rounded-2xl shadow-sm overflow-hidden"
          >
            <button
              className="w-full text-left p-4 font-semibold text-gray-800 flex justify-between items-center"
              onClick={() => toggle(q.id)}
            >
              <span className="pr-2">{q.question}</span>
              <span className="text-[#00796B] text-xl font-bold">
                {openId === q.id ? "−" : "+"}
              </span>
            </button>
            {openId === q.id && (
              <div className="px-4 pb-4 text-gray-700 bg-[#FDFBF9]">
                {q.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
