import { Link, useLocation } from "react-router-dom";

function StudentSidebar() {


const location =
    useLocation();

const logout = () => {

    localStorage.removeItem(
        "access"
    );

    localStorage.removeItem(
        "refresh"
    );

    window.location.href =
        "/login";

};

return (

    <div

        className="bg-dark text-white d-flex flex-column"

        style={{
            width: "280px",
            minHeight: "100vh",
            background:
                "linear-gradient(1380deg, #1e293b, #0f172a)"
        }}

    >

        <div className="text-center p-4 border-bottom">

            <div

                className="rounded-circle bg-secondary mx-auto mb-3 d-flex align-items-center justify-content-center"

                style={{
                    width: "200px",
                    minHeight: "90px",
                    background:
                        "linear-gradient(1380deg, #1e293b, #0f172a)"
                    
                }}

            >

                👤

            </div>

            <h5 className="mb-1">

                Student Portal

            </h5>

            <small className="text-light">

                Academic Management

            </small>

        </div>

        <div className="p-3">

            <ul className="nav flex-column">

                <li className="nav-item mb-2">

                    <Link

                        to="/student/studentdashboard"

                        className={`nav-link text-white rounded ${
                            location.pathname ===
                            "/student/studentdashboard"

                                ? "bg-primary"

                                : ""
                        }`}

                    >

                        📊 Dashboard

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/student/profile"

                        className={`nav-link text-white rounded ${
                            location.pathname ===
                            "/student/profile"

                                ? "bg-primary"

                                : ""
                        }`}

                    >

                        👤 My Profile

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/student/timetable"

                        className={`nav-link text-white rounded ${
                            location.pathname ===
                            "/student/timetable"

                                ? "bg-primary"

                                : ""
                        }`}

                    >

                        🗓️ Timetable

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/student/register-course"

                        className={`nav-link text-white rounded ${
                            location.pathname ===
                            "/student/register-course"

                                ? "bg-primary"

                                : ""
                        }`}

                    >

                        📚 Register Course

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/student/results"

                        className={`nav-link text-white rounded ${
                            location.pathname ===
                            "/student/results"

                                ? "bg-primary"

                                : ""
                        }`}

                    >

                        📝 Results

                    </Link>

                </li>

                <li className="nav-item mb-2">

                    <Link

                        to="/student/transcript"

                        className={`nav-link text-white rounded ${
                            location.pathname ===
                            "/student/transcript"

                                ? "bg-primary"

                                : ""
                        }`}

                    >

                        🎓 Transcript

                    </Link>

                </li>
               <li className="nav-item mb-2">

    <Link

        to="/student/studentattendance"

        className={`

            nav-link

            text-white

            ${

                location.pathname ===
                "/student/studentattendance"

                ?

                "bg-primary rounded"

                :

                ""

            }

        `}

    >

        📅 Attendance

    </Link>

</li>

            </ul>

        </div>

        <div className="mt-auto p-3">

            <button

                className="btn btn-danger w-100"

                onClick={logout}

            >

                Logout

            </button>

        </div>

    </div>

);


}

export default StudentSidebar;
