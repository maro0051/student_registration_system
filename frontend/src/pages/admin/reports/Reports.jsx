import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Reports() {
     const navigate = useNavigate();

    const [reports, setReports] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const response =
                await api.get(
                    "/admin/reports/"
                );

            setReports(

                response.data.results ||

                response.data

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const downloadCSV = () => {

        window.location.href =
            "http://127.0.0.1:8000/api/admin/reports/export/";

    };

    const downloadPDF = async () => {

        try {

            const response =
                await api.get(

                    "/admin/reports/enrollments/pdf/",

                    {

                        responseType:
                            "blob"

                    }

                );

            const blob =
                new Blob(

                    [response.data],

                    {

                        type:
                            "application/pdf"

                    }

                );

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement(
                    "a"
                );

            link.href = url;

            link.download =
                "enrollment_report.pdf";

            document.body.appendChild(
                link
            );

            link.click();

            link.remove();

            window.URL.revokeObjectURL(
                url
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to download PDF"
            );

        }

    };

    const filteredReports =
        reports.filter(

            report =>

                (report.student || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                (report.course || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                (report.status || "")
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

                            📑 Reports

                        </h2>

                        <p className="text-muted mb-0">

                            Academic reports and exports

                        </p>

                    </div>

                    <div>

                        <button

                            className="btn btn-success me-2"

                            onClick={
                                downloadCSV
                            }

                        >

                            Export CSV

                        </button>

                        <button

                            className="btn btn-danger"

                            onClick={
                                downloadPDF
                            }

                        >

                            Export PDF

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

                                placeholder="Search student, course or status..."

                                value={search}

                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                    </div>

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

                                <table className="table table-hover align-middle">

                                    <thead>

                                        <tr>

                                            <th>ID</th>

                                            <th>Student</th>

                                            <th>Course</th>

                                            <th>Status</th>

                                            <th>Midterm</th>

                                            <th>Final</th>

                                            <th>Letter Grade</th>

                                            <th>GPA</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filteredReports.length === 0

                                            ?

                                            (

                                                <tr>

                                                    <td

                                                        colSpan="8"

                                                        className="text-center text-muted"

                                                    >

                                                        No reports found

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            (

                                                filteredReports.map(

                                                    report => (

                                                        <tr

                                                            key={
                                                                report.id
                                                            }

                                                        >

                                                            <td>

                                                                {
                                                                    report.id
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    report.student
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    report.course
                                                                }

                                                            </td>

                                                            <td>

                                                                <span className="badge bg-primary">

                                                                    {
                                                                        report.status
                                                                    }

                                                                </span>

                                                            </td>

                                                            <td>

                                                                {

                                                                    report.midterm_grade ??

                                                                    "-"

                                                                }

                                                            </td>

                                                            <td>

                                                                {

                                                                    report.final_grade ??

                                                                    "-"

                                                                }

                                                            </td>

                                                            <td>

                                                                {

                                                                    report.letter_grade ||

                                                                    "-"

                                                                }

                                                            </td>

                                                            <td>

                                                                {

                                                                    report.gpa_points ??

                                                                    0

                                                                }

                                                            </td>

                                                        </tr>

                                                    )

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

export default Reports;