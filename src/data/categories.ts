export type Category = {
  slug: string;
  name: string;
  image: string;
  description: string;
  productCategory: string;
};

export const categories: Category[] = [
  {
    slug: "bremser",
    name: "Bremser",
    image: "/products/bremse.png",
    description: "Bremseskiver, klosser og komponenter for trygg og presis bremsekraft.",
    productCategory: "Bremser",
  },
  {
    slug: "drivverk",
    name: "Drivverk",
    image: "/products/driverk.png",
    description: "Kassetter, kjeder, gir og krankdeler for effektiv og presis kraftoverføring.",
    productCategory: "Drivverk",
  },
  {
    slug: "dekk-slanger",
    name: "Dekk & slanger",
    image: "/products/dekk.png",
    description: "Dekk og slanger for terreng, vei og hverdagssykling.",
    productCategory: "Dekk",
  },
  {
    slug: "hjul",
    name: "Hjul",
    image: "/products/hjul.png",
    description: "Hjulsett, felger og nav for oppgradering, service og nye byggeprosjekter.",
    productCategory: "Hjul",
  },
  {
    slug: "pedaler",
    name: "Pedaler",
    image: "/products/pedaler.png",
    description: "Flate pedaler og klikkpedaler til ulike sykler og kjørestiler.",
    productCategory: "Pedaler",
  },
  {
    slug: "styre-cockpit",
    name: "Styre & cockpit",
    image: "/products/styre.png",
    description: "Styre, stem og grep for bedre kontroll, komfort og kjørefølelse.",
    productCategory: "Styre & cockpit",
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
