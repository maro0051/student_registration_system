import { useEffect, useState } from "react";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function PerformanceReport() {

    const [grades, setGrades] =
        useState([]);

    useEffect(() => {

        loadGrades();

    }, []);

    const loadGrades = async () => {

        const response =
            await api.get(
                "/admin/grades/"
            );

        setGrades(
            response.data
        );

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">

                🎓 Performance Report

            </h2>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>Student</th>

                                <th>Course</th>

                                <th>Midterm</th>

                                <th>Final</th>

                                <th>Letter</th>

                                <th>GPA</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                grades.map(

                                    (
                                        grade
                                    ) => (

                                        <tr
                                            key={
                                                grade.id
                                            }
                                        >

                                            <td>
                                                {
                                                    grade.student
                                                }
                                            </td>

                                            <td>
                                                {
                                                    grade.course
                                                }
                                            </td>

                                            <td>
                                                {
                                                    grade.midterm_grade
                                                }
                                            </td>

                                            <td>
                                                {
                                                    grade.final_grade
                                                }
                                            </td>

                                            <td>
                                                {
                                                    grade.letter_grade
                                                }
                                            </td>

                                            <td>
                                                {
                                                    grade.gpa_points
                                                }
                                            </td>

                                        </tr>

                                    )

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default PerformanceReport;