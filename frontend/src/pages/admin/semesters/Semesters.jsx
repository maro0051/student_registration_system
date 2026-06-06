import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Semesters() {

    const navigate = useNavigate();

    const [semesters, setSemesters] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadSemesters();

    }, []);

    const loadSemesters = async () => {

        try {

            const response =
                await api.get(
                    "/admin/semesters/"
                );

            setSemesters(
                response.data.results ||
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const deleteSemester = async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete this semester?"
            )
        ) return;

        try {

            await api.delete(
                `/admin/semesters/${id}/`
            );

            loadSemesters();

        }

        catch (error) {

            console.error(error);

        }

    };

    const filteredSemesters =
        semesters.filter(

            (semester) =>

                (semester.name || "")
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
                                📅 Semesters
                            </h2>

                            <p className="text-muted mb-0">
                                Manage academic semesters
                            </p>

                        </div>

                        <button

                            className="btn btn-primary"

                            onClick={() =>
                                navigate(
                                    "/admin/semesters/create"
                                )
                            }

                        >

                            + Add Semester

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

                                placeholder="🔍 Search semesters..."

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

                                Total Semesters: {
                                    filteredSemesters.length
                                }

                            </span>

                        </div>

                    </div>

                    <table className="table table-hover">

                        <thead className="table-light">

                            <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredSemesters.map(

                                    (semester) => (

                                        <tr
                                            key={semester.id}
                                        >

                                            <td>
                                                {semester.id}
                                            </td>

                                            <td>
                                                {semester.name}
                                            </td>

                                            <td>
                                                {semester.start_date}
                                            </td>

                                            <td>
                                                {semester.end_date}
                                            </td>

                                            <td>

                                                <span className="badge bg-success">

                                                    {semester.is_active
                                                        ? "Active"
                                                        : "Inactive"}

                                                </span>

                                            </td>

                                            <td>

                                                <button

                                                    className="btn btn-outline-warning btn-sm me-2"

                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/semesters/edit/${semester.id}`
                                                        )
                                                    }

                                                >

                                                    ✏️ Edit

                                                </button>

                                                <button

                                                    className="btn btn-outline-danger btn-sm"

                                                    onClick={() =>
                                                        deleteSemester(
                                                            semester.id
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

            </div>

        </AdminLayout>

    );

}

export default Semesters;