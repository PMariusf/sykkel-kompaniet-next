import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sykkel Kompaniet",
  description: "Demo av nettbutikk for sykkeldeler",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  );
}
