import { useState } from "react";
import StaffSidebar from "../components/StaffSidebar";

function StaffLayout({ children }) {

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
                <StaffSidebar />
            </div>

            <div className="main-content">

                <div
                    className="
                        bg-white
                        rounded
                        shadow-sm
                        p-3
                        mb-4
                    "
                >

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h4 className="mb-0">
                                Staff Portal
                            </h4>

                            <small className="text-muted">
                                Student Registration System
                            </small>

                        </div>

                        <span
                            className="
                                badge
                                bg-success
                                fs-6
                            "
                        >
                            Staff
                        </span>

                    </div>

                </div>

                {children}

            </div>

        </div>

    );

}

export default StaffLayout;