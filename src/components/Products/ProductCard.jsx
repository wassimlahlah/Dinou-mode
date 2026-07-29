import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer"
        >
            <Link to={`/product/${product.id}`} className="block">
                
                {/* الصورة */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4">
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
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase">
                             {discount}% Off
                        </span>
                    )}
                </div>

                {/* المعلومات */}
                <div className="space-y-1.5 px-1">
                    <h3 className="text-[15px] font-medium text-gray-900 leading-snug group-hover:text-gray-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2.5">
                        <span className="text-base font-semibold text-green-500">
                            {product.price.toLocaleString()} DA
                        </span>
                        
                        {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {product.oldPrice.toLocaleString()} DA
                            </span>
                        )}
                    </div>
                </div>

            </Link>
        </motion.div>
    );
}