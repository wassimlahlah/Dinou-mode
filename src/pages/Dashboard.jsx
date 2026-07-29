import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import { products } from "../data/products";
import { motion } from "framer-motion";
import { FaBox, FaShoppingBag, FaUsers, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";

const mockOrders = [
  { id: "#ORD-001", customer: "Amina B.", total: 18500, status: "Delivered", date: "2026-07-28" },
  { id: "#ORD-002", customer: "Sara K.", total: 9500, status: "Processing", date: "2026-07-29" },
  { id: "#ORD-003", customer: "Laila M.", total: 24000, status: "Pending", date: "2026-07-29" },
  { id: "#ORD-004", customer: "Nadia R.", total: 12000, status: "Shipped", date: "2026-07-27" },
  { id: "#ORD-005", customer: "Fatima Z.", total: 7000, status: "Delivered", date: "2026-07-26" },
];

const mockCustomers = [
  { name: "Amina B.", orders: 3, spent: 45000 },
  { name: "Sara K.", orders: 2, spent: 28000 },
  { name: "Laila M.", orders: 5, spent: 62000 },
  { name: "Nadia R.", orders: 1, spent: 12000 },
];

const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);

const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-purple-100 text-purple-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-serif mb-8">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard title="Products" number={products.length} icon={<FaBox />} trend="+2" trendUp />
          <StatCard title="Orders" number={mockOrders.length} icon={<FaShoppingBag />} trend="+5" trendUp />
          <StatCard title="Customers" number={mockCustomers.length} icon={<FaUsers />} trend="+1" trendUp />
          <StatCard title="Revenue" number={`${(totalRevenue / 1000).toFixed(1)}K DA`} icon={<FaDollarSign />} trend="+12%" trendUp />
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <button className="text-sm text-pink-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-4 font-medium">{order.id}</td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4 text-gray-500">{order.date}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-bold">{order.total.toLocaleString()} DA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-6">Top Customers</h2>
            <div className="space-y-5">
              {mockCustomers.map((customer, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-xs text-gray-400">{customer.orders} orders</p>
                  </div>
                  <p className="font-bold text-sm">{customer.spent.toLocaleString()} DA</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Revenue Chart (Simple Bars) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-3xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold mb-6">Weekly Revenue</h2>
          <div className="flex items-end gap-4 h-48">
            {[
              { day: "Mon", value: 40 },
              { day: "Tue", value: 65 },
              { day: "Wed", value: 45 },
              { day: "Thu", value: 80 },
              { day: "Fri", value: 55 },
              { day: "Sat", value: 90 },
              { day: "Sun", value: 70 },
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-black rounded-t-xl transition-all hover:bg-pink-300 relative group"
                  style={{ height: `${bar.value}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {bar.value * 300} DA
                  </div>
                </div>
                <span className="text-xs text-gray-500">{bar.day}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ title, number, icon, trend, trendUp }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-pink-50 rounded-2xl text-pink-600 text-xl">{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-bold ${trendUp ? "text-green-500" : "text-red-500"}`}>
          {trendUp ? <FaArrowUp /> : <FaArrowDown />}
          {trend}
        </div>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-1">{number}</p>
    </motion.div>
  );
}