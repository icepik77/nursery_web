export default function SuccessPage() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-[#F9FAF4]">
      <h2 className="text-3xl font-bold text-[#00796B] mb-4">Спасибо за заказ!</h2>
      <p className="text-gray-700 mb-6 text-center">
        Наш менеджер свяжется с вами для подтверждения доставки.
      </p>
      <a
        href="/"
        className="bg-[#00796B] text-white px-6 py-2 rounded-lg hover:bg-[#00695C] transition"
      >
        Вернуться в каталог
      </a>
    </section>
  );
}
