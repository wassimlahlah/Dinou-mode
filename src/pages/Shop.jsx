import { products } from "../data/products";
import ProductCard from "../components/Products/ProductCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const category = searchParams.get("category") || "";

  let filtered = products.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = !category || product.category === category;
    return searchMatch && categoryMatch;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-serif mb-10"
      >
        {category || "Shop"}
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search products..."
            className="border p-4 pl-12 rounded-full w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-300"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-xl">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}