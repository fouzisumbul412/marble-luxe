import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import SearchOverlay from "@/components/SearchOverlay";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Categories", path: "/categories" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setSliderOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel" style={{ height: 60 }}>
        <div className="container-tight h-full flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
            Upmarket<span className="text-gold">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${
                  location.pathname === link.path ? "text-gold" : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-foreground/60 hover:text-gold transition-colors" aria-label="Search">
              <Search size={18} />
            </button>
            <Link to="/shop" className="p-2 text-foreground/60 hover:text-gold transition-colors relative" aria-label="Wishlist">
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button
              className="p-2 text-foreground/60 hover:text-gold transition-colors relative"
              aria-label="Cart"
              onClick={() => setSliderOpen(true)}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/shop" className="btn-gold hidden sm:inline-flex text-xs px-4 py-2">
              Buy Now
            </Link>
            <button
              className="md:hidden p-2 text-foreground/70"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-72 glass-panel p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
              <button className="self-end p-2" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-medium transition-colors ${
                      location.pathname === link.path ? "text-gold" : "text-foreground/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="btn-gold text-center text-sm mt-auto">
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
