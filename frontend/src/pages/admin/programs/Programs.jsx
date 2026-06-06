import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Programs() {

    const navigate = useNavigate();

    const [programs, setPrograms] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadPrograms();

    }, []);

    const loadPrograms = async () => {

        try {

            const response =
                await api.get(
                    "/admin/programs/"
                );

            setPrograms(
                response.data.results ||
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const deleteProgram = async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete this program?"
            )
        ) return;

        try {

            await api.delete(
                `/admin/programs/${id}/`
            );

            loadPrograms();

        }

        catch (error) {

            console.error(error);

        }

    };

    const filteredPrograms =
        programs.filter(

            (program) =>

                (program.name || "")
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
                                📚 Programs
                            </h2>

                            <p className="text-muted mb-0">
                                Manage academic programs
                            </p>

                        </div>

                        <button

                            className="btn btn-primary"

                            onClick={() =>
                                navigate(
                                    "/admin/programs/create"
                                )
                            }

                        >

                            + Add Program

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

                                placeholder="🔍 Search programs..."

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

                                Total Programs: {

                                    filteredPrograms.length

                                }

                            </span>

                        </div>

                    </div>

                    <table className="table table-hover">

                        <thead className="table-light">

                            <tr>

                                <th>ID</th>

                                <th>Code</th>

                                <th>Name</th>

                                <th>Department</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredPrograms.map(

                                    (program) => (

                                        <tr
                                            key={program.id}
                                        >

                                            <td>
                                                {program.id}
                                            </td>

                                            <td>

                                                <span className="badge bg-secondary">

                                                    {program.code}

                                                </span>

                                            </td>

                                            <td>
                                                {program.name}
                                            </td>

                                            <td>
                                                {
                                                    program.department
                                                }
                                            </td>

                                            <td>

                                                <button

                                                    className="btn btn-outline-warning btn-sm me-2"

                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/programs/edit/${program.id}`
                                                        )
                                                    }

                                                >

                                                    ✏️ Edit

                                                </button>

                                                <button

                                                    className="btn btn-outline-danger btn-sm"

                                                    onClick={() =>
                                                        deleteProgram(
                                                            program.id
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

export default Programs;