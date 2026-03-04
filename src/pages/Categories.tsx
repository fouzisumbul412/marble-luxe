import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Categories() {
  useEffect(() => { AOS.init({ duration: 600, once: true, offset: 40 }); }, []);

  return (
    <PageTransition>
      <Layout>
        <PageHero title="Surface Care Collections" subtitle="Engineered formulas for luxury environments." compact />
        <section className="section-compact ">
          <div className="container-tight space-y-12">
            {categories.map((cat, ci) => {
              const catProducts = products.filter((p) => p.category === cat.name);
              return (
                <div key={cat.id} data-aos="fade-up" data-aos-delay={ci * 80}>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <h2 className="font-heading text-xl md:text-2xl font-bold">{cat.name}</h2>
                      <p className="text-xs text-muted-foreground">{cat.description}</p>
                    </div>
                    <Link to="/shop" className="text-xs text-gold hover:underline">View all →</Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {catProducts.slice(0, 4).map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}
