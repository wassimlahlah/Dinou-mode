import { useShop } from "../context/ShopContext";
import { FaTrash, FaPlus, FaMinus, FaCheck, FaTruck, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useShop();

    const shipping = cartTotal > 10000 ? 0 : 500;
    const finalTotal = cartTotal + shipping;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-serif font-bold mb-10"
            >
                My Cart
            </motion.h1>

            {cart.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                >
                    <p className="text-6xl mb-6">🛒</p>
                    <p className="text-2xl text-gray-400 mb-6">Your cart is empty</p>
                    <Link
                        to="/shop"
                        className="inline-block bg-black text-white px-10 py-4 rounded-full hover:bg-pink-500 transition font-medium"
                    >
                        Continue Shopping
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* ===== LEFT COLUMN : PRODUCTS ===== */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={`${item.id}-${item.size}-${item.color}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex gap-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 items-center hover:shadow-md transition-shadow"
                                >
                                    {/* Image */}
                                    <Link to={`/product/${item.id}`}>
                                        <img
                                            src={item.image}
                                            className="w-24 h-24 object-cover rounded-xl hover:scale-105 transition-transform"
                                            alt={item.name}
                                        />
                                    </Link>
                                    
                                    {/* Info */}
                                    <div className="flex-1">
                                        <Link to={`/product/${item.id}`}>
                                            <h2 className="text-lg font-semibold text-gray-800 hover:text-pink-500 transition-colors">{item.name}</h2>
                                        </Link>
                                        <p className="text-pink-500 font-bold text-lg mt-1">
                                            {item.price.toLocaleString()} DA
                                        </p>
                                        {item.size && (
                                            <p className="text-sm text-gray-400 mt-1">Size: {item.size}</p>
                                        )}
                                        {item.color && (
                                            <p className="text-sm text-gray-400">Color: {item.color}</p>
                                        )}
                                        
                                        {/* Quantity */}
                                        <div className="flex items-center gap-3 mt-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-[#F7D6DF] flex items-center justify-center hover:bg-pink-400 hover:text-white transition"
                                            >
                                                <FaMinus size={10} />
                                            </button>
                                            <span className="font-bold w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-[#F7D6DF] flex items-center justify-center hover:bg-pink-400 hover:text-white transition"
                                            >
                                                <FaPlus size={10} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total + Remove */}
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-800">
                                            {(item.price * item.quantity).toLocaleString()} DA
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                                            className="mt-2 text-red-400 hover:text-red-600 transition flex items-center gap-1 text-sm ml-auto"
                                        >
                                            <FaTrash size={12} />
                                            Remove
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Clear cart */}
                        <button
                            onClick={clearCart}
                            className="text-gray-500 hover:text-red-500 transition text-sm underline"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* ===== RIGHT COLUMN : SUMMARY ===== */}
                    <div className="lg:col-span-1">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6"
                        >
                            <h2 className="text-xl font-bold mb-6 font-serif">Order Summary</h2>
                            
                            <div className="space-y-4 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium">{cartTotal.toLocaleString()} DA</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-bold text-pink-500">
                                        {finalTotal.toLocaleString()} DA
                                    </span>
                                </div>
                                {shipping === 0 && (
                                    <p className="text-xs text-green-500 mt-1">🎉 Free shipping unlocked!</p>
                                )}
                            </div>

                            {/* Checkout Button */}
                            <Link
                                to="/checkout"
                                className="block w-full bg-black text-white text-center py-4 rounded-full hover:bg-pink-500 transition font-bold text-lg mb-4"
                            >
                                Checkout
                            </Link>

                            {/* Continue shopping */}
                            <Link
                                to="/shop"
                                className="block w-full border-2 border-black text-black text-center py-4 rounded-full hover:bg-black hover:text-white transition font-medium"
                            >
                                Continue Shopping
                            </Link>

                            {/* Benefits */}
                            <div className="mt-6 space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FaShieldAlt className="text-pink-500" />
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FaTruck className="text-pink-500" />
                                    <span>Delivery 58 Wilayas</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FaCheck className="text-pink-500" />
                                    <span>Quality Guarantee</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            )}
        </div>
    );
}