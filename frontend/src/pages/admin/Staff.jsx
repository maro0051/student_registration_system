import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

function Staff() {


const navigate = useNavigate();

const [staff, setStaff] =
    useState([]);

const [search, setSearch] =
    useState("");

const [loading, setLoading] =
    useState(true);

useEffect(() => {

    loadStaff();

}, []);

const loadStaff = async () => {

    try {

        const response =
            await api.get(
                "/admin/staff/"
            );

        setStaff(
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

const deleteStaff = async (
    staffId
) => {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this staff member?"
        );

    if (!confirmed) return;

    try {

        await api.delete(
            `/admin/staff/${staffId}/`
        );

        loadStaff();

        alert(
            "Staff deleted successfully."
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to delete staff."
        );

    }

};

const filteredStaff =
    staff.filter((member) =>

        (member.username || "")
            .toLowerCase()
            .includes(
                search.toLowerCase()
            ) ||

        (member.employee_id || "")
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

    );

return (

    <AdminLayout>

        <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>
                Staff
            </h2>

            <div className="d-flex">

                <input

                    type="text"

                    className="form-control me-2"

                    placeholder="Search Staff"

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
                            "/admin/staff/create"
                        )
                    }

                >

                    Add Staff

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
                                    Employee ID
                                </th>

                                <th>
                                    Username
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

                            {filteredStaff.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center"
                                    >

                                        No staff found.

                                    </td>

                                </tr>

                            ) : (

                                filteredStaff.map(
                                    (member) => (

                                    <tr
                                        key={member.id}
                                    >

                                        <td>
                                            {member.employee_id}
                                        </td>

                                        <td>
                                            {member.username}
                                        </td>

                                        <td>
                                            {member.department}
                                        </td>

                                        <td>

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                                onClick={() =>
                                                    navigate(
                                                        `/admin/staff/edit/${member.id}`
                                                    )
                                                }

                                            >

                                                Edit

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    deleteStaff(
                                                        member.id
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

export default Staff;
