import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { faqs } from "@/data/products";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Layout>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about our premium surface care products." compact />
      <section className="section-compact bg-background">
        <div className="container-tight max-w-2xl">
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-foreground hover:text-gold transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`shrink-0 transition-transform ${openIndex === i ? "rotate-180 text-gold" : ""}`} />
                </button>
                {openIndex === i && (
                  <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
