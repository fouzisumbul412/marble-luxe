import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Shop() {
  const [selectedCat, setSelectedCat] = useState("All");

  useEffect(() => { AOS.init({ duration: 600, once: true, offset: 40 }); }, []);

  const cats = ["All", ...new Set(products.map((p) => p.category))];
  const filtered = selectedCat === "All" ? products : products.filter((p) => p.category === selectedCat);

  return (
    <PageTransition>
      <Layout>
        <PageHero title="Shop Premium Surface Care" subtitle="Engineered formulas for every luxury surface." compact />
        <section className="section-compact bg-background">
          <div className="container-tight">
            <div className="flex flex-wrap gap-2 mb-6" data-aos="fade-up">
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((p, i) => (
                <div key={p.id} data-aos="fade-up" data-aos-delay={i * 60}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}
