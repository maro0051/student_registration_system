import PublicNavbar from "../components/PublicNavbar";

function ProgramsPage() {


const programs = [

    {
        name: "Computer Science",
        department: "Information Technology",
        courses: 12
    },
    {
        name: "Information Technology",
        department: "Information Technology",
        courses: 10
    },
    {
        name: "Cybersecurity",
        department: "Information Technology",
        courses: 9
    },
    {
        name: "Software Engineering",
        department: "Information Technology",
        courses: 11
    },
    {
        name: "Data Science",
        department: "Information Technology",
        courses: 8
    },
    {
        name: "Artificial Intelligence",
        department: "Information Technology",
        courses: 8
    },
    {
        name: "Business Administration",
        department: "Business",
        courses: 10
    },
    {
        name: "Accounting",
        department: "Business",
        courses: 9
    },
    {
        name: "Finance",
        department: "Business",
        courses: 8
    },
    {
        name: "Marketing",
        department: "Business",
        courses: 7
    },
    {
        name: "Human Resources",
        department: "Business",
        courses: 6
    },
    {
        name: "Project Management",
        department: "Business",
        courses: 8
    },
    {
        name: "Mechanical Engineering",
        department: "Engineering",
        courses: 12
    },
    {
        name: "Civil Engineering",
        department: "Engineering",
        courses: 11
    },
    {
        name: "Electrical Engineering",
        department: "Engineering",
        courses: 10
    },
    {
        name: "Health Sciences",
        department: "Health Sciences",
        courses: 9
    },
    {
        name: "Nursing",
        department: "Health Sciences",
        courses: 11
    },
    {
        name: "Biotechnology",
        department: "Health Sciences",
        courses: 8
    },
    {
        name: "Psychology",
        department: "Social Sciences",
        courses: 9
    },
    {
        name: "Economics",
        department: "Social Sciences",
        courses: 8
    }

];

return (
    <>
        <PublicNavbar />

        <div className="page-container">

            <h1>
                Academic Programs
            </h1>

            <p className="page-subtitle">
                Explore our academic programs and discover opportunities for your future.
            </p>

            <div className="program-grid">

                {programs.map((program, index) => (

                    <div
                        key={index}
                        className="program-card"
                    >

                        <h3>
                            {program.name}
                        </h3>

                        <p>
                            <strong>Department:</strong>
                            {" "}
                            {program.department}
                        </p>

                        <p>
                            <strong>Courses:</strong>
                            {" "}
                            {program.courses}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    </>
);


}

export default ProgramsPage;
