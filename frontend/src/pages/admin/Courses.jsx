import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            const response = await api.get(
                "/admin/courses/"
            );

            setCourses(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const filteredCourses = courses.filter(
        (course) =>
            course.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            course.code
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-3">

                <h2>Courses</h2>

                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <div className="card">

                <div className="card-body">

                    <table className="table table-striped">

                        <thead>

                            <tr>

                                <th>Code</th>
                                <th>Course Name</th>
                                <th>Credits</th>
                                <th>Program</th>
                                <th>Department</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredCourses.map(
                                (course) => (

                                <tr key={course.id}>

                                    <td>
                                        {course.code}
                                    </td>

                                    <td>
                                        {course.name}
                                    </td>

                                    <td>
                                        {course.credits}
                                    </td>

                                    <td>
                                        {course.program}
                                    </td>

                                    <td>
                                        {course.department}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Courses;