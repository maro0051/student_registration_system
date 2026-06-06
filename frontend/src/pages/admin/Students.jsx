import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

function Students() {


const navigate = useNavigate();

const [students, setStudents] =
    useState([]);

const [search, setSearch] =
    useState("");

const [loading, setLoading] =
    useState(true);

useEffect(() => {

    loadStudents();

}, []);

const loadStudents = async () => {

    try {

        const response =
            await api.get(
                "/admin/students/"
            );

        setStudents(
            response.data.results ||
            response.data
        );

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

};

const deleteStudent = async (
    studentId
) => {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this student?"
        );

    if (!confirmed) return;

    try {

        await api.delete(
            `/admin/students/${studentId}/`
        );

        loadStudents();

        alert(
            "Student deleted successfully."
        );

    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete student."
        );

    }

};

const filteredStudents =
    students.filter((student) =>

        (student.username || "")
            .toLowerCase()
            .includes(
                search.toLowerCase()
            ) ||

        (student.student_id || "")
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

    );

return (

    <AdminLayout>

        <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>
                Students
            </h2>

            <div className="d-flex">

                <input

                    type="text"

                    className="form-control me-2"

                    placeholder="Search Student"

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                />

                <button

                    className="btn btn-success"

                    onClick={() =>
                        navigate(
                            "/admin/students/create"
                        )
                    }

                >

                    Add Student

                </button>

            </div>

        </div>

        <div className="card shadow-sm">

            <div className="card-body">

                {loading ? (

                    <div>

                        Loading...

                    </div>

                ) : (

                    <table className="table table-striped table-hover">

                        <thead>

                            <tr>

                                <th>
                                    Student ID
                                </th>

                                <th>
                                    Username
                                </th>

                                <th>
                                    Program
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredStudents.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center"
                                    >

                                        No students found.

                                    </td>

                                </tr>

                            ) : (

                                filteredStudents.map(
                                    (student) => (

                                    <tr
                                        key={student.id}
                                    >

                                        <td>
                                            {student.student_id}
                                        </td>

                                        <td>
                                            {student.username}
                                        </td>

                                        <td>
                                            {student.program}
                                        </td>

                                        <td>
                                            {student.department}
                                        </td>

                                        <td>

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                                onClick={() =>
                                                    navigate(
                                                        `/admin/students/edit/${student.id}`
                                                    )
                                                }

                                            >

                                                Edit

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    deleteStudent(
                                                        student.id
                                                    )
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    </AdminLayout>

);


}

export default Students;
