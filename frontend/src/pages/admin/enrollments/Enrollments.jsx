import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Enrollments() {

    const navigate = useNavigate();

    const [enrollments, setEnrollments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadEnrollments();

    }, []);

    const loadEnrollments = async () => {

        try {

            const response =
                await api.get(
                    "/admin/enrollments/"
                );

            setEnrollments(
                response.data.results ||
                response.data
            );

        }

        catch(error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const deleteEnrollment = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete enrollment?"
            );

        if (!confirmDelete)
            return;

        try {

            await api.delete(
                `/admin/enrollments/${id}/`
            );

            setEnrollments(

                enrollments.filter(

                    enrollment =>

                        enrollment.id !== id

                )

            );

        }

        catch(error) {

            console.error(error);

        }

    };

    const filteredEnrollments =
        enrollments.filter(

            enrollment =>

                (enrollment.student || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                (enrollment.course || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold">

                            ✅ Enrollments

                        </h2>

                        <p className="text-muted mb-0">

                            Manage student enrollments

                        </p>

                    </div>

                    <button

                        className="btn btn-primary"

                        onClick={() =>
                            navigate(
                                "/admin/enrollments/create"
                            )
                        }

                    >

                        + Add Enrollment

                    </button>

                </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <input

                        className="form-control mb-4"

                        placeholder="Search student or course..."

                        value={search}

                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }

                    />

                    {

                        loading

                        ?

                        (

                            <div className="text-center py-5">

                                <div className="spinner-border" />

                            </div>

                        )

                        :

                        (

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead>

                                        <tr>

                                            <th>ID</th>

                                            <th>Student</th>

                                            <th>Course</th>

                                            <th>Status</th>

                                            <th>Grade</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filteredEnrollments.map(

                                                enrollment => (

                                                    <tr
                                                        key={enrollment.id}
                                                    >

                                                        <td>
                                                            {enrollment.id}
                                                        </td>

                                                        <td>
                                                            {enrollment.student}
                                                        </td>

                                                        <td>
                                                            {enrollment.course}
                                                        </td>

                                                        <td>
                                                            {enrollment.status}
                                                        </td>

                                                        <td>
                                                            {enrollment.grade}
                                                        </td>

                                                        <td>

                                                            <button

                                                                className="btn btn-warning btn-sm me-2"

                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/enrollments/edit/${enrollment.id}`
                                                                    )
                                                                }

                                                            >

                                                                Edit

                                                            </button>

                                                            <button

                                                                className="btn btn-danger btn-sm"

                                                                onClick={() =>
                                                                    deleteEnrollment(
                                                                        enrollment.id
                                                                    )
                                                                }

                                                            >

                                                                Delete

                                                            </button>

                                                        </td>

                                                    </tr>

                                                )

                                            )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        )

                    }

                </div>

            </div>

        </AdminLayout>

    );

}

export default Enrollments;