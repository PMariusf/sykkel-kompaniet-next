import type { Metadata } from "next";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sykkel Deler",
  description: "Demo av nettbutikk for sykkeldeler",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
