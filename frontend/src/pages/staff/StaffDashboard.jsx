import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/axios";

import StaffLayout from "../../layouts/StaffLayout";

function StaffDashboard() {


const [staff, setStaff] =
    useState(null);

useEffect(() => {

    loadDashboard();

}, []);

const loadDashboard = async () => {

    try {

        const response =
            await api.get(
                "/staff/dashboard/"
            );

        setStaff(
            response.data
        );

    }

    catch (error) {

        console.error(error);

    }

};

if (!staff) {

    return (

        <StaffLayout>

            <div className="text-center mt-5">

                <div className="spinner-border text-primary" />

            </div>

        </StaffLayout>

    );

}

return (

    <StaffLayout>

        <div
            className="
                bg-primary
                text-white
                rounded-4
                p-4
                mb-4
                shadow-sm
            "
        >

            <h2>

                Welcome Back,
                {" "}
                {staff.name}

            </h2>

            <p className="mb-0">

                Manage classes,
                attendance,
                grading and student records.

            </p>

        </div>

        <div className="row g-3 mb-4">

            <div className="col-md-3">

                <div className="card h-100">

                    <div className="card-body text-center">

                        <h6 className="text-muted">

                            Employee ID

                        </h6>

                        <h3>

                            {staff.employee_id}

                        </h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card h-100">

                    <div className="card-body text-center">

                        <h6 className="text-muted">

                            Department

                        </h6>

                        <h3>

                            {staff.department}

                        </h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card h-100">

                    <div className="card-body text-center">

                        <h6 className="text-muted">

                            Classes

                        </h6>

                        <h3>

                            {staff.total_classes}

                        </h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card h-100">

                    <div className="card-body text-center">

                        <h6 className="text-muted">

                            Students

                        </h6>

                        <h3>

                            {staff.total_students}

                        </h3>

                    </div>

                </div>

            </div>

        </div>

        <div className="row g-3 mb-4">

            <div className="col-md-3">

                <Link

                    to="/staff/staffprofile"

                    className="
                        btn
                        btn-primary
                        w-100
                    "

                >

                    My Profile

                </Link>

            </div>

            <div className="col-md-3">

                <Link

                    to="/staff/myclasses"

                    className="
                        btn
                        btn-success
                        w-100
                    "

                >

                    My Classes

                </Link>

            </div>

            <div className="col-md-3">

               
            </div>

            <div className="col-md-3">

                <Link

                    to="/staff/grades"

                    className="
                        btn
                        btn-info
                        w-100
                    "

                >

                    Grades

                </Link>

            </div>

        </div>

        <div className="card">

            <div className="card-header bg-white">

                <h5 className="mb-0">

                    Recent Classes

                </h5>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table
                        className="
                            table
                            table-hover
                        "
                    >

                        <thead>

                            <tr>

                                <th>

                                    Course

                                </th>

                                <th>

                                    Section

                                </th>

                                <th>

                                    Room

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                staff.recent_classes &&
                                staff.recent_classes.length > 0

                                ?

                                (

                                    staff.recent_classes.map(

                                        (

                                            item

                                        ) => (

                                            <tr
                                                key={item.id}
                                            >

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

                                            No classes assigned

                                        </td>

                                    </tr>

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

export default StaffDashboard;
