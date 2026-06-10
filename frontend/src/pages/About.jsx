import PublicNavbar from "../components/PublicNavbar";

function About() {


return (

    <>
        <PublicNavbar />

        <div className="page-container">

            <h1>
                About Our Institution
            </h1>

            <p>
                Our Student Registration
                System supports academic
                excellence by providing a
                centralized platform for
                managing students,
                programs, courses,
                attendance and grades.
            </p>

            <h2>
                Academic Departments
            </h2>

            <div className="info-grid">

                <div className="info-card">
                    Information Technology
                </div>

                <div className="info-card">
                    Business Administration
                </div>

                <div className="info-card">
                    Health Sciences
                </div>

                <div className="info-card">
                    Engineering
                </div>

            </div>

        </div>

    </>
);


}

export default About;
