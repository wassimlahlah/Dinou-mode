import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../../data/products";

export default function Categories() {
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const categories = uniqueCategories.map((cat) => {
    const firstProduct = products.find((p) => p.category === cat);
    return {
      name: cat,
      image: firstProduct?.image || "",
      count: products.filter((p) => p.category === cat).length,
    };
  });

  return (
    <section className="py-20 bg-pink-50">
      <h2 className="text-center text-5xl font-serif mb-12">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-10 max-w-7xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative h-60 rounded-3xl overflow-hidden shadow-md flex items-center justify-center block"
            >
              <img
                src={cat.image}
                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
              <div className="relative z-10 text-center">
                <span className="text-2xl font-semibold text-white block">
                  {cat.name}
                </span>
                <span className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition">
                  {cat.count} products
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}