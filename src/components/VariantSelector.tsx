import { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "@/data/products";
import { getProductVariants } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
  mode: "cart" | "buy";
}

export default function VariantSelector({ product, open, onClose, mode }: Props) {
  const variants = getProductVariants(product);
  const [selected, setSelected] = useState(variants[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  if (!open) return null;

  const handleConfirm = () => {
    addToCart(product, selected, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-panel rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 space-y-4 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.size}</p>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </div>

        <div>
          <p className="text-xs font-medium text-foreground mb-2">Select Variant</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v}
                onClick={() => setSelected(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selected === v
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-xs font-medium text-foreground">Qty</p>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 text-sm hover:bg-muted transition">−</button>
            <span className="px-3 py-1.5 text-sm font-medium">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 text-sm hover:bg-muted transition">+</button>
          </div>
          <span className="ml-auto text-base font-bold text-foreground">₹{product.price * qty}</span>
        </div>

        <button onClick={handleConfirm} className="w-full btn-gold text-sm py-3">
          {mode === "cart" ? "Add to Cart" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
