import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Shield, Sparkles, Sun, Award, Droplets, Star, ArrowRight, Gem, FlaskConical, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/PageTransition";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: "90vh", minHeight: 520 }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/brambells-neutral.jpeg')",
          backgroundAttachment: "fixed",
          filter: "brightness(0.35) saturate(0.6)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/40" />

      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gold/50 rounded-full"
          style={{
            top: `${15 + Math.random() * 65}%`,
            left: `${5 + Math.random() * 90}%`,
            animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}

      <div className="container-tight relative z-10 h-full flex flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold mb-5 font-medium" data-aos="fade-down" data-aos-delay="100">
          Premium Surface Care
        </p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4" data-aos="fade-up" data-aos-delay="200">
          Engineered for<br />
          <span className="text-gold italic">Italian Marble.</span>
        </h1>
        <p className="text-primary-foreground/60 text-sm md:text-base max-w-lg mx-auto mb-8" data-aos="fade-up" data-aos-delay="300">
          Non-acidic protection for premium stone & luxury surfaces. Trusted by architects and designers worldwide.
        </p>
        <div className="flex items-center justify-center gap-3" data-aos="fade-up" data-aos-delay="400">
          <Link to="/shop" className="btn-gold text-sm">Shop Now</Link>
          <a href="#featured" className="btn-outline-gold !text-primary-foreground !border-primary-foreground/30 hover:!border-gold hover:!text-gold">
            Explore Products
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: "scroll-hint 2s ease infinite" }}>
        <ChevronDown size={22} className="text-gold/40" />
      </div>
    </section>
  );
}

function FeaturedCarousel() {
  const featured = products.filter((p) => p.featured);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <section id="featured" className="section-compact bg-background overflow-hidden">
      <div className="container-tight">
        <div className="flex items-end justify-between mb-6" data-aos="fade-up">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Featured Products</h2>
            <div className="gold-line max-w-16 mt-3" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/50 hover:border-gold hover:text-gold disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/50 hover:border-gold hover:text-gold disabled:opacity-30 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {featured.map((p) => (
            <div key={p.id} className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] snap-start" data-aos="fade-up">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/drumble-back.jpeg')",
          backgroundAttachment: "fixed",
          filter: "brightness(0.3) saturate(0.5)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-foreground/30" />
      <div className="container-tight relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div data-aos="fade-right">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Limited Offer</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground">
            Get 20% Off Your First Order
          </h2>
          <p className="text-primary-foreground/60 text-sm mt-2 max-w-md">
            Premium marble care at an unbeatable price. Use code <span className="text-gold font-semibold">UPMARKET20</span> at checkout.
          </p>
        </div>
        <Link to="/shop" className="btn-gold text-sm shrink-0" data-aos="fade-left">
          Shop Now <ArrowRight size={14} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}

function CategoryStrip() {
  return (
    <section className="section-compact marble-bg">
      <div className="container-tight">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-6" data-aos="fade-up">Collections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to="/categories"
              className="glass-card rounded-xl overflow-hidden group text-center"
              data-aos="fade-up"
              data-aos-delay={i * 80}
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
  const items = [
    { icon: Shield, label: "Non-Acidic Formula", desc: "pH-neutral formulas that protect natural stone from etching" },
    { icon: Sparkles, label: "Protects Shine", desc: "Maintains the original lustre of premium surfaces" },
    { icon: Sun, label: "Prevents Yellowing", desc: "Advanced UV-guard technology for lasting beauty" },
    { icon: Award, label: "Professional Grade", desc: "Trusted by architects and interior designers" },
    { icon: Droplets, label: "Safe for Luxury", desc: "Gentle on marble, granite, and all premium stones" },
  ];

  return (
    <section className="section-compact bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/images/brambells-blue.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="container-tight relative z-10">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">The Upmarket Difference</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Why Choose Us</h2>
          <div className="gold-line max-w-20 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="group relative rounded-2xl p-6 text-center border border-border/50 bg-card/50 backdrop-blur-sm hover:border-gold/30 transition-all duration-500 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <item.icon className="text-gold" size={22} />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.label}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Choose", desc: "Select the right formula for your surface type", icon: FlaskConical },
    { num: "02", title: "Apply", desc: "Dilute or apply directly per instructions", icon: Gem },
    { num: "03", title: "Shine", desc: "Enjoy streak-free, protected surfaces daily", icon: CheckCircle2 },
  ];

  return (
    <section className="section-compact marble-bg relative overflow-hidden">
      <div className="container-tight">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Simple & Effective</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">How It Works</h2>
          <div className="gold-line max-w-20 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.num} className="relative text-center" data-aos="fade-up" data-aos-delay={i * 150}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-4 border border-gold/20">
                <s.icon className="text-gold" size={26} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">Step {s.num}</span>
              <h3 className="font-heading text-lg font-semibold mt-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight size={16} className="text-gold/30 absolute top-8 -right-3 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularItems() {
  const popular = products.filter((p) => !p.featured).concat(products.filter((p) => p.featured).slice(0, 3));
  const display = popular.slice(0, 6);

  return (
    <section className="section-compact bg-background">
      <div className="container-tight">
        <div className="flex items-end justify-between mb-6" data-aos="fade-up">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Trending Now</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Popular Items</h2>
          </div>
          <Link to="/shop" className="text-sm text-gold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {display.map((p, i) => (
            <div key={p.id + i} data-aos="fade-up" data-aos-delay={i * 80}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutUsBanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/neemi.jpeg')",
          backgroundAttachment: "fixed",
          filter: "brightness(0.25) saturate(0.5)",
        }}
      />
      <div className="container-tight relative z-10">
        <div className="max-w-2xl" data-aos="fade-right">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Our Story</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
            Luxury Care,<br /><span className="text-gold italic">Engineered.</span>
          </h2>
          <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
            Born from a passion for preserving luxury surfaces, Upmarket creates professional-grade, non-acidic formulas
            that protect Italian marble, premium granite, and delicate stone. Trusted by top architects and designers.
          </p>
          <Link to="/about" className="btn-outline-gold !text-primary-foreground !border-primary-foreground/30 hover:!border-gold hover:!text-gold">
            Learn More <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviewData = [
    { name: "Priya S.", rating: 5, text: "Finally a cleaner that doesn't damage my Italian marble floors. The shine is incredible!", product: "Brambells Neutral Cleaner" },
    { name: "Arjun M.", rating: 5, text: "Drumble Matic is the only detergent I trust with my premium fabrics. Exceptional quality.", product: "Drumble Matic" },
    { name: "Sneha R.", rating: 4, text: "NEEMI keeps my floors clean and insect-free naturally. Love the neem fragrance.", product: "NEEMI Floor Cleaner" },
    { name: "Vikram P.", rating: 5, text: "Rustyk removed years of buildup from my washing machine. Like new again!", product: "Rustyk Powder" },
    { name: "Meera K.", rating: 5, text: "The non-acidic formula gives me peace of mind with my expensive Calacatta marble.", product: "Brambells Neutral Cleaner" },
    { name: "Rahul D.", rating: 4, text: "Flush Berri citrus smells amazing and the thick gel really sticks. Great value.", product: "Flush Berri Citrus" },
  ];

  return (
    <section className="section-compact marble-bg">
      <div className="container-tight">
        <div className="text-center mb-8" data-aos="fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Testimonials</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviewData.map((r, i) => (
            <div key={i} className="glass-card rounded-xl p-5" data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4 italic">"{r.text}"</p>
              <div className="flex items-center justify-between border-t border-border/50 pt-3">
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

function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-tight text-center" data-aos="fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Ready to Transform?</p>
        <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
          Protect Your Surfaces.<br />
          <span className="text-gold">Elevate Your Space.</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          Join thousands of homeowners and professionals who trust Upmarket for their premium surface care.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/shop" className="btn-gold">Shop All Products</Link>
          <Link to="/contact" className="btn-outline-gold">Get in Touch</Link>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  return (
    <PageTransition>
      <Layout>
        <HeroSection />
        <FeaturedCarousel />
        <CTABanner />
        <CategoryStrip />
        <WhyChooseUs />
        <HowItWorks />
        <PopularItems />
        <AboutUsBanner />
        <ReviewsSection />
        <FinalCTA />
      </Layout>
    </PageTransition>
  );
}
