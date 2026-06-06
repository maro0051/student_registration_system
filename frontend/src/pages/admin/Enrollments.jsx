import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

function Enrollments() {

    const [enrollments, setEnrollments] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadEnrollments();

    }, []);

    const loadEnrollments = async () => {

        try {

            const response = await api.get(
                "/admin/enrollments/"
            );

            setEnrollments(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const filteredEnrollments =
        enrollments.filter(

            (enrollment) =>

                enrollment.student
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                enrollment.course
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-3">

                <h2>
                    Enrollments
                </h2>

                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="card">

                <div className="card-body">

                    <table className="table table-striped">

                        <thead>

                            <tr>

                                <th>
                                    Student
                                </th>

                                <th>
                                    Course
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Grade
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredEnrollments.map(
                                (enrollment) => (

                                <tr
                                    key={enrollment.id}
                                >

                                    <td>
                                        {
                                            enrollment.student
                                        }
                                    </td>

                                    <td>
                                        {
                                            enrollment.course
                                        }
                                    </td>

                                    <td>
                                        {
                                            enrollment.status
                                        }
                                    </td>

                                    <td>
                                        {
                                            enrollment.grade
                                        }
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

export default Enrollments;