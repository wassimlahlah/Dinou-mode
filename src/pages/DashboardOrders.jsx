import { useState } from "react";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import { motion } from "framer-motion";
import { FaSearch, FaEye } from "react-icons/fa";

const initialOrders = [
  { id: "#ORD-001", customer: "Amina B.", email: "amina@email.com", items: 2, total: 18500, status: "Delivered", date: "2026-07-28", address: "Rue Mohamed Belarbi 624 B" },
  { id: "#ORD-002", customer: "Sara K.", email: "sara@email.com", items: 1, total: 9500, status: "Processing", date: "2026-07-29", address: "Algiers Center" },
  { id: "#ORD-003", customer: "Laila M.", email: "laila@email.com", items: 3, total: 24000, status: "Pending", date: "2026-07-29", address: "Oran, Algeria" },
  { id: "#ORD-004", customer: "Nadia R.", email: "nadia@email.com", items: 1, total: 12000, status: "Shipped", date: "2026-07-27", address: "Constantine" },
  { id: "#ORD-005", customer: "Fatima Z.", email: "fatima@email.com", items: 1, total: 7000, status: "Delivered", date: "2026-07-26", address: "Blida" },
  { id: "#ORD-006", customer: "Yasmine D.", email: "yasmine@email.com", items: 2, total: 21000, status: "Cancelled", date: "2026-07-25", address: "Annaba" },
];

const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-purple-100 text-purple-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function DashboardOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter((o) => {
    const matchesSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === "All" || o.status === filter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-serif mb-8">Orders</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium">{order.id}</td>
                  <td className="py-4">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </td>
                  <td className="py-4 text-gray-500">{order.date}</td>
                  <td className="py-4">{order.items}</td>
                  <td className="py-4 font-bold">{order.total.toLocaleString()} DA</td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[order.status]}`}
                    >
                      {statusOptions.slice(1).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                    >
                      <FaEye />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 w-full max-w-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Order Details</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-gray-400">Order ID:</span> {selectedOrder.id}
                </p>
                <p>
                  <span className="text-gray-400">Customer:</span> {selectedOrder.customer}
                </p>
                <p>
                  <span className="text-gray-400">Email:</span> {selectedOrder.email}
                </p>
                <p>
                  <span className="text-gray-400">Address:</span> {selectedOrder.address}
                </p>
                <p>
                  <span className="text-gray-400">Date:</span> {selectedOrder.date}
                </p>
                <p>
                  <span className="text-gray-400">Items:</span> {selectedOrder.items}
                </p>
                <p>
                  <span className="text-gray-400">Total:</span>{" "}
                  <span className="font-bold text-lg">{selectedOrder.total.toLocaleString()} DA</span>
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-6 w-full bg-black text-white py-3 rounded-full hover:bg-pink-200 hover:text-black transition"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}