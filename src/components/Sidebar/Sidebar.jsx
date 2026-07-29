import {
    FaHome,
    FaShoppingBag,
    FaTshirt,
    FaFire,
    FaShoppingCart,
    FaPhone,
    FaUserShield,
    FaInfoCircle,
    FaBars,
    FaTimes
} from "react-icons/fa";

import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";



export default function Sidebar() {

    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;


    const items = [
        { title: "Home", icon: <FaHome />, link: "/" },
        { title: "Shop", icon: <FaShoppingBag />, link: "/shop" },
        { title: "Categories", icon: <FaTshirt />, link: "/categories" },
        { title: "Offers", icon: <FaFire />, link: "/offers" },
        { title: "Cart", icon: <FaShoppingCart />, link: "/cart" },
        { title: "About", icon: <FaInfoCircle />, link: "/about" },
    ];



    return (
        <>

            {/* ===== MOBILE TOGGLE BUTTON ===== */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-3 bg-[#F7D6DF] rounded-full shadow-lg text-black hover:bg-pink-200 transition-colors"
            >
                {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>



            {/* ===== SIDEBAR ===== */}
            <aside
                className={`
                    fixed md:sticky top-0 left-0 z-40
                    w-72 bg-[#F7D6DF] min-h-screen h-screen
                    p-6 flex-col
                    overflow-y-auto
                    transition-transform duration-300 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >



                {/* ===== LUXURY LOGO ===== */}
                <div className="flex flex-col items-center mb-12 select-none">

                    <Link to="/" className="group cursor-pointer">
                        <h1 className="text-3xl font-bold font-semibold tracking-[0.10em] text-black">
                            Dinou<span className="text-pink-500"> Moda</span>
                        </h1>
                    </Link>

                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-10 h-[1px] bg-black/60"></div>
                        <p className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-medium">
                            Fashion
                        </p>
                        <div className="w-10 h-[1px] bg-black/60"></div>
                    </div>

                </div>




                {/* ===== MENU ===== */}
                <nav className="flex-1 space-y-1">

                    {items.map((item) => (
                        <SidebarItem
                            key={item.title}
                            {...item}
                            isActive={currentPath === item.link}
                        />
                    ))}

                </nav>




                {/* ===== ADMIN (en bas) ===== */}
                <div className="mt-2 pt-6 border-t border-black/10">
                    <SidebarItem
                        title="Admin Login"
                        icon={<FaUserShield />}
                        link="/admin"
                        isActive={currentPath === "/admin"}
                    />
                </div>



            </aside>



            {/* ===== MOBILE OVERLAY ===== */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}



        </>
    );

}