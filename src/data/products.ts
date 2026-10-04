export type Product = {
  id: number;
  brand: string;
  name: string;
  price: string;
  category: string;
  image: string;
};

export const products: Product[] = [
  { id: 1, brand: "Shimano", name: "XT 12-delt kassett", price: "1 799 kr", category: "Drivverk", image: "/products/cassette.svg" },
  { id: 2, brand: "SRAM", name: "GX Eagle kjede 12-delt", price: "499 kr", category: "Drivverk", image: "/products/chain.svg" },
  { id: 3, brand: "Shimano", name: "Bremseskive 180 mm", price: "549 kr", category: "Bremser", image: "/products/rotor.svg" },
  { id: 4, brand: "Continental", name: "Trail King 29 × 2.4", price: "699 kr", category: "Dekk", image: "/products/tire.svg" },
];
