"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Основы ветеринарной фармакологии",
    description:
      "Разбор популярных препаратов, схем дозировок и частых ошибок.",
    lessons: 12,
    image: "/course_mock_1.jpg",
  },
  {
    id: 2,
    title: "Вакцинация щенков и котят",
    description:
      "Графики вакцинации, противопоказания и практические кейсы.",
    lessons: 8,
    image: "/course_mock_2.jpg",
  },
  {
    id: 3,
    title: "Работа с питомниками",
    description:
      "Организация закупок, хранение препаратов и юридические нюансы.",
    lessons: 10,
    image: "/course_mock_3.jpg",
  },
];

export default function CoursesPage() {
  return (
    <main className="bg-[#F9FAF4] min-h-screen">
      {/* HERO */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#00796B] mb-6">
          Онлайн-курсы для ветеринарных специалистов
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Практические видеоуроки, разбор реальных кейсов и доступ к материалам
          в любое время.
        </p>
      </section>

      {/* КУРСЫ */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl shadow-sm border border-[#00796B]/20 overflow-hidden hover:shadow-md transition flex flex-col"
            >
              {/* Видео-заставка */}
              <div className="relative group cursor-pointer">
                <div className="h-52 bg-gray-300 flex items-center justify-center">
                  {/* Моковая иконка воспроизведения */}
                  <PlayCircle
                    size={64}
                    className="text-white group-hover:scale-110 transition"
                  />
                </div>

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              </div>

              {/* Контент */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#00796B] mb-3">
                  {course.title}
                </h3>

                <p className="text-gray-700 text-sm mb-4 flex-1">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500">
                    {course.lessons} уроков
                  </span>

                  <Link
                    href={`/courses/${course.id}`}
                    className="bg-[#00796B] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
                  >
                    Смотреть
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-[#00796B]/10 text-center">
        <h2 className="text-3xl font-bold text-[#00796B] mb-4">
          Хотите получить доступ ко всем курсам?
        </h2>
        <p className="text-gray-700 mb-6">
          Зарегистрируйтесь и получите персональный доступ к обучающим материалам.
        </p>

        <Link
          href="/login"
          className="bg-[#00796B] text-white px-8 py-4 rounded-2xl font-semibold shadow-md hover:opacity-90 transition"
        >
          Зарегистрироваться
        </Link>
      </section>
    </main>
  );
}
