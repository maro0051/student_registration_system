import Navbar from "../components/Navbar";
import StaffSidebar from "../components/StaffSidebar";

function StaffLayout({

    children

}) {

    return (

        <div

            className="d-flex"

            style={{
                minHeight: "100vh",
                background:
                    "#f8fafc"
            }}

        >

            <StaffSidebar />

            <div

                className="
                    flex-grow-1
                    p-4
                "

            >

                <div

                    className="
                        bg-white
                        rounded
                        shadow-sm
                        p-3
                        mb-4
                    "

                >

                    <div className="d-flex justify-content-between">

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

