import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StudentLayout from "../../layouts/StudentLayout";

function Timetable() {

const navigate =
    useNavigate();

const [courses, setCourses] =
    useState([]);

const [loading, setLoading] =
    useState(true);

const [search, setSearch] =
    useState("");

useEffect(() => {

    loadTimetable();

}, []);

const loadTimetable = async () => {

    try {

        const response =
            await api.get(
                "/student/timetable/"
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

const filteredCourses =
    courses.filter(

        course =>

            course.course_name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            course.course_code
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

    );

return (

    <StudentLayout>

        <div className="d-flex align-items-center mb-4">

          

            <h2 className="mb-0">

                My Timetable

            </h2>

        </div>

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Search course..."

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

                                        <th>Code</th>

                                        <th>Course</th>

                                        <th>Instructor</th>

                                        <th>Section</th>

                                        <th>Room</th>

                                        <th>Schedule</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredCourses.length === 0

                                        ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="6"

                                                    className="text-center"

                                                >

                                                    No courses found

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            filteredCourses.map(

                                                (

                                                    course,
                                                    index

                                                ) => (

                                                    <tr
                                                        key={index}
                                                    >

                                                        <td>

                                                            {course.course_code}

                                                        </td>

                                                        <td>

                                                            {course.course_name}

                                                        </td>

                                                        <td>

                                                            {course.instructor}

                                                        </td>

                                                        <td>

                                                            {course.section}

                                                        </td>

                                                        <td>

                                                            {course.room}

                                                        </td>

                                                        <td>

                                                            {course.schedule}

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

                    className="btn btn-danger mt-3"

                    onClick={() =>
                        navigate(-1)
                   }

               >

                  ← Back

                </button>
            </div>

        </div>

    </StudentLayout>

);


}

export default Timetable;
