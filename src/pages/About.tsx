import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import { Shield, Award, Palette } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => { AOS.init({ duration: 600, once: true, offset: 40 }); }, []);

  return (
    <PageTransition>
      <Layout>
        <PageHero title="Luxury Care, Engineered" subtitle="Non-acidic, professional-grade formulas trusted by architects and designers." />
        <section className="section-compact bg-background">
          <div className="container-tight max-w-3xl space-y-12">
            <div data-aos="fade-up">
              <h2 className="font-heading text-xl font-bold mb-3">Our Story</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Born from the frustration of watching beautiful Italian marble get damaged by harsh, acidic cleaners, Upmarket was founded with one mission: to create cleaning solutions that protect luxury surfaces, not destroy them. Every formula is developed in collaboration with stone care experts and tested on premium Calacatta, Statuario, and other natural stones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: "Quality Promise", desc: "100% non-acidic. Every product is pH-tested and certified safe for natural stone." },
                { icon: Award, title: "Professional Grade", desc: "Trusted by luxury hotels, architects, and interior designers across India." },
                { icon: Palette, title: "For Designers", desc: "Tailored solutions for high-end projects. Bulk and B2B partnerships available." },
              ].map((item, i) => (
                <div key={item.title} className="glass-card rounded-xl p-5 text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                  <item.icon className="mx-auto mb-3 text-gold" size={28} />
                  <h3 className="font-heading text-sm font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center" data-aos="fade-up">
              <div className="gold-line max-w-16 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground italic">
                "Cleaning should protect beauty, never compromise it."
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}
