import { Link } from "react-router-dom";

function PublicNavbar() {
return ( <nav className="navbar">


        <div className="logo">
            🎓 Student Registration System
        </div>

        <div className="nav-links">

            <Link to="/">Home</Link>

            <Link to="/about">
                About
            </Link>
            <Link to="/programs">
                Programs
            </Link>

            <Link to="/catalog">
                Course Catalog
            </Link>

            <Link to="/admissions">
                Admissions
            </Link>

            <Link to="/contact">
                Contact
            </Link>

            <Link
                to="/login"
                className="login-btn"
            >
                Login
            </Link>

        </div>

    </nav>
);


}

export default PublicNavbar;
