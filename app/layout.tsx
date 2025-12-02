import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductFilterProvider } from "./context/ProductFilterContext";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Доббригс",
  description: "Товары для животных",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ProductFilterProvider>
          <CartProvider>
            <OrderProvider>
              <Header />
                <main className="flex-grow">{children}</main>
              <Footer />
            </OrderProvider>            
          </CartProvider>
        </ProductFilterProvider>
      </body>
    </html>
  );
}
