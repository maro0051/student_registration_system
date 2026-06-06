import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function EditEnrollment() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [students, setStudents] =
        useState([]);

    const [courses, setCourses] =
        useState([]);

    const [formData, setFormData] =
        useState({

            student: "",
            course: "",
            status: "",
            grade: ""

        });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const enrollmentResponse =
                await api.get(
                    `/admin/enrollments/${id}/`
                );

            const studentsResponse =
                await api.get(
                    "/admin/students/"
                );

            const coursesResponse =
                await api.get(
                    "/admin/courses/"
                );

            setStudents(
                studentsResponse.data.results ||
                studentsResponse.data
            );

            setCourses(
                coursesResponse.data.results ||
                coursesResponse.data
            );

            setFormData(
                enrollmentResponse.data
            );

        }

        catch(error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const submit = async (
        e
    ) => {

        e.preventDefault();

        try {

            await api.put(

                `/admin/enrollments/${id}/`,

                formData

            );

            alert(
                "Enrollment updated"
            );

            navigate(
                "/admin/enrollments"
            );

        }

        catch(error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <div className="card">

                <div className="card-body">

                    <h2>
                        Edit Enrollment
                    </h2>

                    <form
                        onSubmit={submit}
                    >

                        <select

                            className="form-select mb-3"

                            name="student"

                            value={
                                formData.student
                            }

                            onChange={
                                handleChange
                            }

                        >

                            <option value="">
                                Select Student
                            </option>

                            {students.map(
                                (student) => (

                                <option

                                    key={student.id}

                                    value={student.id}

                                >

                                    {student.username}

                                </option>

                            ))}

                        </select>

                        <select

                            className="form-select mb-3"

                            name="course"

                            value={
                                formData.course
                            }

                            onChange={
                                handleChange
                            }

                        >

                            <option value="">
                                Select Course
                            </option>

                            {courses.map(
                                (course) => (

                                <option

                                    key={course.id}

                                    value={course.id}

                                >

                                    {course.name}

                                </option>

                            ))}

                        </select>

                        <select

                            className="form-select mb-3"

                            name="status"

                            value={
                                formData.status
                            }

                            onChange={
                                handleChange
                            }

                        >

                            <option>
                                Enrolled
                            </option>

                            <option>
                                Completed
                            </option>

                            <option>
                                Dropped
                            </option>

                            <option>
                                Failed
                            </option>

                            <option>
                                Withdrawn
                            </option>

                        </select>

                        <input

                            className="form-control mb-3"

                            name="grade"

                            placeholder="Grade"

                            value={
                                formData.grade
                            }

                            onChange={
                                handleChange
                            }

                        />

                        <button
                            className="btn btn-primary"
                        >

                            Update Enrollment

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default EditEnrollment;