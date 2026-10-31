export type Product = {
  id: string;
  isExample?: boolean;
  brand: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  badge?: string;
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
  stockStatus?: "in_stock" | "low_stock" | "out_of_stock" | "backorder" | "unknown";
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
};

export const products: Product[] = [
  { id: "1", brand: "Shimano", name: "XT CS-M8100 Kassett 12-delt", price: "1 799 kr", category: "Drivverk", image: "/products/cassette.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: "2", brand: "SRAM", name: "GX Eagle Kjede 12-delt", price: "499 kr", category: "Drivverk", image: "/products/chain.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: "3", brand: "Shimano", name: "RT-MT800 Bremseskive 180 mm", price: "549 kr", category: "Bremser", image: "/products/brake-rotor.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: "4", brand: "Continental", name: "Trail King 29 × 2.4 Dekk", price: "699 kr", category: "Dekk", image: "/products/tire.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: "5", brand: "Shimano", name: "XT Bakgir 12-delt", price: "1 299 kr", category: "Drivverk", image: "/products/rear-derailleur.png", warehouseLocation: "Arna", stockStatus: "unknown" },
  { id: "6", brand: "Shimano", name: "XT Krankarm", price: "1 999 kr", category: "Drivverk", image: "/products/crank-arm.png", warehouseLocation: "Arna", stockStatus: "unknown" },
];

// Separate example records: existing product IDs and values stay unchanged.
export const exampleProducts: Product[] = [
  {
    "id": "demo-kassett-11",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Kassett 11-delt 11–42T",
    "price": "Eksempelpris: 699 kr",
    "badge": "Eksempeldata",
    "category": "Drivverk",
    "image": "/products/cassette.png",
    "sku": "DEMO-KASSETT-11",
    "description": "Kassett for et illustrativt 1 × 11-oppsett. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "11-delt girsystem",
      "HG-type boss; kontroller bakgirets kapasitet"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-kjede-11",
    "isExample": true,
    "brand": "Demo Urban",
    "name": "Kjede 11-delt, 116 ledd",
    "price": "Eksempelpris: 249 kr",
    "badge": "Eksempeldata",
    "category": "Drivverk",
    "image": "/products/chain.png",
    "sku": "DEMO-KJEDE-11",
    "description": "Kjede for vedlikehold av et 11-delt drivverk. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "11-delt drivverk",
      "Lengden må tilpasses sykkelen"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-bakgir-11",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Bakgir 11-delt, lang girarm",
    "price": "Eksempelpris: 799 kr",
    "badge": "Eksempeldata",
    "category": "Drivverk",
    "image": "/products/rear-derailleur.png",
    "sku": "DEMO-BAKGIR-11",
    "description": "Bakgir til et eksempeloppsett for terrengsykkel. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "11-delt girsystem",
      "Wiretrekk og kassettområde må kontrolleres før valg"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-skive-160",
    "isExample": true,
    "brand": "Demo Urban",
    "name": "Bremseskive 160 mm, 6-bolt",
    "price": "Eksempelpris: 229 kr",
    "badge": "Eksempeldata",
    "category": "Bremser",
    "image": "/products/brake-rotor.png",
    "sku": "DEMO-SKIVE-160",
    "description": "Bremseskive til et illustrativt skivebremsoppsett. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Nav med 6-boltfeste",
      "Kontroller kaliper, adapter og tillatt skivetykkelse"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-skive-203",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Bremseskive 203 mm, 6-bolt",
    "price": "Eksempelpris: 349 kr",
    "badge": "Eksempeldata",
    "category": "Bremser",
    "image": "/products/brake-rotor.png",
    "sku": "DEMO-SKIVE-203",
    "description": "Stor bremseskive for et illustrativt terrengoppsett. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Nav med 6-boltfeste",
      "Ramme, gaffel og adapter må støtte 203 mm"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-klosser-resin",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Bremseklosser i resin, ett par",
    "price": "Eksempelpris: 179 kr",
    "badge": "Eksempeldata",
    "category": "Bremser",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-KLOSSER-RESIN",
    "description": "Eksempel på organiske bremseklosser. Eksakt klossform er ikke spesifisert. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Kun kalipere med tilsvarende klossform",
      "Kontroller skivens materialkrav"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-dekk-700",
    "isExample": true,
    "brand": "Demo Urban",
    "name": "Pendlerdekk 700 × 38C",
    "price": "Eksempelpris: 399 kr",
    "badge": "Eksempeldata",
    "category": "Dekk",
    "image": "/products/tire.png",
    "sku": "DEMO-DEKK-700",
    "description": "Allsidig eksempel på dekk til pendling på asfalt og grus. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "ETRTO 38-622",
      "Kontroller felgbredde og klaring i ramme og skjermer"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-slange-29",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Slange 29 × 1.9–2.4, Presta 48 mm",
    "price": "Eksempelpris: 99 kr",
    "badge": "Eksempeldata",
    "category": "Dekk",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-SLANGE-29",
    "description": "Eksempel på reserveslange til 29-tommers terrengdekk. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Dekk med diameter 622 mm og bredde 1.9–2.4 tommer",
      "Felg med Presta-ventilhull; kontroller felghøyde"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-dekk-275",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Terrengdekk 27.5 × 2.25",
    "price": "Eksempelpris: 449 kr",
    "badge": "Eksempeldata",
    "category": "Dekk",
    "image": "/products/tire.png",
    "sku": "DEMO-DEKK-275",
    "description": "Mønstret eksempel på terrengdekk for variert underlag. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "ETRTO 57-584",
      "Kontroller felgbredde og dekklaring"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-forhjul-29",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Forhjul 29 tommer, Boost 15 × 110 mm",
    "price": "Eksempelpris: 1 299 kr",
    "badge": "Eksempeldata",
    "category": "Hjul",
    "image": "/products/hjul.png",
    "sku": "DEMO-FORHJUL-29",
    "description": "Eksempel på forhjul med gjennomgående aksel til terrengsykkel. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Gaffel med 15 × 110 mm Boost-feste",
      "622 mm dekkdiameter; 6-bolt bremseskive"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-bakhjul-700",
    "isExample": true,
    "brand": "Demo Urban",
    "name": "Bakhjul 700C, QR 135 mm, HG",
    "price": "Eksempelpris: 1 499 kr",
    "badge": "Eksempeldata",
    "category": "Hjul",
    "image": "/products/hjul.png",
    "sku": "DEMO-BAKHJUL-700",
    "description": "Eksempel på bakhjul til hybrid- eller pendlersykkel. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "135 mm hurtigkobling",
      "HG-boss for 8/9/10-delt kassett; 6-bolt skive"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-felgband-25",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Tubeless felgbånd 25 mm × 10 m",
    "price": "Eksempelpris: 149 kr",
    "badge": "Eksempeldata",
    "category": "Hjul",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-FELGBAND-25",
    "description": "Eksempel på tetningsbånd ved tubeless-oppsett. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Tubeless-klare felger",
      "Båndbredden må passe felgens innvendige profil"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-styre-780",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Riserstyre aluminium 780 mm / 31.8 mm",
    "price": "Eksempelpris: 599 kr",
    "badge": "Eksempeldata",
    "category": "Styre & cockpit",
    "image": "/products/styre.png",
    "sku": "DEMO-STYRE-780",
    "description": "Bredt eksempel på terrengstyre med 20 mm rise. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Stem med 31.8 mm klemmediameter",
      "Kontroller kabellengder og ønsket styrebredde"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-stem-60",
    "isExample": true,
    "brand": "Demo Urban",
    "name": "Stem aluminium 60 mm / 31.8 mm",
    "price": "Eksempelpris: 349 kr",
    "badge": "Eksempeldata",
    "category": "Styre & cockpit",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-STEM-60",
    "description": "Kort eksempel på stem for justering av sittestilling. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "31.8 mm styre",
      "28.6 mm gaffelrør; kontroller tilgjengelig klemmehøyde"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-grep-lock",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Lock-on holker 130 mm, par",
    "price": "Eksempelpris: 249 kr",
    "badge": "Eksempeldata",
    "category": "Styre & cockpit",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-GREP-LOCK",
    "description": "Eksempel på holker med låsering for flatt styre. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "22.2 mm ytre styrediameter ved grepet",
      "130 mm tilgjengelig grepsflate"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-flaskeholder",
    "isExample": true,
    "brand": "Demo Urban",
    "name": "Flaskeholder i aluminium",
    "price": "Eksempelpris: 149 kr",
    "badge": "Eksempeldata",
    "category": "Tilbehør",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-FLASKEHOLDER",
    "description": "Eksempel på flaskeholder til daglig bruk. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Ramme med standard flaskeholderfester",
      "Kontroller plass til flaske i rammen"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-minipumpe",
    "isExample": true,
    "brand": "Demo Urban",
    "name": "Minipumpe for Presta og Schrader",
    "price": "Eksempelpris: 299 kr",
    "badge": "Eksempeldata",
    "category": "Tilbehør",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-MINIPUMPE",
    "description": "Kompakt eksempel på pumpe til tur og pendling. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Presta- og Schrader-ventiler",
      "Kontroller dekkets anbefalte trykk"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  },
  {
    "id": "demo-multiverktoy",
    "isExample": true,
    "brand": "Demo Trail",
    "name": "Multiverktøy med 10 funksjoner",
    "price": "Eksempelpris: 249 kr",
    "badge": "Eksempeldata",
    "category": "Tilbehør",
    "image": "/products/example-placeholder.svg",
    "sku": "DEMO-MULTIVERKTOY",
    "description": "Eksempel på turverktøy med unbrako, Torx og skrutrekker. Fiktiv produktserie. Pris, lager og spesifikasjoner er eksempeldata og ikke verifisert. Bildet er en kategoriillustrasjon, ikke et bilde av den konkrete delen.",
    "compatibility": [
      "Unbrako 2/2.5/3/4/5/6/8 mm, T25, flat og Phillips",
      "Velg verktøy etter boltene på egen sykkel"
    ],
    "stockStatus": "unknown",
    "warehouseLocation": "Ikke verifisert",
    "specifications": {
      "Datagrunnlag": "Eksempeldata – må verifiseres før salg"
    }
  }
];
