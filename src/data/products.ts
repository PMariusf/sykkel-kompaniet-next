export type Product = {
  id: number;
  brand: string;
  name: string;
  price: string;
  category: string;
  image: string;
};

export const products: Product[] = [
  { id: 1, brand: "Shimano", name: "XT CS-M8100 Kassett 12-delt", price: "1 799 kr", category: "Drivverk", image: "/products/cassette.png" },
  { id: 2, brand: "SRAM", name: "GX Eagle Kjede 12-delt", price: "499 kr", category: "Drivverk", image: "/products/chain.png" },
  { id: 3, brand: "Shimano", name: "RT-MT800 Bremseskive 180 mm", price: "549 kr", category: "Bremser", image: "/products/brake-rotor.png" },
  { id: 4, brand: "Continental", name: "Trail King 29 × 2.4 Dekk", price: "699 kr", category: "Dekk", image: "/products/tire.png" },
  { id: 5, brand: "Shimano", name: "XT Bakgir 12-delt", price: "1 299 kr", category: "Drivverk", image: "/products/rear-derailleur.png" },
  { id: 6, brand: "Shimano", name: "XT Krankarm", price: "1 999 kr", category: "Drivverk", image: "/products/crank-arm.png" },
];
