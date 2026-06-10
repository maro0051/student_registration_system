import PublicNavbar from "../components/PublicNavbar";

function CourseCatalog() {


const courses = [

    {
        code: "COMP101",
        name: "Introduction to Programming",
        program: "Computer Science",
        department: "Information Technology"
    },
    {
        code: "COMP202",
        name: "Database Systems",
        program: "Computer Science",
        department: "Information Technology"
    },
    {
        code: "COMP305",
        name: "Web Development",
        program: "Computer Science",
        department: "Information Technology"
    },
    {
        code: "COMP401",
        name: "Software Engineering",
        program: "Software Engineering",
        department: "Information Technology"
    },
    {
        code: "AI301",
        name: "Machine Learning",
        program: "Artificial Intelligence",
        department: "Information Technology"
    },
    {
        code: "DS201",
        name: "Data Analytics",
        program: "Data Science",
        department: "Information Technology"
    },
    {
        code: "NET301",
        name: "Network Administration",
        program: "Information Technology",
        department: "Information Technology"
    },
    {
        code: "CYB401",
        name: "Ethical Hacking",
        program: "Cybersecurity",
        department: "Information Technology"
    },
    {
        code: "BUS101",
        name: "Business Fundamentals",
        program: "Business Administration",
        department: "Business"
    },
    {
        code: "ACC201",
        name: "Financial Accounting",
        program: "Accounting",
        department: "Business"
    },
    {
        code: "FIN301",
        name: "Corporate Finance",
        program: "Finance",
        department: "Business"
    },
    {
        code: "MKT201",
        name: "Digital Marketing",
        program: "Marketing",
        department: "Business"
    },
    {
        code: "HR301",
        name: "Human Resource Management",
        program: "Human Resources",
        department: "Business"
    },
    {
        code: "PM401",
        name: "Project Planning",
        program: "Project Management",
        department: "Business"
    },
    {
        code: "ME101",
        name: "Engineering Mechanics",
        program: "Mechanical Engineering",
        department: "Engineering"
    },
    {
        code: "CE201",
        name: "Structural Analysis",
        program: "Civil Engineering",
        department: "Engineering"
    },
    {
        code: "EE301",
        name: "Electrical Circuits",
        program: "Electrical Engineering",
        department: "Engineering"
    },
    {
        code: "NUR101",
        name: "Fundamentals of Nursing",
        program: "Nursing",
        department: "Health Sciences"
    },
    {
        code: "BIO301",
        name: "Molecular Biotechnology",
        program: "Biotechnology",
        department: "Health Sciences"
    },
    {
        code: "PSY201",
        name: "Developmental Psychology",
        program: "Psychology",
        department: "Social Sciences"
    }

];

return (
    <>
        <PublicNavbar />

        <div className="page-container">

            <h1>
                Course Catalog
            </h1>

            <p className="page-subtitle">
                Browse our available courses by department and program.
            </p>

            <div className="catalog-grid">

                {courses.map((course, index) => (

                    <div
                        key={index}
                        className="catalog-card"
                    >

                        <h3>
                            {course.code}
                        </h3>

                        <h4>
                            {course.name}
                        </h4>

                        <p>
                            <strong>Program:</strong>
                            {" "}
                            {course.program}
                        </p>

                        <p>
                            <strong>Department:</strong>
                            {" "}
                            {course.department}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    </>
);


}

export default CourseCatalog;
