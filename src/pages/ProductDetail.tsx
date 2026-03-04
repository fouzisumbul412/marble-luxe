import { useParams, Link } from "react-router-dom";
import { Star, Shield, ChevronDown, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/PageTransition";
import ProductCard from "@/components/ProductCard";
import { products, getProductVariants, getVariantPrice } from "@/data/products";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const variants = product ? getProductVariants(product) : [];
  const currentVariant = selectedVariant || (variants[0] ?? "");
  const variantPrice = product ? getVariantPrice(product, currentVariant) : { price: 0 };

  if (!product) {
    return (
      <PageTransition>
        <Layout>
          <div className="section-compact container-tight text-center">
            <h1 className="font-heading text-2xl font-bold">Product not found</h1>
            <Link to="/shop" className="btn-gold mt-4 inline-block">Back to Shop</Link>
          </div>
        </Layout>
      </PageTransition>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const accordions = [
    { key: "desc", title: "Description & Features", content: product.shortBenefit + ". " + product.benefits.join(". ") + "." },
    { key: "shipping", title: "Shipping Policy", content: "Free shipping on orders above ₹499. Standard delivery: 3–5 business days." },
    { key: "notes", title: "Safety Notes", content: "Keep away from children. For external use only. Non-acidic and safe for natural stone surfaces." },
  ];

  return (
    <PageTransition>
      <Layout>
        <section className=" py-8 md:py-14">
          <div className="container-tight">
            <p className="text-xs text-muted-foreground mb-4">
              <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop" className="hover:text-gold">Shop</Link> / {product.name}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="glass-card rounded-xl overflow-hidden relative" style={{ aspectRatio: "4/5" }}>
                  <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
                      wishlisted ? "bg-red-500/20 text-red-500" : "bg-foreground/10 text-foreground/50 hover:text-red-400"
                    }`}
                  >
                    <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                  </button>
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2">
                    {product.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === i ? "border-gold" : "border-border"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-gold">{product.category}</p>
                <h1 className="font-heading text-2xl md:text-3xl font-bold">{product.name}</h1>
                <p className="text-sm text-muted-foreground">{product.shortBenefit}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border"} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold">₹{variantPrice.price}</span>
                  {variantPrice.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{variantPrice.originalPrice}</span>}
                  <span className="text-xs text-muted-foreground">{currentVariant}</span>
                </div>

                {variants.length > 1 && (
                  <div>
                    <p className="text-xs font-medium text-foreground mb-2">Select Variant</p>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v) => {
                        const vp = getVariantPrice(product, v);
                        return (
                          <button key={v} onClick={() => setSelectedVariant(v)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              currentVariant === v ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/50"
                            }`}>
                            {v} — ₹{vp.price}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <ul className="space-y-1.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Shield size={14} className="text-gold mt-0.5 shrink-0" />{b}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground border-l-2 border-gold/30 pl-3">
                  <strong className="text-foreground">Usage:</strong> {product.usage}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-sm hover:bg-muted transition">−</button>
                    <span className="px-3 py-2 text-sm font-medium">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-sm hover:bg-muted transition">+</button>
                  </div>
                  <button className="flex-1 btn-outline-gold text-sm" onClick={() => addToCart(product, currentVariant, qty)}>Add to Cart</button>
                  <button className="flex-1 btn-gold text-sm" onClick={() => addToCart(product, currentVariant, qty)}>Buy Now</button>
                </div>

                <div className="border-t border-border pt-4 space-y-0">
                  {accordions.map((a) => (
                    <div key={a.key} className="border-b border-border">
                      <button onClick={() => setOpenAccordion(openAccordion === a.key ? null : a.key)}
                        className="w-full flex items-center justify-between py-3 text-sm font-medium text-foreground">
                        {a.title}
                        <ChevronDown size={14} className={`transition-transform ${openAccordion === a.key ? "rotate-180" : ""}`} />
                      </button>
                      {openAccordion === a.key && <p className="pb-3 text-xs text-muted-foreground leading-relaxed">{a.content}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section-compact ">
            <div className="container-tight">
              <h2 className="font-heading text-xl font-bold mb-4">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}

        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-panel border-t border-border px-4 py-3 flex items-center gap-3">
          <span className="text-lg font-bold">₹{variantPrice.price}</span>
          <button className="flex-1 btn-gold text-sm py-2.5" onClick={() => addToCart(product, currentVariant, 1)}>Buy Now</button>
        </div>
      </Layout>
    </PageTransition>
  );
}
