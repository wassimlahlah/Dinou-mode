import { Link, useParams, useNavigate } from "react-router-dom"; import { products } from "../data/products";
import { useShop } from "../context/ShopContext";  // ← AJOUTÉ
import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useShop();  // ← IMPORTÉ ICI
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
            alert("Veuillez sélectionner une taille et une couleur");
            return;
        }
        addToCart(product, quantity, selectedSize, selectedColor);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        navigate("/cart");
    };

    const isOnSale = product.oldPrice && product.oldPrice > product.price;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-10"
            >
                {/* Images */}
                <div className="space-y-4">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl">
                        <img
                            src={mainImage}
                            className="w-full h-[500px] object-cover"
                            alt={product.name}
                        />
                        {isOnSale && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                                PROMO
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setMainImage(product.image)}
                            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${mainImage === product.image ? "border-black" : "border-transparent"
                                }`}
                        >
                            <img src={product.image} className="w-full h-full object-cover" />
                        </button>
                        {product.secondImage && (
                            <button
                                onClick={() => setMainImage(product.secondImage)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${mainImage === product.secondImage ? "border-black" : "border-transparent"
                                    }`}
                            >
                                <img src={product.secondImage} className="w-full h-full object-cover" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{product.category}</p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold">{product.name}</h1>

                    {/* Prix */}
                    <div className="mt-5 flex items-baseline gap-4">
                        {isOnSale ? (
                            <>
                                <span className="text-2xl text-gray-400 line-through decoration-red-400">
                                    {product.oldPrice.toLocaleString()} DA
                                </span>
                                <span className="text-3xl font-bold text-green-500">
                                    {product.price.toLocaleString()} DA
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-light">{product.price.toLocaleString()} DA</span>
                        )}
                    </div>

                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Premium women's fashion item designed for elegance and comfort.
                        Crafted with high-quality materials for a luxurious feel.
                    </p>

                    {/* Size */}
                    <h3 className="mt-8 font-bold text-lg">Taille <span className="text-red-500">*</span></h3>
                    <div className="flex gap-3 mt-3">
                        {["S", "M", "L", "XL"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`border-2 px-6 py-2 rounded-xl transition font-medium ${selectedSize === size
                                        ? "bg-pink-500 text-white cursor-pointer"
                                        : "hover:bg-pink-200 text-black cursor-pointer"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Color */}
                    <h3 className="mt-6 font-bold text-lg">Couleur <span className="text-red-500">*</span></h3>
                    <div className="flex gap-3 mt-3">
                        {["Black", "Pink", "White"].map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-6 py-2 rounded-xl border-1 transition font-medium ${selectedColor === color
                                        ? "bg-pink-500 text-white cursor-pointer"
                                        : "hover:bg-pink-200 text-black cursor-pointer"
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>

                    {/* Quantity */}
                    <h3 className="mt-6 font-bold text-lg">Quantité</h3>
                    <div className="flex items-center gap-4 mt-3">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 cursor-pointer rounded-full border-2 flex items-center justify-center hover:bg-pink-500 hover:text-white transition"
                        >
                            -
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 cursor-pointer rounded-full border-2 flex items-center justify-center hover:bg-pink-500 hover:text-white transition"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        onClick={handleAddToCart}
                        whileTap={{ scale: 0.95 }}
                        className={`
                            mt-10 py-4 px-12 rounded-full font-medium text-lg flex items-center justify-center gap-3 transition
                            ${added
                                ? "bg-green-500 text-white cursor-not-allowed"
                                : "bg-black text-white hover:bg-pink-500 cursor-pointer"
                            }
                        `}
                    >
                        {added ? (
                            <>✓ Add to cart</>
                        ) : (
                            <>
                                <FaShoppingCart />
                                Add To Cart — {(product.price * quantity).toLocaleString()} DA
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}