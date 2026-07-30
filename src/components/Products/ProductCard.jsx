// ============ ProductCard.jsx ============
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer"
        >
            <Link to={`/product/${product.id}`} className="block">
                
                {/* الصورة */}
                <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 mb-2 md:mb-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                    />
                    
                    {/* Overlay خفيف على hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                    {/* Badge الخصم */}
                    {product.oldPrice && (
                        <span className="absolute top-2 md:top-4 left-2 md:left-4 bg-red-500 text-white text-[9px] md:text-[11px] font-bold tracking-wider px-2 md:px-3 py-1 md:py-1.5 rounded-full uppercase">
                            {discount}% Off
                        </span>
                    )}
                </div>

                {/* المعلومات */}
                <div className="space-y-0.5 md:space-y-1.5 px-0.5 md:px-1">
                    <h3 className="text-[13px] md:text-[15px] font-medium text-gray-900 leading-snug group-hover:text-gray-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 md:gap-2.5 flex-wrap">
                        <span className="text-sm md:text-base font-semibold text-pink-500">
                            {product.price.toLocaleString()} DA
                        </span>
                        
                        {product.oldPrice && (
                            <span className="text-[11px] md:text-sm text-gray-400 line-through">
                                {product.oldPrice.toLocaleString()} DA
                            </span>
                        )}
                    </div>
                </div>

            </Link>
        </motion.div>
    );
}