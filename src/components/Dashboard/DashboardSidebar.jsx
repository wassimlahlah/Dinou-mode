import {
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function DashboardSidebar() {
    const navigate = useNavigate();

    const items = [
        { name: "Overview", icon: <FaChartBar />, link: "/dashboard" },
        { name: "Products", icon: <FaBox />, link: "/dashboard/products" },
        { name: "Orders", icon: <FaShoppingBag />, link: "/dashboard/orders" },
        { name: "Customers", icon: <FaUsers />, link: "/dashboard/customers" },
        { name: "Settings", icon: <FaCog />, link: "/dashboard/settings" },
    ];

    return (
        <aside className="w-64 bg-black text-white min-h-screen p-6 flex flex-col">
            <h1 className="text-3xl font-serif mb-10">Dinou Admin</h1>

            <nav className="space-y-2 flex-1">
                {items.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.link}
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-xl transition cursor-pointer ${
                                isActive
                                    ? "bg-pink-300 text-black"
                                    : "hover:bg-pink-300 hover:text-black"
                            }`
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-500 hover:text-white transition mt-auto"
            >
                <FaSignOutAlt />
                Exit Dashboard
            </button>
        </aside>
    );
}