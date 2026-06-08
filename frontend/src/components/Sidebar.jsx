import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location =
        useLocation();

    const menuItems = [

        {
            name: "Dashboard",
            path: "/admin",
            icon: "📊"
        },

        {
            name: "Students",
            path: "/admin/students",
            icon: "🎓"
        },

        {
            name: "Staff",
            path: "/admin/staff",
            icon: "👨‍🏫"
        },

        {
            name: "Departments",
            path: "/admin/departments",
            icon: "🏢"
        },

        {
            name: "Programs",
            path: "/admin/programs",
            icon: "📚"
        },
        {
            name: "Course Explorer",
            path: "/admin/courseexplorer",
            icon: "🎯"
        },

        {
            name: "Courses",
            path: "/admin/courses",
            icon: "📖"
        },

        {
            name: "Semesters",
            path: "/admin/semesters",
            icon: "📅"
        },

        {
            name: "Course Offerings",
            path: "/admin/course-offerings",
            icon: "📝"
        },

        {
            name: "Enrollments",
            path: "/admin/enrollments",
            icon: "✅"
        },

        {
            name: "Grades",
            path: "/admin/grades",
            icon: "🏆"
        },

        {
            name: "Reports & Analytics",
            path: "/admin/analytics",
            icon: "📈"
        },
        {
            name: "Reports",
            path: "/admin/reports",
            icon: "📊"
        }


    ];

    return (

        <div

            className="shadow-lg"

            style={{

                width: "260px",

                height: "100vh",

                overflowY: "auto",

                background:
                    "linear-gradient(180deg,#4F46E5,#4338CA)",

                

            }}

        >

            <div className="p-4 text-white">

                <h3 className="fw-bold">

                    🎓 EduAdmin

                </h3>

                <small>

                    Student Registration ERP

                </small>

            </div>

            <hr className="text-white" />

            <div

                className="d-flex flex-column"

                style={{

                    minHeight:
                        "calc(100vh - 120px)"

                }}

            >

                <div

                    className="px-3 flex-grow-1"

                >

                    {

                        menuItems.map(

                            (
                                item
                            ) => (

                                <Link

                                    key={
                                        item.path
                                    }

                                    to={
                                        item.path
                                    }

                                    className="d-flex align-items-center text-decoration-none mb-2"

                                    style={{

                                        background:

                                            location.pathname === item.path

                                                ? "rgba(255,255,255,0.2)"

                                                : "transparent",

                                        color:
                                            "#fff",

                                        padding:
                                            "12px",

                                        borderRadius:
                                            "12px",

                                        transition:
                                            "all .3s ease"

                                    }}

                                >

                                    <span
                                        className="me-3"
                                    >

                                        {
                                            item.icon
                                        }

                                    </span>

                                    {
                                        item.name
                                    }

                                </Link>

                            )

                        )

                    }

                </div>

                <div className="p-3">

                    <div

                        className="text-white p-3 mb-3"

                        style={{

                            background:
                                "rgba(255,255,255,0.15)",

                            borderRadius:
                                "12px"

                        }}

                    >

                        <div className="fw-bold">

                            👤 Administrator

                        </div>

                        <small>

                            admin@school.com

                        </small>

                    </div>

                    <button

                        className="btn btn-light w-100"

                        onClick={() => {

                            localStorage.clear();

                            window.location.href =
                                "/login";

                        }}

                    >

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Sidebar;