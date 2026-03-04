import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shortBenefit.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-start justify-center pt-20 sm:pt-28"
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg mx-4 glass-panel rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search size={18} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {query.length > 1 && results.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No results for "{query}"</p>
              )}
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.category} · ₹{p.price}</p>
                  </div>
                </Link>
              ))}
              {query.length <= 1 && (
                <div className="px-5 py-6 text-center">
                  <p className="text-xs text-muted-foreground">Start typing to search products</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
