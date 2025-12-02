"use client";
import Link from "next/link";
import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
}

interface Props {
  initialNews: NewsItem[];
}

export default function NewsList({ initialNews }: Props) {
  const [news] = useState(initialNews);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item) => (
        <Link
          key={item.id}
          href={`/article/${item.id}`}
          className="bg-white rounded-xl shadow-md border border-[#00796B]/20 overflow-hidden
                     hover:shadow-lg hover:scale-[1.01] transition duration-300"
        >
          <div className="relative group">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
          </div>

          <div className="p-6">
            <span className="text-sm text-gray-500">{item.date}</span>
            <h2 className="text-xl font-semibold text-[#00796B] mt-1">
              {item.title}
            </h2>
            <p className="text-gray-600 text-base mt-3">
              {item.description.length > 120
                ? `${item.description.slice(0, 120)}…`
                : item.description}
            </p>

            <span className="inline-block mt-4 text-[#00796B] font-semibold hover:underline">
              Читать далее →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
