import { Link } from "react-router-dom";
import { ChevronDown, Shield, Sparkles, Sun, Award, Droplets, Star } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories, reviews } from "@/data/products";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function HeroSection() {
  return (
    <section className="relative marble-bg overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Sparkles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gold/40 rounded-full"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}

      <div className="container-tight relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">Premium Surface Care</p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
          Engineered for<br />
          <span className="text-gold">Italian Marble.</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8">
          Non-acidic protection for premium stone & luxury surfaces.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/shop" className="btn-gold">Shop Now</Link>
          <a href="#featured" className="btn-outline-gold">Buy Now</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ animation: "scroll-hint 2s ease infinite" }}>
        <ChevronDown size={20} className="text-gold/50" />
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const ref = useScrollReveal<HTMLDivElement>();
  const featured = products.filter((p) => p.featured);

  return (
    <section id="featured" className="section-compact bg-background" ref={ref}>
      <div className="container-tight">
        <div className="text-center mb-8 fade-up">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Featured Products</h2>
          <div className="gold-line max-w-16 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 fade-up">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8 fade-up">
          <Link to="/shop" className="btn-outline-gold">View All Products</Link>
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section className="section-compact marble-bg" ref={ref}>
      <div className="container-tight">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-6 fade-up">Collections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 fade-up">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/categories"
              className="glass-card rounded-xl overflow-hidden group text-center"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "1" }}>
                <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-background leading-tight">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const ref = useScrollReveal<HTMLDivElement>();
  const items = [
    { icon: Shield, label: "Non-Acidic Formula" },
    { icon: Sparkles, label: "Protects Shine" },
    { icon: Sun, label: "Prevents Yellowing" },
    { icon: Award, label: "Professional Grade" },
    { icon: Droplets, label: "Safe for Luxury" },
  ];

  return (
    <section className="section-compact bg-background" ref={ref}>
      <div className="container-tight">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8 fade-up">Why Choose Us</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 fade-up">
          {items.map((item) => (
            <div key={item.label} className="glass-card rounded-xl p-4 text-center">
              <item.icon className="mx-auto mb-2 text-gold" size={24} />
              <p className="text-xs font-medium text-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useScrollReveal<HTMLDivElement>();
  const steps = [
    { num: "01", title: "Choose", desc: "Select the right formula for your surface" },
    { num: "02", title: "Apply", desc: "Dilute or apply directly as instructed" },
    { num: "03", title: "Shine", desc: "Enjoy streak-free, protected surfaces" },
  ];

  return (
    <section className="section-compact marble-bg" ref={ref}>
      <div className="container-tight">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8 fade-up">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 fade-up">
          {steps.map((s) => (
            <div key={s.num} className="glass-card rounded-xl p-6 text-center">
              <span className="text-3xl font-heading font-bold text-gold/30">{s.num}</span>
              <h3 className="font-heading text-lg font-semibold mt-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section className="section-compact bg-background" ref={ref}>
      <div className="container-tight">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-6 fade-up">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-up">
          {reviews.map((r, i) => (
            <div key={i} className="glass-card rounded-xl p-5">
              <div className="flex gap-0.5 mb-2">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{r.name}</span>
                <span className="text-[10px] text-muted-foreground">{r.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategoryStrip />
      <WhyChooseUs />
      <HowItWorks />
      <ReviewsSection />
    </Layout>
  );
}
