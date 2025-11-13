import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00796B] text-[#EAD6B9] py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 🐾 О компании */}
        <div>
          <h3 className="text-lg font-semibold mb-3">О компании</h3>
          <p className="text-sm leading-relaxed">
            Мы специализируемся на продаже качественных ветеринарных препаратов
            и товаров для домашних животных. Работаем только с проверенными
            поставщиками.
          </p>
        </div>

        {/* 📦 Категории */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Категории</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Антибиотики</a></li>
            <li><a href="#" className="hover:underline">Витамины</a></li>
            <li><a href="#" className="hover:underline">Вакцины</a></li>
            <li><a href="#" className="hover:underline">Средства от паразитов</a></li>
            <li><a href="#" className="hover:underline">Уход и гигиена</a></li>
          </ul>
        </div>

        {/* 📞 Контакты */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Контакты</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +7 (900) 123-45-67
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@vetshop.ru
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Москва, ул. Пушкинская, д. 10
            </li>
          </ul>
        </div>

        {/* 🐕 Подписка */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Подписка на новости</h3>
          <p className="text-sm mb-3">
            Получайте информацию о скидках и новинках первыми.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-3 py-2 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#EAD6B9] text-[#00796B] font-semibold px-4 rounded-r-lg hover:bg-[#f5e4ca]"
            >
              OK
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#EAD6B9]/30 mt-8 pt-4 text-center text-sm opacity-80">
        © {new Date().getFullYear()} VetShop — Все права защищены.
      </div>
    </footer>
  );
};
