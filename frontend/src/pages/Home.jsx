import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import "./LandingPage.css";

function Home() {


return (

    <>

        <PublicNavbar />

        <div className="landing">

            {/* HERO */}

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-text">

                        <h1>
                            Modern Student Registration &
                            Academic Management Platform
                        </h1>

                        <p>
                            A complete academic management
                            solution designed to simplify
                            student registration, attendance,
                            grading, transcripts and course
                            administration.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/login"
                                className="primary-btn"
                            >
                                Access Portal
                            </Link>

                            <Link
                                to="/about"
                                className="secondary-btn"
                            >
                                Learn More
                            </Link>

                        </div>

                        <div className="hero-stats">

                            <div className="hero-stat">

                                <h3>500+</h3>

                                <p>Students</p>

                            </div>

                            <div className="hero-stat">

                                <h3>50+</h3>

                                <p>Courses</p>

                            </div>

                            <div className="hero-stat">

                                <h3>20+</h3>

                                <p>Staff</p>

                            </div>

                            <div className="hero-stat">

                                <h3>100%</h3>

                                <p>Digital</p>

                            </div>

                        </div>

                    </div>

                    <div className="hero-image">

                        <img
                            src="/images/admin-dashboard.png"
                            alt="Admin Dashboard"
                        />

                    </div>

                </div>

            </section>

            {/* FEATURES */}

            <section className="features">

                <h2>
                    Everything You Need
                </h2>

                <div className="feature-grid">

                    <div className="feature-card">

                        <h3>
                            📚 Course Registration
                        </h3>

                        <p>
                            Register and manage courses
                            with ease.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            👨‍🎓 Student Portal
                        </h3>

                        <p>
                            View timetable, grades,
                            transcripts and attendance.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            👨‍🏫 Staff Portal
                        </h3>

                        <p>
                            Manage attendance, grades
                            and academic records.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            📊 Attendance Tracking
                        </h3>

                        <p>
                            Real-time attendance
                            management and reporting.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            📝 Grade Management
                        </h3>

                        <p>
                            Enter, update and monitor
                            student performance.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            📄 Transcript Generation
                        </h3>

                        <p>
                            Generate professional
                            academic transcripts.
                        </p>

                    </div>

                </div>

            </section>

            {/* PORTALS */}

            <section className="showcase">

                <h2>
                    Platform Portals
                </h2>

                <div className="preview-grid">

                    <div className="preview-card">

                        <img
                            src="/images/admin-dashboard.png"
                            alt="Admin Dashboard"
                        />

                        <h3>
                            Admin Portal
                        </h3>

                    </div>

                    <div className="preview-card">

                        <img
                            src="/images/student-dashboard.png"
                            alt="Student Dashboard"
                        />

                        <h3>
                            Student Portal
                        </h3>

                    </div>

                    <div className="preview-card">

                        <img
                            src="/images/staff-dashboard.png"
                            alt="Staff Dashboard"
                        />

                        <h3>
                            Staff Portal
                        </h3>

                    </div>

                </div>

            </section>

            {/* WHY CHOOSE US */}

            <section className="features">

                <h2>
                    Why Choose Our Platform?
                </h2>

                <div className="feature-grid">

                    <div className="feature-card">

                        <h3>
                            🔒 Secure Access
                        </h3>

                        <p>
                            JWT authentication and
                            role-based authorization.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            ⚡ Fast Performance
                        </h3>

                        <p>
                            Built with React, Django
                            and PostgreSQL.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            📱 Mobile Friendly
                        </h3>

                        <p>
                            Responsive design for all
                            devices and screen sizes.
                        </p>

                    </div>

                </div>

            </section>

            {/* TECHNOLOGY */}

            <section className="tech-stack">

                <h2>
                    Technology Stack
                </h2>

                <div className="tech-grid">

                    <span>React</span>

                    <span>Django REST</span>

                    <span>PostgreSQL</span>

                    <span>JWT</span>

                    <span>Render</span>

                    <span>Netlify</span>

                </div>

            </section>

            {/* CTA */}

            <section className="cta">

                <h2>
                    Ready To Explore?
                </h2>

                <p>
                    Access the Student Registration
                    System and manage academics from
                    anywhere.
                </p>

                <Link
                    to="/login"
                    className="primary-btn"
                >
                    Login Now
                </Link>

            </section>

            {/* FOOTER */}

            <footer className="footer">

                <p>
                    © 2026 Student Registration System
                </p>

            </footer>

        </div>

    </>

);


}

export default Home;
