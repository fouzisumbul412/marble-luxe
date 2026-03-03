import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import VariantSelector from "./VariantSelector";

export default function ProductCard({ product }: { product: Product }) {
  const [variantOpen, setVariantOpen] = useState(false);
  const [mode, setMode] = useState<"cart" | "buy">("cart");

  const openVariant = (m: "cart" | "buy") => {
    setMode(m);
    setVariantOpen(true);
  };

  return (
    <>
      <div className="glass-card rounded-xl overflow-hidden group">
        <Link to={`/product/${product.id}`} className="block relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-gold text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </Link>
        <div className="p-4 space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-heading text-sm font-semibold text-foreground leading-tight hover:text-gold transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2">{product.shortBenefit}</p>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
            <span className="text-[10px] text-muted-foreground ml-auto">{product.size}</span>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              className="flex-1 text-xs py-2 rounded-lg border border-border text-foreground/70 hover:border-gold hover:text-gold transition-all"
              onClick={() => openVariant("cart")}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 btn-gold text-xs py-2 px-3"
              onClick={() => openVariant("buy")}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <VariantSelector product={product} open={variantOpen} onClose={() => setVariantOpen(false)} mode={mode} />
    </>
  );
}
