import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container-tight py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-lg font-bold text-background mb-2">
              Upmarket<span className="text-gold">.</span>
            </h3>
            <p className="text-sm leading-relaxed text-background/60">
              Non-acidic, professional-grade cleaning solutions engineered for luxury Italian marble & premium surfaces.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-background mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-1.5">
              {[
                { label: "Shop All", path: "/shop" },
                { label: "Categories", path: "/categories" },
                { label: "About Us", path: "/about" },
                { label: "FAQ", path: "/faq" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-sm text-background/50 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-background mb-3">Contact</h4>
            <div className="text-sm text-background/50 space-y-1.5">
              <p>upmarketfmcg@gmail.com</p>
              <p>+91 87 1000 7000</p>
              <p>#43, 6th Main, 5th Block, Jayanagar, Bengaluru - 560041</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-background mb-3">Follow Us</h4>
            <div className="flex gap-3">
              {["Instagram", "Facebook", "YouTube"].map((s) => (
                <span key={s} className="text-xs text-background/40 border border-background/20 rounded-full px-3 py-1 hover:text-gold hover:border-gold transition-colors cursor-pointer">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-line mt-8 mb-4" />
        <p className="text-xs text-background/30 text-center">
          © {new Date().getFullYear()} Upmarket FMCG. All rights reserved. Engineered in India.
        </p>
      </div>
    </footer>
  );
}
