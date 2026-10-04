export type Product = {
  id: number;
  brand: string;
  name: string;
  price: string;
  category: string;
  image: string;
  sku?: string;
  ean?: string;
  supplier?: string;
  description?: string;
  compatibility?: string[];
  specifications?: Record<string, string>;
  stockQuantity?: number;
  warehouseLocation?: string;
  stockStatus?: "in_stock" | "low_stock" | "out_of_stock" | "unknown";
};

export const products: Product[] = [
  { id: 1, brand: "Shimano", name: "XT CS-M8100 Kassett 12-delt", price: "1 799 kr", category: "Drivverk", image: "/products/cassette.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: 2, brand: "SRAM", name: "GX Eagle Kjede 12-delt", price: "499 kr", category: "Drivverk", image: "/products/chain.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: 3, brand: "Shimano", name: "RT-MT800 Bremseskive 180 mm", price: "549 kr", category: "Bremser", image: "/products/brake-rotor.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: 4, brand: "Continental", name: "Trail King 29 × 2.4 Dekk", price: "699 kr", category: "Dekk", image: "/products/tire.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: 5, brand: "Shimano", name: "XT Bakgir 12-delt", price: "1 299 kr", category: "Drivverk", image: "/products/rear-derailleur.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: 6, brand: "Shimano", name: "XT Krankarm", price: "1 999 kr", category: "Drivverk", image: "/products/crank-arm.png", warehouseLocation: "Arna", stockStatus: "unknown" },
];
