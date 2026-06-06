import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({
    children
}) {

    return (

        <div className="d-flex">

            <Sidebar />

            <div
                className="flex-grow-1"
                style={{
                    marginLeft: "260px",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <div className="p-4">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;