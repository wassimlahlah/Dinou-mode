import { useState } from "react";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import { products as initialProducts } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DashboardProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Dresses",
    image: "",
  });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", price: "", category: "Dresses", image: "" });
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Please fill all fields");
      return;
    }

    if (editing) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? { ...p, ...form, price: Number(form.price) }
            : p
        )
      );
      toast.success("Product updated");
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        secondImage: form.image,
      };
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product added");
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-serif">Products</h1>
          <button
            onClick={openAdd}
            className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-pink-200 hover:text-black transition"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={product.image}
                        className="w-12 h-12 rounded-xl object-cover"
                        alt={product.name}
                      />
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-pink-50 rounded-full text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 font-bold">{product.price.toLocaleString()} DA</td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editing ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <input
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <input
                  type="number"
                  placeholder="Price (DA)"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                >
                  <option>Dresses</option>
                  <option>New Collection</option>
                  <option>Best Seller</option>
                  <option>Trending</option>
                  <option>Abayas</option>
                  <option>Hijabs</option>
                </select>
                <input
                  placeholder="Image URL"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full hover:bg-pink-200 hover:text-black transition font-medium"
                >
                  {editing ? "Update Product" : "Add Product"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}