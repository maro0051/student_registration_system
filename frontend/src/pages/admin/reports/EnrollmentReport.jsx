import { useEffect, useState } from "react";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";


function EnrollmentReport() {

    const exportToCSV = () => {
        let csv = "ID,Student,Course,Status,Grade\n";
        enrollments.forEach(enrollment => {
            csv += `${enrollment.id},${enrollment.student},${enrollment.course},${enrollment.status},${enrollment.grade}\n`;
        });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "enrollment_report.csv");
    }

    const [enrollments, setEnrollments] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        const response =
            await api.get(
                "/admin/enrollments/"
            );

        setEnrollments(
            response.data
        );

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">

                📚 Enrollment Report

            </h2>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Student</th>
                                <th>Course</th>
                                <th>Status</th>
                                <th>Grade</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                enrollments.map(

                                    (
                                        enrollment
                                    ) => (

                                        <tr
                                            key={
                                                enrollment.id
                                            }
                                        >

                                            <td>
                                                {
                                                    enrollment.id
                                                }
                                            </td>

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

export default EnrollmentReport;