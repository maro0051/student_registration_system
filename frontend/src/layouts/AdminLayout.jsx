import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-layout">

            <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`sidebar-wrapper ${
                    sidebarOpen ? "open" : ""
                }`}
            >
                <Sidebar />
            </div>

            <div className="main-content">
                <Navbar />

                <main className="dashboard-content">
                    {children}
                </main>
            </div>

        </div>
    );
}

export default AdminLayout;