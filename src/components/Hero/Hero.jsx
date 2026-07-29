import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

export default function Hero() {
    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1483985988355-763728e1935b)",
            }}
        >
            <div className="absolute inset-0 bg-black/40" />

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative text-white ml-10 md:ml-20 max-w-2xl"
            >
                <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight">
                    New
                    <br />
                    Collection
                </h1>
                <p className="mt-5 text-xl md:text-2xl font-light">
                    Elegance and confidence in every piece
                </p>
                <Link to="/shop">
                    <button className="mt-8 bg-[#F7D6DF] text-black/70 px-10 py-4 rounded-full hover:bg-pink-500 transition font-semibold cursor-pointer">
                        Shop Now
                    </button>
                </Link>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
            >
                <FaChevronDown size={24} />
            </motion.div>
        </section>
    );
}