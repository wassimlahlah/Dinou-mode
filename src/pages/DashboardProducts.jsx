import { useState } from "react";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import { products as initialProducts } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaImage, FaPalette } from "react-icons/fa";
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
    colors: [],
  });

  // Color modal state
  const [showColorModal, setShowColorModal] = useState(false);
  const [editingColorIndex, setEditingColorIndex] = useState(null);
  const [colorForm, setColorForm] = useState({
    color: "",
    image: "",
    sizes: [],
  });
  const [sizeInput, setSizeInput] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", price: "", category: "Dresses", colors: [] });
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      colors: product.colors || [],
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.colors.length === 0) {
      toast.error("Please add at least one color");
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

  // Color management
  const openAddColor = () => {
    setEditingColorIndex(null);
    setColorForm({ color: "", image: "", sizes: [] });
    setSizeInput("");
    setShowColorModal(true);
  };

  const openEditColor = (index) => {
    setEditingColorIndex(index);
    setColorForm({ ...form.colors[index] });
    setSizeInput(form.colors[index].sizes.join(", "));
    setShowColorModal(true);
  };

  const saveColor = () => {
    if (!colorForm.color || !colorForm.image) {
      toast.error("Color name and image are required");
      return;
    }
    const newColor = {
      ...colorForm,
      sizes: sizeInput.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (editingColorIndex !== null) {
      const updated = [...form.colors];
      updated[editingColorIndex] = newColor;
      setForm({ ...form, colors: updated });
    } else {
      setForm({ ...form, colors: [...form.colors, newColor] });
    }
    setShowColorModal(false);
  };

  const deleteColor = (index) => {
    setForm({ ...form, colors: form.colors.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex min-h-screen bg-pink-50 mt-4">
      <DashboardSidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-x-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-serif">Products</h1>
          <button
            onClick={openAdd}
            className="bg-black text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full flex items-center gap-2 hover:bg-pink-200 hover:text-black transition text-sm md:text-base w-full sm:w-auto justify-center"
          >
            <FaPlus size={14} /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-4 md:p-6">
          <div className="relative mb-4 md:mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-3 md:p-4 pl-11 md:pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm md:text-base"
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Colors</th>
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
                        src={product.colors?.[0]?.image || product.image}
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
                    <td className="py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {product.colors?.map((c, i) => (
                          <div key={i} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                            <img src={c.image} className="w-5 h-5 rounded-full object-cover border" alt={c.color} />
                            <span className="text-xs text-gray-600">{c.color}</span>
                          </div>
                        )) || <span className="text-xs text-gray-400">No colors</span>}
                      </div>
                    </td>
                    <td className="py-4 font-bold">{product.price.toLocaleString()} DA</td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition mr-1"
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.colors?.[0]?.image || product.image}
                    className="w-14 h-14 rounded-xl object-cover"
                    alt={product.name}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{product.name}</h3>
                    <span className="px-2 py-0.5 bg-pink-50 rounded-full text-xs text-gray-600 inline-block mt-1">
                      {product.category}
                    </span>
                  </div>
                  <span className="font-bold text-sm">{product.price.toLocaleString()} DA</span>
                </div>
                
                <div className="flex gap-1.5 flex-wrap">
                  {product.colors?.map((c, i) => (
                    <div key={i} className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border">
                      <img src={c.image} className="w-5 h-5 rounded-full object-cover" alt={c.color} />
                      <span className="text-xs text-gray-600">{c.color}</span>
                      <span className="text-[10px] text-gray-400">({c.sizes.join(", ")})</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 py-2.5 text-blue-500 bg-blue-50 rounded-xl text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FaEdit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 py-2.5 text-red-500 bg-red-50 rounded-xl text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FaTrash size={12} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Main Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-5 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {editing ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <FaTimes />
                </button>
              </div>
              
              {/* Mobile drag handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

              <form onSubmit={handleSave} className="space-y-3 sm:space-y-4">
                <input
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border p-3.5 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Price (DA)"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border p-3.5 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border p-3.5 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-sm sm:text-base"
                >
                  <option>Dresses</option>
                  <option>New Collection</option>
                  <option>Best Seller</option>
                  <option>Trending</option>
                  <option>Abayas</option>
                  <option>Hijabs</option>
                </select>

                {/* Colors Section */}
                <div className="border rounded-xl p-3 sm:p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <FaPalette className="text-pink-400" /> Colors & Sizes
                    </h3>
                    <button
                      type="button"
                      onClick={openAddColor}
                      className="text-xs sm:text-sm bg-black text-white px-3 py-1.5 rounded-full hover:bg-pink-200 hover:text-black transition flex items-center gap-1"
                    >
                      <FaPlus size={10} /> Add
                    </button>
                  </div>
                  {form.colors.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-3">No colors added yet</p>
                  )}
                  <div className="space-y-2">
                    {form.colors.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 p-2.5 sm:p-3 rounded-xl">
                        <img src={c.image} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt={c.color} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{c.color}</p>
                          <p className="text-xs text-gray-400 truncate">{c.sizes.join(", ")}</p>
                        </div>
                        <button type="button" onClick={() => openEditColor(i)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                          <FaEdit size={14} />
                        </button>
                        <button type="button" onClick={() => deleteColor(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3.5 sm:py-4 rounded-full hover:bg-pink-200 hover:text-black transition font-medium text-sm sm:text-base mt-2"
                >
                  {editing ? "Update Product" : "Add Product"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color Modal */}
      <AnimatePresence>
        {showColorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowColorModal(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 w-full max-w-sm"
            >
              <div className="flex justify-between items-center mb-5 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold">
                  {editingColorIndex !== null ? "Edit Color" : "Add Color"}
                </h2>
                <button onClick={() => setShowColorModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <FaTimes />
                </button>
              </div>

              {/* Mobile drag handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

              <div className="space-y-3 sm:space-y-4">
                <input
                  placeholder="Color name (e.g. Red, Black...)"
                  value={colorForm.color}
                  onChange={(e) => setColorForm({ ...colorForm, color: e.target.value })}
                  className="w-full border p-3.5 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
                />
                <div className="relative">
                  <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    placeholder="Image URL for this color"
                    value={colorForm.image}
                    onChange={(e) => setColorForm({ ...colorForm, image: e.target.value })}
                    className="w-full border p-3.5 sm:p-4 pl-11 sm:pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
                  />
                </div>
                {colorForm.image && (
                  <img src={colorForm.image} className="w-full h-32 sm:h-40 object-cover rounded-xl" alt="Preview" />
                )}
                <input
                  placeholder="Sizes: S, M, L, XL"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  className="w-full border p-3.5 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={saveColor}
                  className="w-full bg-black text-white py-3.5 sm:py-4 rounded-full hover:bg-pink-200 hover:text-black transition font-medium text-sm sm:text-base"
                >
                  {editingColorIndex !== null ? "Update Color" : "Add Color"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}