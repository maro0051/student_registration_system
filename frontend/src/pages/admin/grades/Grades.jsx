import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Grades() {

    const navigate = useNavigate();

    const [grades, setGrades] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadGrades();

    }, []);

    const loadGrades = async () => {

        try {

            const response =
                await api.get(
                    "/admin/grades/"
                );

            setGrades(

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

    const filteredGrades =
        grades.filter(

            grade =>

                (grade.student || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                (grade.course || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <h2 className="fw-bold">

                        📊 Grades

                    </h2>

                    <p className="text-muted mb-0">

                        Manage student grades

                    </p>

                </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <input

                        type="text"

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

                                            <th>Midterm</th>

                                            <th>Final</th>

                                            <th>Letter</th>

                                            <th>GPA</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filteredGrades.map(

                                                grade => (

                                                    <tr
                                                        key={grade.id}
                                                    >

                                                        <td>
                                                            {grade.id}
                                                        </td>

                                                        <td>
                                                            {grade.student}
                                                        </td>

                                                        <td>
                                                            {grade.course}
                                                        </td>

                                                        <td>
                                                            {grade.status}
                                                        </td>

                                                        <td>
                                                            {grade.midterm_grade ?? "-"}
                                                        </td>

                                                        <td>
                                                            {grade.final_grade ?? "-"}
                                                        </td>

                                                        <td>
                                                            {grade.letter_grade || "-"}
                                                        </td>

                                                        <td>
                                                            {grade.gpa_points}
                                                        </td>

                                                        <td>

                                                            <button

                                                                className="btn btn-warning btn-sm"

                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/grades/edit/${grade.id}`
                                                                    )
                                                                }

                                                            >

                                                                Edit

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

export default Grades;