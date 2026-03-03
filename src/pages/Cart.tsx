import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { items, updateQty, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <Layout>
      <PageHero title="Shopping Cart" subtitle="Review your selections before checkout" />
      <section className="section-compact bg-background">
        <div className="container-tight">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="font-heading text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-sm text-muted-foreground mb-6">Browse our premium surface care products</p>
              <Link to="/shop" className="btn-gold">Shop Now</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items */}
              <div className="lg:col-span-2 space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variant}`} className="glass-card rounded-xl p-4 flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-sm font-semibold text-foreground hover:text-gold transition-colors">{item.product.name}</h3>
                      </Link>
                      <p className="text-[10px] uppercase tracking-wider text-gold font-medium">{item.variant}</p>
                      <p className="text-xs text-muted-foreground">{item.product.size}</p>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button onClick={() => updateQty(item.product.id, item.variant, item.qty - 1)} className="px-3 py-1.5 text-sm hover:bg-muted transition"><Minus size={12} /></button>
                          <span className="px-3 py-1.5 text-sm font-medium">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, item.variant, item.qty + 1)} className="px-3 py-1.5 text-sm hover:bg-muted transition"><Plus size={12} /></button>
                        </div>
                        <span className="text-base font-bold">₹{item.product.price * item.qty}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id, item.variant)} className="self-start p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive transition-colors underline">
                  Clear Cart
                </button>
              </div>

              {/* Summary */}
              <div className="glass-card rounded-xl p-6 h-fit space-y-4 sticky top-20">
                <h3 className="font-heading text-lg font-semibold">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-gold text-xs">Free</span></div>
                  <div className="gold-line my-2" />
                  <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{totalPrice}</span></div>
                </div>
                <Link to="/checkout" className="btn-gold w-full text-center text-sm py-3 block">
                  Proceed to Checkout
                </Link>
                <Link to="/shop" className="btn-outline-gold w-full text-center text-xs py-2 block">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
