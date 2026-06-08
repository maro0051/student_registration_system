import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Departments() {


const navigate = useNavigate();

const [departments, setDepartments] =
    useState([]);

const [search, setSearch] =
    useState("");

useEffect(() => {

    loadDepartments();

}, []);

const loadDepartments = async () => {

    try {

        const response =
            await api.get(
                "/admin/departments/"
            );

        setDepartments(
            response.data.results ||
            response.data
        );

    }

    catch(error) {

        console.error(error);

    }

};

const deleteDepartment = async (
    id
) => {

    if (
        !window.confirm(
            "Delete this department?"
        )
    ) return;

    try {

        await api.delete(
            `/admin/departments/${id}/`
        );

        loadDepartments();

    }

    catch(error) {

        console.error(error);

    }

};

const filteredDepartments =
    departments.filter((department) =>

        (department.name || "")
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

    );

return (

    <AdminLayout>

        <div className="px-3">

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h2 className="fw-bold mb-1">
                                🏢 Departments
                            </h2>

                            <p className="text-muted mb-0">
                                Manage academic departments
                            </p>

                        </div>

                        <button

                            className="btn btn-primary"

                            onClick={() =>
                                navigate(
                                    "/admin/departments/create"
                                )
                            }

                        >

                            + Add Department

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

                                placeholder="🔍 Search departments..."

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

                                Total Departments: {

                                    filteredDepartments.length

                                }

                            </span>

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table align-middle table-hover">

                            <thead className="table-light">

                                <tr>

                                    <th>ID</th>

                                    <th>Code</th>

                                    <th>Department Name</th>

                                    <th className="text-center">

                                        Actions

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredDepartments.length > 0

                                    ? (

                                        filteredDepartments.map(

                                            (
                                                department
                                            ) => (

                                                <tr
                                                    key={
                                                        department.id
                                                    }
                                                >

                                                    <td>

                                                        {
                                                            department.id
                                                        }

                                                    </td>

                                                    <td>

                                                        <span className="badge bg-secondary">

                                                            {
                                                                department.code
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <strong>

                                                            {
                                                                department.name
                                                            }

                                                        </strong>

                                                    </td>

                                                    <td className="text-center">

                                                        <button

                                                            className="btn btn-outline-warning btn-sm me-2"

                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/departments/edit/${department.id}`
                                                                )
                                                            }

                                                        >

                                                            ✏️ Edit

                                                        </button>

                                                        <button

                                                            className="btn btn-outline-danger btn-sm"

                                                            onClick={() =>
                                                                deleteDepartment(
                                                                    department.id
                                                                )
                                                            }

                                                        >

                                                            🗑 Delete

                                                        </button>

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    )

                                    : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center py-5"
                                            >

                                                <h5 className="text-muted">

                                                    No departments found

                                                </h5>

                                            </td>

                                        </tr>

                                    )

                                }

                            </tbody>

                        </table>

                    </div>

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
            

        </div>

    </AdminLayout>

);

}

export default Departments;
