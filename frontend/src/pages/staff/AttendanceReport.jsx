import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/axios";
import StaffLayout from "../../layouts/StaffLayout";

function AttendanceReport() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [records, setRecords] =
        useState([]);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const response =
                await api.get(

                    `/staff/attendance-report/${id}/`

                );

            setRecords(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <StaffLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2>

                    Attendance Report

                </h2>

                <button

                    className="btn btn-secondary"

                    onClick={() =>
                        navigate(-1)
                    }

                >

                    Back

                </button>

            </div>

            <div className="card">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead>

                                <tr>

                                    <th>Date</th>

                                    <th>Student ID</th>

                                    <th>Student</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    records.map(

                                        (

                                            record,

                                            index

                                        ) => (

                                            <tr
                                                key={index}
                                            >

                                                <td>

                                                    {
                                                        record.date
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        record.student_id
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        record.student
                                                    }

                                                </td>

                                                <td>

                                                    <span

                                                        className={

                                                            record.status ===

                                                            "PRESENT"

                                                            ?

                                                            "badge bg-success"

                                                            :

                                                            "badge bg-danger"

                                                        }

                                                    >

                                                        {

                                                            record.status

                                                        }

                                                    </span>

                                                </td>

                                            </tr>

                                        )

                                    )

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </StaffLayout>

    );

}

export default AttendanceReport;