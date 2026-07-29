import { motion } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "../components/Products/ProductCard";

export default function Offers() {
    // غير اللي عندهم oldPrice (خصم) يبانو
    const offers = products.filter((product) => product.oldPrice);

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-6xl font-serif mb-4">Special Offers</h1>
                <p className="text-gray-500 mb-12 text-lg">
                    Discover our exclusive deals
                </p>
            </motion.div>

            {offers.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-xl">
                    No offers available right now
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {offers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}