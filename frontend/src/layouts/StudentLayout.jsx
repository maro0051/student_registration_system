import StudentSidebar from "../components/StudentSidebar";

function StudentLayout({

    children

}) {

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                background: "#f8fafc"
            }}
        >

            <StudentSidebar />

            <div
                className="flex-grow-1 p-4"
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

                                Student Portal

                            </h4>

                            <small className="text-muted">

                                Student Registration System

                            </small>

                        </div>

                        <div>

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

                </div>

                {children}

            </div>

        </div>

    );

}

export default StudentLayout;