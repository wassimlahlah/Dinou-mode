import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import MobileNavbar from "../Navbar/MobileNavbar";

export default function MainLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return (
        <div className="min-h-screen bg-gray-50">
            <MobileNavbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-16 md:pt-0 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}