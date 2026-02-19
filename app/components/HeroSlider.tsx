"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    href: "/shop",
    image: "/slider_1.jpg",
  },
  {
    id: 2,
    href: "/login",
    image: "/slider_2.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <section className="w-full bg-[#F9FAF4] py-10 px-4">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Соотношение 2500/1200 */}
        <div className="relative w-full aspect-[2500/1200] overflow-hidden rounded-3xl shadow-md">
          
          {slides.map((slide, index) => (
            <Link
              key={slide.id}
              href={slide.href}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.image}
                alt="Баннер"
                className="w-full h-full object-cover"
              />
            </Link>
          ))}

          {/* Стрелки */}
          <button
            onClick={prevSlide}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 
                       bg-white/70 hover:bg-white text-[#00796B]
                       rounded-full w-9 h-9 md:w-12 md:h-12
                       flex items-center justify-center
                       shadow transition z-20"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 
                       bg-white/70 hover:bg-white text-[#00796B]
                       rounded-full w-9 h-9 md:w-12 md:h-12
                       flex items-center justify-center
                       shadow transition z-20"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
}
