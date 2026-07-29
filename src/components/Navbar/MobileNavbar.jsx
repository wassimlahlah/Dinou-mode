import { useShop } from "../../context/ShopContext";  // ← IMPORTÉ ICI
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function MobileNavbar() {
    const shop = useShop();           // ← Récupère tout le contexte
    const [menuOpen, setMenuOpen] = useState(false);

    // FALLBACK : si le contexte n'est pas disponible
    const cart = shop?.cart || [];    // ← cart = [] par défaut
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return (
        <div className="md:hidden">
            {/* Header mobile */}
            <div className="flex items-center justify-between p-4 bg-[#F7D6DF]">
                
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold">
                    Dinou<span className="text-pink-500">Moda</span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    
                    {/* Cart avec badge */}
                    <Link to="/cart" className="relative">
                        <FaShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Menu toggle */}
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            {menuOpen && (
                <div className="bg-[#F7D6DF] p-4 border-t border-pink-200">
                    <nav className="flex flex-col gap-3">
                        <Link to="/" onClick={() => setMenuOpen(false)} className="py-2">Home</Link>
                        <Link to="/shop" onClick={() => setMenuOpen(false)} className="py-2">Shop</Link>
                        <Link to="/categories" onClick={() => setMenuOpen(false)} className="py-2">Categories</Link>
                        <Link to="/offers" onClick={() => setMenuOpen(false)} className="py-2">Offers</Link>
                        <Link to="/cart" onClick={() => setMenuOpen(false)} className="py-2">
                            Cart ({cartCount})
                        </Link>
                        <Link to="/about" onClick={() => setMenuOpen(false)} className="py-2">About</Link>
                        <Link to="/admin" onClick={() => setMenuOpen(false)} className="py-2 text-pink-600 font-medium">
                            Admin Login
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    );
}