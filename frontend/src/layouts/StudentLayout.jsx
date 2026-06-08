import { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";

function StudentLayout({ children }) {

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
                <StudentSidebar />
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
                                Student Portal
                            </h4>

                            <small className="text-muted">
                                Student Registration System
                            </small>

                        </div>

                        <span
                            className="
                                badge
                                bg-primary
                                fs-6
                            "
                        >
                            Student
                        </span>

                    </div>

                </div>

                {children}

            </div>

        </div>

    );

}

export default StudentLayout;