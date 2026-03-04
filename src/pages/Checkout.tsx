import { Link } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import { useCart } from "@/contexts/CartContext";
import { getVariantPrice } from "@/data/products";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();

  const handlePlaceOrder = () => {
    toast.success("Demo order placed!", { description: "This is a static prototype — no real transaction." });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <Layout>
          <PageHero title="Checkout" subtitle="Complete your order" />
          <section className="section-compact ">
            <div className="container-tight text-center py-12">
              <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
              <Link to="/shop" className="btn-gold">Shop Now</Link>
            </div>
          </section>
        </Layout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Layout>
        <PageHero title="Checkout" subtitle="Complete your order" />
        <section className="section-compact ">
          <div className="container-tight">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="glass-card rounded-xl p-6 space-y-4">
                  <h3 className="font-heading text-lg font-semibold">Shipping Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="First Name" className="col-span-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                    <input placeholder="Last Name" className="col-span-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <input placeholder="Email" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                  <input placeholder="Phone" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                  <input placeholder="Address" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                  <div className="grid grid-cols-3 gap-3">
                    <input placeholder="City" className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                    <input placeholder="State" className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                    <input placeholder="PIN Code" className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6 space-y-3">
                  <h3 className="font-heading text-lg font-semibold">Payment</h3>
                  <p className="text-xs text-muted-foreground">This is a static demo — no real payment will be processed.</p>
                  <div className="space-y-2">
                    {["Credit/Debit Card", "UPI", "Cash on Delivery"].map((m) => (
                      <label key={m} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border hover:border-gold/50 transition-colors cursor-pointer">
                        <input type="radio" name="payment" defaultChecked={m === "Cash on Delivery"} className="accent-gold" />
                        <span className="text-sm">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 h-fit space-y-4 sticky top-20">
                <h3 className="font-heading text-lg font-semibold">Order Summary</h3>
                <div className="space-y-3">
                  {items.map((item) => {
                    const { price } = getVariantPrice(item.product, item.variant);
                    return (
                      <div key={`${item.product.id}-${item.variant}`} className="flex gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-14 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{item.product.name}</p>
                          <p className="text-[10px] text-gold">{item.variant} × {item.qty}</p>
                        </div>
                        <span className="text-sm font-bold">₹{price * item.qty}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="gold-line" />
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-gold text-xs">Free</span></div>
                  <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span>₹{totalPrice}</span></div>
                </div>
                <button onClick={handlePlaceOrder} className="w-full btn-gold text-sm py-3">
                  Place Order (Demo)
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}
