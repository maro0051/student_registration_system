import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StaffLayout from "../../layouts/StaffLayout";

function MyClasses() {

    const navigate = useNavigate();

    const [classes, setClasses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadClasses();

    }, []);

    const loadClasses = async () => {

        try {

            const response =
                await api.get(
                    "/staff/classes/"
                );

            console.log(

            );

            setClasses(
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

    return (

        <StaffLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    My Classes

                </h2>

                

            </div>

            <div className="card shadow-sm">

                <div className="card-header bg-primary text-white">

                    <h5 className="mb-0">

                        Assigned Classes

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

                                <table className="table table-hover align-middle">

                                    <thead className="table-light">

                                        <tr>

                                            <th>

                                                Code

                                            </th>

                                            <th>

                                                Course

                                            </th>

                                            <th>

                                                Section

                                            </th>

                                            <th>

                                                Room

                                            </th>

                                            <th>

                                                Schedule

                                            </th>

                                            <th>

                                                Semester

                                            </th>

                                            <th>

                                                Actions

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            classes.length > 0

                                            ?

                                            (

                                                classes.map(

                                                    (

                                                        item

                                                    ) => (

                                                        <tr
                                                            key={
                                                                item.id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    item.course_code
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    item.course
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    item.section
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    item.room
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    item.schedule
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    item.semester
                                                                }

                                                            </td>

                                                            <td>

                                                                <div className="d-flex gap-2">

                                                                    <button

                                                                        type="button"

                                                                        className="
                                                                            btn
                                                                            btn-warning
                                                                            btn-sm
                                                                        "

                                                                        onClick={() =>

                                                                            navigate(

                                                                                `/staff/attendance/${item.id}`

                                                                            )

                                                                        }

                                                                    >

                                                                        Attendance

                                                                    </button>
                                                                    <button
                                                                        className="btn btn-info btn-sm"
                                                                        onClick={() =>
                                                                            navigate(
                                                                                `/staff/attendance-report/${item.id}`
                                                                            )
                                                                        }
                                                                    >
                                                                        Attendance Report
                                                                        
                                                                    </button>

                                                                    <button

                                                                        type="button"

                                                                        className="
                                                                            btn
                                                                            btn-success
                                                                            btn-sm
                                                                        "

                                                                        onClick={() =>

                                                                            navigate(

                                                                                `/staff/staffgrades/${item.id}`

                                                                            )

                                                                        }

                                                                    >

                                                                        Grades

                                                                    </button>

                                                                </div>

                                                            </td>

                                                        </tr>

                                                    )

                                                )

                                            )

                                            :

                                            (

                                                <tr>

                                                    <td

                                                        colSpan="7"

                                                        className="text-center"

                                                    >

                                                        No classes assigned

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

        </StaffLayout>

    );

}

export default MyClasses;