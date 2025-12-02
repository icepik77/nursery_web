import Catalog from "../components/Catalog";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Каталог товаров для жиотных от Добриггс",
  openGraph: {
    title: "Главная страница — Добригс",
    description:
      "Каталог товаров для жиотных от Добриггс",
    locale: "ru_RU",
    type: "website",
  },
};

export default function CatalogPage() {
  return (
    <Catalog/>
  );
}
