// ❗ без "use client"
import UserData from "../components/UserData";
import OrdersList from "../components/OrdersList";

export default function ProfilePage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-[#00796B] mb-8 text-center">
        Личный кабинет
      </h2>

      <UserData />
      <OrdersList />
    </section>
  );
}