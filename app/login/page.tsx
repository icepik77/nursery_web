// app/auth/page.tsx
import AuthForm from "../components/AuthForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
  description:
    "Страница авторизации от Добриггс",
  openGraph: {
    title: "Авторизация",
    description:
      "Авторизация на сайте Добриггс",
    locale: "ru_RU",
    type: "website",
  },
};

export default function AuthPage() {
  return (
    <section className="py-12 px-4">
      <AuthForm />
    </section>
  );
}
