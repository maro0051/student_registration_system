import { useEffect, useState } from "react";

import api from "../../api/axios";

import StudentLayout from "../../layouts/StudentLayout";

function StudentAttendance() {

    const [records, setRecords] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [summary, setSummary] =
        useState({

            present: 0,

            absent: 0

        });

    useEffect(() => {

        loadAttendance();

    }, []);

    const loadAttendance = async () => {

        try {

            const response =
                await api.get(
                    "/student/attendance/"
                );

            setRecords(
                response.data
            );

            let present = 0;

            let absent = 0;

            response.data.forEach(

                record => {

                    if (

                        record.status ===

                        "PRESENT"

                    ) {

                        present++;

                    }

                    else {

                        absent++;

                    }

                }

            );

            setSummary({

                present,

                absent

            });

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const total =

        summary.present +

        summary.absent;

    const attendanceRate =

        total > 0

        ?

        Math.round(

            (

                summary.present /

                total

            ) * 100

        )

        :

        0;

    return (

        <StudentLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    My Attendance

                </h2>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <h6>

                                Present

                            </h6>

                            <h2 className="text-success">

                                {

                                    summary.present

                                }

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <h6>

                                Absent

                            </h6>

                            <h2 className="text-danger">

                                {

                                    summary.absent

                                }

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <h6>

                                Attendance Rate

                            </h6>

                            <h2 className="text-primary">

                                {

                                    attendanceRate

                                }%

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow-sm">

                <div className="card-header">

                    <h5 className="mb-0">

                        Attendance History

                    </h5>

                </div>

                <div className="card-body">

                    {

                        loading

                        ?

                        (

                            <div className="text-center">

                                <div className="spinner-border text-primary" />

                            </div>

                        )

                        :

                        (

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead>

                                        <tr>

                                            <th>

                                                Course

                                            </th>

                                            <th>

                                                Date

                                            </th>

                                            <th>

                                                Status

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            records.length > 0

                                            ?

                                            (

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
                                                                    record.course
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    record.date
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

                                            )

                                            :

                                            (

                                                <tr>

                                                    <td

                                                        colSpan="3"

                                                        className="text-center"

                                                    >

                                                        No attendance records found

                                                    </td>

                                                </tr>

                                            )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        )

                    }

                </div>

            </div>

        </StudentLayout>

    );

}

export default StudentAttendance;