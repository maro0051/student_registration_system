import { Link, useLocation } from "react-router-dom";

function StaffSidebar() {

    const location =
        useLocation();

    return (

        <div

            className="
                bg-dark
                text-white
                p-3
                shadow-lg
            "

            style={{
                width: "280px",
                minHeight: "100vh",
                overflow: "auto"
            }}

        >

            <div className="text-center mb-4">

                <h4>

                    Staff Portal

                </h4>

                <small>

                    Instructor Panel

                </small>

            </div>

            <hr />

            <ul className="nav flex-column">

                <li className="nav-item mb-2">

                    <Link

                        to="/staff/staffdashboard"

                        className={`
                            nav-link
                            text-white
                            ${
                                location.pathname ===
                                "/staff/staffdashboard"

                                ?

                                "bg-primary rounded"

                                :

                                ""

                            }
                        `}

                    >

                        📊 Dashboard

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/staff/staffprofile"

                        className={`
                            nav-link
                            text-white
                            ${
                                location.pathname ===
                                "/staff/staffprofile"

                                ?

                                "bg-primary rounded"

                                :

                                ""

                            }
                        `}

                    >

                        👤 My Profile

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/staff/myclasses"

                        className={`
                            nav-link
                            text-white
                            ${
                                location.pathname ===
                                "/staff/myclasses"

                                ?

                                "bg-primary rounded"

                                :

                                ""

                            }
                        `}

                    >

                        📚 My Classes

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/staff/stafftimetable"

                        className={`
                            nav-link
                            text-white
                            ${
                                location.pathname ===
                                    "/staff/stafftimetable"
                                

                                ?

                                "bg-primary rounded"

                                :

                                ""

                            }
                        `}

                    >

                        📝 Timetable

                    </Link>

                </li>

                <li className="nav-item mt-4">

                    <Link

                        to="/login"

                        className="
                            btn
                            btn-danger
                            w-100
                        "

                    >

                        🚪 Logout

                    </Link>

                </li>

            </ul>

        </div>

    );

}

export default StaffSidebar;