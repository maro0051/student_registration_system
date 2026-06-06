import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StudentLayout from "../../layouts/StudentLayout";

function RegisterCourse() {


const navigate =
    useNavigate();

const [courses, setCourses] =
    useState([]);

const [loading, setLoading] =
    useState(true);

const [search, setSearch] =
    useState("");

useEffect(() => {

    loadCourses();

}, []);

const loadCourses = async () => {

    try {

        const response =
            await api.get(
                "/student/available-courses/"
            );

        setCourses(
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

const registerCourse = async (
    offeringId
) => {

    try {

        const response =
            await api.post(

                `/student/register-course/${offeringId}/`

            );

        alert(
            response.data.message
        );

        loadCourses();

    }

    catch (error) {

        console.error(error);

        alert(

            error.response?.data?.error ||

            "Registration failed"

        );

    }

};

const filteredCourses =
    courses.filter(

        course =>

            course.course_name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            course.course
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            course.course_code
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

    );

return (

    <StudentLayout>

        <div className="d-flex align-items-center mb-4">

            <button

                className="btn btn-secondary me-3"

                onClick={() =>
                    navigate(-1)
                }

            >

                ← Back

            </button>

            <h2 className="mb-0">

                Course Registration

            </h2>

        </div>

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Search courses..."

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

                        <div className="text-center">

                            <div className="spinner-border" />

                        </div>

                    )

                    :

                    (

                        <div className="table-responsive">

                            <table className="table table-hover">

                                <thead>

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

                                            Capacity

                                        </th>

                                        <th>

                                            Seats Left

                                        </th>

                                        <th>

                                            Action

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredCourses.length === 0

                                        ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="8"

                                                    className="text-center"

                                                >

                                                    No available courses

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            filteredCourses.map(

                                                (

                                                    course

                                                ) => (

                                                    <tr

                                                        key={
                                                            course.id
                                                        }

                                                    >

                                                        <td>

                                                            {
                                                                course.course_code
                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                course.course ||

                                                                course.course_name

                                                            }

                                                        </td>

                                                        <td>

                                                            {
                                                                course.section
                                                            }

                                                        </td>

                                                        <td>

                                                            {
                                                                course.room
                                                            }

                                                        </td>

                                                        <td>

                                                            {
                                                                course.schedule
                                                            }

                                                        </td>

                                                        <td>

                                                            {
                                                                course.capacity
                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                course.remaining

                                                            }

                                                        </td>

                                                        <td>

                                                            {

                                                                course.remaining > 0

                                                                ?

                                                                (

                                                                    <button

                                                                        className="btn btn-success btn-sm"

                                                                        onClick={() =>

                                                                            registerCourse(
                                                                                course.id
                                                                            )

                                                                        }

                                                                    >

                                                                        Register

                                                                    </button>

                                                                )

                                                                :

                                                                (

                                                                    <span className="badge bg-danger">

                                                                        Full

                                                                    </span>

                                                                )

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

        </div>

    </StudentLayout>

);


}

export default RegisterCourse;
