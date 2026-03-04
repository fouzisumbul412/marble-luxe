export interface VariantPrice {
  label: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  shortBenefit: string;
  benefits: string[];
  usage: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  variants?: string[];
  variantPrices?: VariantPrice[];
}

export function getProductVariants(product: Product): string[] {
  if (product.variants && product.variants.length > 0) return product.variants;
  return [product.size];
}

export function getVariantPrice(product: Product, variant: string): { price: number; originalPrice?: number } {
  if (product.variantPrices) {
    const vp = product.variantPrices.find((v) => v.label === variant);
    if (vp) return { price: vp.price, originalPrice: vp.originalPrice };
  }
  return { price: product.price, originalPrice: product.originalPrice };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "drumble-pink",
    name: "Drumble Detergent Liquid",
    category: "Laundry Care",
    size: "1 Litre",
    price: 280,
    originalPrice: 350,
    image: "/images/drumble-pink.jpeg",
    images: ["/images/drumble-pink.jpeg", "/images/drumble-back.jpeg"],
    shortBenefit: "4-in-1 bucket wash, top load, front load & conditioner",
    benefits: ["pH balanced formula for all fabrics", "Built-in fabric conditioner", "Works with all machine types"],
    usage: "Use 2 caps per regular load. Suitable for bucket wash, top load, and front load machines.",
    rating: 4.6,
    reviews: 124,
    featured: true,
    variants: ["500 ml", "1 Litre", "5 Litre"],
    variantPrices: [
      { label: "500 ml", price: 160, originalPrice: 200 },
      { label: "1 Litre", price: 280, originalPrice: 350 },
      { label: "5 Litre", price: 1200, originalPrice: 1500 },
    ],
  },
  {
    id: "drumble-matic",
    name: "Drumble Matic Detergent",
    category: "Laundry Care",
    size: "1 Litre",
    price: 299,
    originalPrice: 380,
    image: "/images/drumble-matic.jpeg",
    images: ["/images/drumble-matic.jpeg"],
    shortBenefit: "All-in-one laundry solution with natural surfactants",
    benefits: ["Natural surfactants", "Fabric softener included", "Top load & front load compatible"],
    usage: "Add 1–2 caps directly to the drum or detergent compartment.",
    rating: 4.7,
    reviews: 98,
    featured: true,
    variants: ["500 ml", "1 Litre", "2 Litre"],
    variantPrices: [
      { label: "500 ml", price: 170, originalPrice: 220 },
      { label: "1 Litre", price: 299, originalPrice: 380 },
      { label: "2 Litre", price: 549, originalPrice: 700 },
    ],
  },
  {
    id: "drumble-blue",
    name: "Drumble 4-in-1 Liquid",
    category: "Laundry Care",
    size: "5 Litre",
    price: 899,
    originalPrice: 1100,
    image: "/images/drumble-blue-4in1.jpeg",
    images: ["/images/drumble-blue-4in1.jpeg"],
    shortBenefit: "Economy pack for bucket wash, top & front load",
    benefits: ["Extra-large economy size", "4-in-1 versatile formula", "Long-lasting freshness"],
    usage: "Use 3 caps per large load. Ideal for families.",
    rating: 4.5,
    reviews: 67,
  },
  {
    id: "brambells-neutral",
    name: "Brambells Non Acidic Neutral Cleaner",
    category: "Italian Marble Cleaner",
    size: "500 ml",
    price: 450,
    originalPrice: 550,
    image: "/images/brambells-neutral.jpeg",
    images: ["/images/brambells-neutral.jpeg", "/images/brambells-blue.jpeg"],
    shortBenefit: "For Italian marble & granite — non-acidic formula",
    benefits: ["100% non-acidic & safe for natural stone", "Prevents yellowing & dullness", "Suitable for all bathroom fittings"],
    usage: "Dilute 2 caps in 1L water. Mop or wipe surfaces gently.",
    rating: 4.9,
    reviews: 215,
    featured: true,
    variants: ["250 ml", "500 ml", "1 Litre"],
    variantPrices: [
      { label: "250 ml", price: 250, originalPrice: 300 },
      { label: "500 ml", price: 450, originalPrice: 550 },
      { label: "1 Litre", price: 799, originalPrice: 999 },
    ],
  },
  {
    id: "brambells-blue",
    name: "Brambells Marble Specialist",
    category: "Italian Marble Cleaner",
    size: "500 ml",
    price: 420,
    image: "/images/brambells-blue.jpeg",
    images: ["/images/brambells-blue.jpeg"],
    shortBenefit: "Specialist for imported marble & granites",
    benefits: ["Deep cleans without damage", "Restores natural shine", "Safe for imported stone"],
    usage: "Apply directly or dilute. Wipe with a soft cloth.",
    rating: 4.8,
    reviews: 178,
    featured: true,
    variants: ["250 ml", "500 ml", "1 Litre"],
    variantPrices: [
      { label: "250 ml", price: 240 },
      { label: "500 ml", price: 420 },
      { label: "1 Litre", price: 750 },
    ],
  },
  {
    id: "flushberri-citrus",
    name: "Flush Berri Citrus Toilet Cleaner",
    category: "Toilet Cleaners",
    size: "500 ml",
    price: 180,
    originalPrice: 220,
    image: "/images/flushberri-all.jpeg",
    images: ["/images/flushberri-all.jpeg"],
    shortBenefit: "Ultra thick gel — cleans hygienically with citrus freshness",
    benefits: ["Ultra thick gel formula", "Removes tough stains", "Perfumed citrus fragrance"],
    usage: "Squeeze under the rim. Leave 10 min, then scrub & flush.",
    rating: 4.4,
    reviews: 89,
    featured: true,
    variants: ["250 ml", "500 ml", "1 Litre"],
    variantPrices: [
      { label: "250 ml", price: 99, originalPrice: 120 },
      { label: "500 ml", price: 180, originalPrice: 220 },
      { label: "1 Litre", price: 320, originalPrice: 400 },
    ],
  },
  {
    id: "rustyk",
    name: "Rustyk Washing Machine Powder",
    category: "Washing Machine Cleaner",
    size: "200g",
    price: 199,
    image: "/images/rustyk.jpeg",
    images: ["/images/rustyk.jpeg"],
    shortBenefit: "Removes rust & dirt from washing machines",
    benefits: ["Prevents oxide formation", "Deep cleans drum & pipes", "One-time use pack"],
    usage: "Add entire pack to empty drum. Run a hot cycle.",
    rating: 4.3,
    reviews: 56,
    featured: true,
  },
  {
    id: "neemi",
    name: "NEEMI Neem Floor Cleaner",
    category: "Natural Surface Care",
    size: "1 Litre",
    price: 320,
    originalPrice: 400,
    image: "/images/neemi.jpeg",
    images: ["/images/neemi.jpeg"],
    shortBenefit: "Neem-based anti-insect floor cleaner",
    benefits: ["Natural neem extracts", "Repels insects naturally", "Much more than a phenyle"],
    usage: "Dilute 2 caps in a bucket of water. Mop all floor types.",
    rating: 4.6,
    reviews: 143,
  },
  {
    id: "shudh-black",
    name: "Shudh Black Dish Wash",
    category: "Kitchen Care",
    size: "200g × 5",
    price: 150,
    image: "/images/shudh-black.jpeg",
    images: ["/images/shudh-black.jpeg"],
    shortBenefit: "Activated charcoal dish wash bar",
    benefits: ["Charcoal-based deep clean", "Cuts through grease", "Eco-friendly formulation"],
    usage: "Wet the bar and scrub dishes. Rinse with water.",
    rating: 4.2,
    reviews: 34,
  },
];

export const categories: Category[] = [
  { id: "italian-marble", name: "Italian Marble Cleaner", description: "Non-acidic formulas engineered for luxury stone", productCount: 2, image: "/images/brambells-neutral.jpeg" },
  { id: "bathroom", name: "Bathroom Cleaner", description: "Premium care for all bathroom surfaces", productCount: 2, image: "/images/brambells-blue.jpeg" },
  { id: "washing-machine", name: "Washing Machine Cleaner", description: "Deep clean & de-rust your machine", productCount: 1, image: "/images/rustyk.jpeg" },
  { id: "toilet", name: "Toilet Cleaners", description: "Ultra thick gel for hygienic cleaning", productCount: 3, image: "/images/flushberri-all.jpeg" },
  { id: "natural", name: "Natural Surface Care", description: "Plant-based formulas for eco-conscious cleaning", productCount: 1, image: "/images/neemi.jpeg" },
];

export const reviews = [
  { name: "Priya S.", rating: 5, text: "Finally a cleaner that doesn't damage my Italian marble floors. The shine is incredible!", product: "Brambells Neutral Cleaner" },
  { name: "Arjun M.", rating: 5, text: "Drumble Matic is the only detergent I trust with my premium fabrics. Exceptional quality.", product: "Drumble Matic" },
  { name: "Sneha R.", rating: 4, text: "NEEMI keeps my floors clean and insect-free naturally. Love the neem fragrance.", product: "NEEMI Floor Cleaner" },
  { name: "Vikram P.", rating: 5, text: "Rustyk removed years of buildup from my washing machine. Like new again!", product: "Rustyk Powder" },
  { name: "Meera K.", rating: 5, text: "The non-acidic formula gives me peace of mind with my expensive Calacatta marble.", product: "Brambells Neutral Cleaner" },
  { name: "Rahul D.", rating: 4, text: "Flush Berri citrus smells amazing and the thick gel really sticks. Great value.", product: "Flush Berri Citrus" },
];

export const faqs = [
  { q: "Are your marble cleaners safe for all types of natural stone?", a: "Yes, all Brambells cleaners are 100% non-acidic and safe for Italian marble, Calacatta, Statuario, granite, travertine, and other natural stones." },
  { q: "What does 'non-acidic' mean and why does it matter?", a: "Non-acidic means our formulas have a neutral pH that won't etch, corrode, or dull natural stone surfaces. Acidic cleaners can permanently damage marble and granite." },
  { q: "Can I use Drumble detergent in a front-load washing machine?", a: "Absolutely! Drumble is formulated for top load, front load, and bucket wash. It produces low foam suitable for all machine types." },
  { q: "How often should I use Rustyk washing machine cleaner?", a: "We recommend using Rustyk once every 2–3 months to prevent rust buildup and maintain machine hygiene." },
  { q: "Is NEEMI floor cleaner safe for children and pets?", a: "NEEMI uses natural neem extracts and is formulated to be safe for households with children and pets when used as directed." },
  { q: "Do you offer bulk or wholesale pricing?", a: "Yes, we offer special pricing for bulk orders, architects, interior designers, and hospitality partners. Contact our concierge team for details." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied, contact us for a full refund or replacement." },
  { q: "Do you ship internationally?", a: "Currently we ship across India. International shipping is coming soon. Sign up for our newsletter to stay updated." },
];
