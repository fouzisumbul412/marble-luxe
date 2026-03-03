import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartSlider() {
  const { items, isSliderOpen, setSliderOpen, updateQty, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isSliderOpen) return null;

  return (
    <div className="fixed inset-0 z-[55]">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSliderOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm glass-panel flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-gold" />
            <h2 className="font-heading text-lg font-semibold">Your Cart ({totalItems})</h2>
          </div>
          <button onClick={() => setSliderOpen(false)} className="p-1 text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={40} className="mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Your cart is empty</p>
              <button onClick={() => setSliderOpen(false)} className="btn-outline-gold text-xs mt-4">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.variant}`} className="flex gap-3 glass-card rounded-xl p-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-xs font-semibold text-foreground truncate">{item.product.name}</h3>
                  <p className="text-[10px] text-gold font-medium">{item.variant}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded overflow-hidden">
                      <button onClick={() => updateQty(item.product.id, item.variant, item.qty - 1)} className="px-2 py-1 text-xs hover:bg-muted"><Minus size={10} /></button>
                      <span className="px-2 py-1 text-xs font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, item.variant, item.qty + 1)} className="px-2 py-1 text-xs hover:bg-muted"><Plus size={10} /></button>
                    </div>
                    <span className="text-sm font-bold">₹{item.product.price * item.qty}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id, item.variant)}
                  className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-foreground">₹{totalPrice}</span>
            </div>
            <div className="flex gap-2">
              <Link
                to="/cart"
                onClick={() => setSliderOpen(false)}
                className="flex-1 btn-outline-gold text-xs text-center py-2.5"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={() => setSliderOpen(false)}
                className="flex-1 btn-gold text-xs text-center py-2.5"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
