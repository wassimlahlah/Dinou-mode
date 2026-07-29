import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { motion } from "framer-motion";
import { FaCheck, FaTruck, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";

const WILAYAS = [
  "Adrar",                 // 01
  "Chlef",                 // 02
  "Laghouat",              // 03
  "Oum El Bouaghi",        // 04
  "Batna",                 // 05
  "Bejaia",                // 06
  "Biskra",                // 07
  "Bechar",                // 08
  "Blida",                 // 09
  "Bouira",                // 10
  "Tamanrasset",           // 11
  "Tebessa",               // 12
  "Tlemcen",               // 13
  "Tiaret",                // 14
  "Tizi Ouzou",            // 15
  "Algiers",               // 16
  "Djelfa",                // 17
  "Jijel",                 // 18
  "Setif",                 // 19
  "Saida",                 // 20
  "Skikda",                // 21
  "Sidi Bel Abbes",        // 22
  "Annaba",                // 23
  "Guelma",                // 24
  "Constantine",           // 25
  "Medea",                 // 26
  "Mostaganem",            // 27
  "M'Sila",                // 28
  "Mascara",               // 29
  "Ouargla",               // 30
  "Oran",                  // 31
  "El Bayadh",             // 32
  "Illizi",                // 33
  "Bordj Bou Arreridj",    // 34
  "Boumerdes",             // 35
  "El Tarf",               // 36
  "Tindouf",               // 37
  "Tissemsilt",            // 38
  "El Oued",               // 39
  "Khenchela",             // 40
  "Souk Ahras",            // 41
  "Tipaza",                // 42
  "Mila",                  // 43
  "Ain Defla",             // 44
  "Naama",                 // 45
  "Ain Temouchent",        // 46
  "Ghardaia",              // 47
  "Relizane",              // 48
  "Timimoun",              // 49
  "Bordj Badji Mokhtar",   // 50
  "Ouled Djellal",         // 51
  "Beni Abbes",            // 52
  "In Salah",              // 53
  "In Guezzam",            // 54
  "Touggourt",             // 55
  "Djanet",                // 56
  "El M'Ghair",            // 57
  "El Meniaa"              // 58
];
export default function Checkout() {
    const { cart, cartTotal, clearCart } = useShop();
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        wilaya: "",
        commune: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const shipping = cartTotal > 10000 ? 0 : 500;
    const finalTotal = cartTotal + shipping;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Order:", { ...formData, cart, total: finalTotal });
        setSubmitted(true);
        setLoading(false);
        clearCart();
    };

    if (cart.length === 0 && !submitted) {
        return (
            <div className="p-6 md:p-10 max-w-2xl mx-auto text-center">
                <p className="text-6xl mb-6">🛒</p>
                <p className="text-2xl text-gray-400 mb-6">Your cart is empty</p>
                <Link to="/shop" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-pink-500 transition">
                    Back to Shop
                </Link>
            </div>
        );
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 md:p-10 max-w-2xl mx-auto text-center"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-[#F7D6DF] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <FaCheck className="text-pink-500 text-4xl" />
                </motion.div>
                <h2 className="text-3xl font-serif font-bold mb-4">Order Confirmed!</h2>
                <p className="text-gray-500 mb-2">
                    Thank you <span className="font-semibold text-gray-800">{formData.fullName}</span>,
                </p>
                <p className="text-gray-500 mb-8">
                    We'll contact you soon at <span className="font-semibold text-gray-800">{formData.phone}</span> to confirm your order.
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Order Total</p>
                    <p className="text-3xl font-bold text-pink-500">{finalTotal.toLocaleString()} DA</p>
                </div>
                <Link to="/shop" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-pink-500 transition">
                    Continue Shopping
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-serif font-bold mb-10"
            >
                Complete Your Order
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                
                {/* ===== LEFT : SHIPPING FORM ===== */}
                <div className="lg:col-span-3">
                    <motion.form 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit} 
                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                    >
                        <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                        
                        <div className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F7D6DF] focus:border-pink-300 transition"
                                    placeholder="Your full name"
                                />
                            </div>

                            {/* Phone + Wilaya */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F7D6DF] focus:border-pink-300 transition"
                                        placeholder="05XX XX XX XX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Wilaya <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="wilaya"
                                        required
                                        value={formData.wilaya}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F7D6DF] focus:border-pink-300 transition bg-white"
                                    >
                                        <option value="">Select a wilaya</option>
                                        {WILAYAS.map((w) => (
                                            <option key={w} value={w}>{w}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Commune */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Commune
                                </label>
                                <input
                                    type="text"
                                    name="commune"
                                    value={formData.commune}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F7D6DF] focus:border-pink-300 transition"
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full mt-8 py-4 rounded-full font-bold text-lg transition
                                ${loading 
                                    ? "bg-gray-300 cursor-not-allowed" 
                                    : "bg-black text-white hover:bg-pink-500"
                                }
                            `}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.span 
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    >
                                        ⏳
                                    </motion.span>
                                    Processing...
                                </span>
                            ) : (
                                "Place Order"
                            )}
                        </button>
                    </motion.form>
                </div>

                {/* ===== RIGHT : ORDER SUMMARY ===== */}
                <div className="lg:col-span-2">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6"
                    >
                        <h2 className="text-xl font-bold mb-6 font-serif">Order Summary</h2>
                        
                        {/* Products list */}
                        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                                    <div className="flex-1">
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                        <span className="text-gray-400"> × {item.quantity}</span>
                                        {item.size && <span className="text-gray-400 text-xs"> ({item.size})</span>}
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        {(item.price * item.quantity).toLocaleString()} DA
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{cartTotal.toLocaleString()} DA</span>
                            </div>
                             <div className="flex justify-between text-gray-600">
                                <span>Dilavrie</span>
                                <span>{dilavrie.toLocaleString()} DA</span>// i wante delver by willay 
                            </div>
                           
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-bold text-pink-500">
                                    {finalTotal.toLocaleString()} DA
                                </span>
                            </div>
                            {shipping === 0 && (
                                <p className="text-xs text-green-500 mt-1">🎉 You got free shipping!</p>
                            )}
                        </div>

                        {/* Benefits */}
                        <div className="mt-6 space-y-3 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FaShieldAlt className="text-pink-500" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FaTruck className="text-pink-500" />
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FaCheck className="text-pink-500" />
                                <span>Quality Guarantee</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}