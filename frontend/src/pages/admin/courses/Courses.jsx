import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Courses() {

    const navigate = useNavigate();

    const [courses, setCourses] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            const response =
                await api.get(
                    "/admin/courses/"
                );

            setCourses(
                response.data.results ||
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const deleteCourse = async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete this course?"
            )
        ) return;

        try {

            await api.delete(
                `/admin/courses/${id}/`
            );

            loadCourses();

        }

        catch (error) {

            console.error(error);

        }

    };

    const filteredCourses =
        courses.filter(

            (course) =>

                (course.name || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h2 className="fw-bold mb-1">
                                📖 Courses
                            </h2>

                            <p className="text-muted mb-0">
                                Manage academic courses
                            </p>

                        </div>

                        <button

                            className="btn btn-primary"

                            onClick={() =>
                                navigate(
                                    "/admin/courses/create"
                                )
                            }

                        >

                            + Add Course

                        </button>

                    </div>

                </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <input

                                type="text"

                                className="form-control"

                                placeholder="🔍 Search courses..."

                                value={search}

                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                        <div className="col-md-8 text-end">

                            <span className="badge bg-primary fs-6">

                                Total Courses: {
                                    filteredCourses.length
                                }

                            </span>

                        </div>

                    </div>

                    <table className="table table-hover">

                        <thead className="table-light">

                            <tr>

                                <th>ID</th>
                                <th>Code</th>
                                <th>Course</th>
                                <th>Credits</th>
                                <th>Program</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredCourses.map(

                                    (course) => (

                                        <tr
                                            key={course.id}
                                        >

                                            <td>
                                                {course.id}
                                            </td>

                                            <td>

                                                <span className="badge bg-secondary">

                                                    {course.code}

                                                </span>

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

                                                <button

                                                    className="btn btn-outline-warning btn-sm me-2"

                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/courses/edit/${course.id}`
                                                        )
                                                    }

                                                >

                                                    ✏️ Edit

                                                </button>

                                                <button

                                                    className="btn btn-outline-danger btn-sm"

                                                    onClick={() =>
                                                        deleteCourse(
                                                            course.id
                                                        )
                                                    }

                                                >

                                                    🗑 Delete

                                                </button>

                                            </td>

                                        </tr>

                                    )

                                )

                            }

                        </tbody>

                    </table>

                </div>
                <div className="mt-4 d-flex justify-content-end gap-2 flex-wrap">

                   <button

                       className="btn btn-danger"

                       onClick={() =>
                           navigate(-1)
                        }

                    >

                      ← Back

                    </button>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Courses;