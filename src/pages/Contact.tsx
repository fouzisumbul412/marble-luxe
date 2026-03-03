import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <PageHero title="Concierge Support" subtitle="We're here to help with product selection, bulk orders, and professional partnerships." compact />
      <section className="section-compact bg-background">
        <div className="container-tight max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="font-heading text-lg font-bold mb-4">Send a Message</h2>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Message sent! (Demo)", { description: "We'll get back to you shortly." });
                }}
              >
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                <input type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                <input type="text" placeholder="Subject" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                <textarea placeholder="Your message..." rows={4} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none" />
                <button type="submit" className="btn-gold w-full">Send Message</button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "upmarketfmcg@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 87 1000 7000" },
                { icon: MapPin, label: "Address", value: "#43, 6th Main, 5th Block, Jayanagar, Bengaluru - 560041" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
