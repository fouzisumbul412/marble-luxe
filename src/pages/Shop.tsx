import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Shop() {
  const [selectedCat, setSelectedCat] = useState("All");
  const ref = useScrollReveal<HTMLDivElement>();

  const cats = ["All", ...new Set(products.map((p) => p.category))];
  const filtered = selectedCat === "All" ? products : products.filter((p) => p.category === selectedCat);

  return (
    <Layout>
      <PageHero title="Shop Premium Surface Care" subtitle="Engineered formulas for every luxury surface." compact />
      <section className="section-compact bg-background" ref={ref}>
        <div className="container-tight">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6 fade-up">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`text-xs px-4 py-1.5 rounded-full border transition-all ${
                  selectedCat === c
                    ? "bg-gold text-primary-foreground border-gold"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 fade-up">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
