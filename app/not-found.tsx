import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAF4] text-center px-6">
      <h1 className="text-9xl font-bold text-[#00796B]">404</h1>

      <h2 className="text-2xl sm:text-3xl font-semibold text-[#00796B] mt-4">
        Упс... страница не найдена
      </h2>

      <p className="text-lg text-gray-600 mt-2 max-w-md">
        Похоже, вы зашли по неверному адресу или страница была удалена.
      </p>

      <Link
        href="/"
        className="mt-8 bg-[#00796B] text-[#F9FAF4] px-6 py-3 rounded-xl text-lg font-medium
                   hover:bg-[#005f51] transition duration-300"
      >
        Вернуться на главную
      </Link>

      <div className="absolute bottom-10 opacity-10">
        <img src="/logo.svg" alt="logo" className="w-40" />
      </div>
    </div>
  );
}
