import { Link, useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useShop();
    const navigate = useNavigate();
    const product = products.find((item) => item.id === Number(id));

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product?.image);
    const [added, setAdded] = useState(false);

    if (!product) {
        return <div className="p-10 text-center text-2xl">Product not found</div>;
    }

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select a size and color");
            return;
        }
        addToCart(product, quantity, selectedSize, selectedColor);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        navigate("/cart");
    };

    const isOnSale = product.oldPrice && product.oldPrice > product.price;
    const discount = isOnSale
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    return (
        <div className="p-4 md:p-10 max-w-7xl mx-auto bg-pink-50">
            {/* Back button - mobile only */}
            <button
                onClick={() => navigate(-1)}
                className="md:hidden flex items-center gap-2 text-gray-500 mb-4 text-sm"
            >
                <FaArrowLeft /> Back
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
            >
                {/* ===== IMAGES ===== */}
                <div className="space-y-3 md:space-y-4">
                    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl">
                        <img
                            src={mainImage}
                            className="w-full h-[350px] md:h-[500px] object-cover"
                            alt={product.name}
                        />
                        {isOnSale && (
                            <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-500 text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                                -{discount}%
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 md:gap-3">
                        <button
                            onClick={() => setMainImage(product.image)}
                            className={`w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden border-2 transition ${
                                mainImage === product.image ? "border-black" : "border-transparent opacity-60"
                            }`}
                        >
                            <img src={product.image} className="w-full h-full object-cover" />
                        </button>
                        {product.secondImage && (
                            <button
                                onClick={() => setMainImage(product.secondImage)}
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden border-2 transition ${
                                    mainImage === product.secondImage ? "border-black" : "border-transparent opacity-60"
                                }`}
                            >
                                <img src={product.secondImage} className="w-full h-full object-cover" />
                            </button>
                        )}
                    </div>
                </div>

                {/* ===== INFO ===== */}
                <div className="flex flex-col justify-center">
                    <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider mb-1 md:mb-2">
                        {product.category}
                    </p>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                        {product.name}
                    </h1>

                    {/* Price */}
                    <div className="mt-3 md:mt-5 flex items-baseline gap-2 md:gap-4 flex-wrap">
                        {isOnSale ? (
                            <>
                                <span className="text-xl md:text-3xl font-bold text-pink-500">
                                    {product.price.toLocaleString()} DA
                                </span>
                                <span className="text-sm md:text-lg text-gray-400 line-through">
                                    {product.oldPrice.toLocaleString()} DA
                                </span>
                                <span className="text-xs md:text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                                    Save {(product.oldPrice - product.price).toLocaleString()} DA
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl md:text-3xl font-light text-pink-500">
                                {product.price.toLocaleString()} DA
                            </span>
                        )}
                    </div>

                    <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-600 leading-relaxed">
                        Premium women's fashion item designed for elegance and comfort.
                        Crafted with high-quality materials for a luxurious feel.
                    </p>

                    {/* Size */}
                    <div className="mt-6 md:mt-8">
                        <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3">
                            Size <span className="text-red-500">*</span>
                        </h3>
                        <div className="flex gap-2 md:gap-3">
                            {["S", "M", "L", "XL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`border-2 px-4 md:px-6 py-2 md:py-2.5 cursor-pointer rounded-lg md:rounded-xl transition font-medium text-sm md:text-base flex-1 md:flex-none ${
                                        selectedSize === size
                                            ? "bg-pink-500 text-white border-pink-500"
                                            : "border-gray-700 text-gray-700 hover:bg-pink-200"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div className="mt-4 md:mt-6">
                        <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3">
                            Color <span className="text-red-500">*</span>
                        </h3>
                        <div className="flex gap-2 md:gap-3">
                            {["Black", "Pink", "White"].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 md:px-6 py-2 md:py-2.5 cursor-pointer rounded-lg md:rounded-xl border-2 transition font-medium text-sm md:text-base flex-1 md:flex-none ${
                                        selectedColor === color
                                            ? "bg-pink-500 text-white border-pink-500"
                                            : "border-gray-700 text-gray-700 hover:bg-pink-200"
                                    }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mt-4 md:mt-6">
                        <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3">Quantity</h3>
                        <div className="flex items-center gap-3 md:gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center hover:bg-pink-500 cursor-pointer hover:text-white transition text-sm md:text-base"
                            >
                                -
                            </button>
                            <span className="text-lg md:text-xl font-bold w-6 md:w-8 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center hover:bg-pink-500 cursor-pointer hover:text-white transition text-sm md:text-base"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <motion.button
                        onClick={handleAddToCart}
                        whileTap={{ scale: 0.97 }}
                        className={`mt-6 md:mt-10 w-full cursor-pointer md:w-auto py-3.5 md:py-4 px-6 md:px-12 rounded-full font-medium text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition ${
                            added
                                ? "bg-green-500 text-white"
                                : "bg-black text-white hover:bg-pink-500"
                        }`}
                    >
                        {added ? (
                            <>✓ Added</>
                        ) : (
                            <>
                                <FaShoppingCart size={16} />
                                Add To Cart — {(product.price * quantity).toLocaleString()} DA
                            </>
                        )}
                    </motion.button>

                    {/* Trust badges - mobile only */}
                    <div className="md:hidden mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                        <span>✓ Secure</span>
                        <span>✓ Fast Delivery</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}