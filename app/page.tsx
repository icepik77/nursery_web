"use client";

import Header from "./components/Header";
import Catalog from "./components/Catalog";
import { FAQ } from "./components/FAQ";

export default function Home() {
  return (
    <>
      <main>
        <Catalog />
        <FAQ />
      </main>
    </>
  );
}
