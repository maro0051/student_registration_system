import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CourseOfferings() {

    const navigate = useNavigate();

    const [offerings, setOfferings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadOfferings();

    }, []);

    const loadOfferings = async () => {

        try {

            const response =
                await api.get(
                    "/admin/course-offerings/"
                );

            setOfferings(

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

    const deleteOffering = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(

                "Are you sure you want to delete this course offering?"

            );

        if (!confirmDelete)
            return;

        try {

            await api.delete(

                `/admin/course-offerings/${id}/`

            );

            setOfferings(

                offerings.filter(

                    offering =>

                        offering.id !== id

                )

            );

        }

        catch(error) {

            console.error(error);

            alert(

                JSON.stringify(

                    error.response?.data ||

                    "Delete failed"

                )

            );

        }

    };

    const filteredOfferings =
        offerings.filter(

            offering =>

                (offering.course || "")

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    ) ||

                (offering.instructor || "")

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    ) ||

                (offering.semester || "")

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

                            📚 Course Offerings

                        </h2>

                        <p className="text-muted mb-0">

                            Manage course offerings, instructors and semesters

                        </p>

                    </div>

                    <button

                        className="btn btn-primary"

                        onClick={() =>
                            navigate(
                                "/admin/course-offerings/create"
                            )
                        }

                    >

                        + Add Offering

                    </button>

                </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <input

                                type="text"

                                className="form-control"

                                placeholder="Search course, semester, instructor..."

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

                                            <th>Course</th>

                                            <th>Semester</th>

                                            <th>Instructor</th>

                                            <th>Section</th>

                                            <th>Room</th>

                                            <th>Schedule</th>

                                            <th>Capacity</th>

                                            <th>Seats Left</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filteredOfferings.length === 0

                                            ?

                                            (

                                                <tr>

                                                    <td
                                                        colSpan="10"
                                                        className="text-center text-muted"
                                                    >

                                                        No course offerings found

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            (

                                                filteredOfferings.map(

                                                    offering => (

                                                        <tr
                                                            key={offering.id}
                                                        >

                                                            <td>

                                                                {offering.id}

                                                            </td>

                                                            <td>

                                                                {offering.course}

                                                            </td>

                                                            <td>

                                                                {offering.semester}

                                                            </td>

                                                            <td>

                                                                {offering.instructor}

                                                            </td>

                                                            <td>

                                                                {offering.section}

                                                            </td>

                                                            <td>

                                                                {offering.room}

                                                            </td>

                                                            <td>

                                                                {offering.schedule}

                                                            </td>

                                                            <td>

                                                                {offering.capacity}

                                                            </td>

                                                            <td>

                                                                {

                                                                    offering.seats_remaining

                                                                }

                                                            </td>

                                                            <td>

                                                                <button

                                                                    className="btn btn-warning btn-sm me-2"

                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/admin/course-offerings/edit/${offering.id}`
                                                                        )
                                                                    }

                                                                >

                                                                    Edit

                                                                </button>

                                                                <button

                                                                    className="btn btn-danger btn-sm"

                                                                    onClick={() =>
                                                                        deleteOffering(
                                                                            offering.id
                                                                        )
                                                                    }

                                                                >

                                                                    Delete

                                                                </button>

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

export default CourseOfferings;