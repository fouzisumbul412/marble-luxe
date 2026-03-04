import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/data/products";
import { getVariantPrice } from "@/data/products";

export interface CartItem {
  product: Product;
  variant: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: string, qty?: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  updateQty: (productId: string, variant: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isSliderOpen: boolean;
  setSliderOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSliderOpen, setSliderOpen] = useState(false);

  const addToCart = (product: Product, variant: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.variant === variant);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.variant === variant
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { product, variant, qty }];
    });
    setSliderOpen(true);
  };

  const removeFromCart = (productId: string, variant: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.variant === variant)));
  };

  const updateQty = (productId: string, variant: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId, variant);
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.variant === variant ? { ...i, qty } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => {
    const { price } = getVariantPrice(i.product, i.variant);
    return s + price * i.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice, isSliderOpen, setSliderOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
