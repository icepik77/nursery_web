import NewsList from "../components/NewsList";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новости",
  description:
    "Новости от компании Добриггс",
  openGraph: {
    title: "Новости Добригс",
    description:
      "Новости от Добриггс",
    locale: "ru_RU",
    type: "website",
  },
};

const initialNews = [
  {
    id: 1,
    title: "Снижение цен на корма для собак",
    image: "/news_1.jpg",
    date: "11 ноября 2025",
    description:
      "В нашем магазине действует скидка до 20% на корма премиум-класса. Акция продлится до конца месяца.",
  },
  {
    id: 2,
    title: "Новые препараты для профилактики",
    image: "/news_2.jpg",
    date: "3 ноября 2025",
    description:
      "В продаже появились новые ветеринарные препараты для профилактики паразитов. Подходит для питомников.",
  },
  {
    id: 3,
    title: "Расширение ассортимента",
    image: "/news_3.jpg",
    date: "28 октября 2025",
    description:
      "Теперь вы можете заказать товары для груминга и ухода за шерстью — доставка по всей России.",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#F9FAF4] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00796B] text-center mb-10">
          Новости и акции
        </h1>

        {/* клиентский компонент */}
        <NewsList initialNews={initialNews} />
      </div>
    </main>
  );
}
