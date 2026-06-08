import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function EditCourseOffering() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [courses, setCourses] =
        useState([]);

    const [semesters, setSemesters] =
        useState([]);

    const [staff, setStaff] =
        useState([]);

    const [formData, setFormData] =
        useState({

            course: "",

            semester: "",

            instructor: "",

            section: "",

            room: "",

            schedule: "",

            capacity: 40,

            drop_deadline: "",

            registration_open: "",

            registration_close: ""

        });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [
                offeringRes,
                coursesRes,
                semestersRes,
                staffRes
            ] = await Promise.all([

                api.get(
                    `/admin/course-offerings/${id}/`
                ),

                api.get(
                    "/admin/courses/"
                ),

                api.get(
                    "/admin/semesters/"
                ),

                api.get(
                    "/admin/staff/"
                )

            ]);

            setFormData(
                offeringRes.data
            );

            setCourses(
                coursesRes.data.results ||
                coursesRes.data
            );

            setSemesters(
                semestersRes.data.results ||
                semestersRes.data
            );

            setStaff(
                staffRes.data.results ||
                staffRes.data
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

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(

                `/admin/course-offerings/${id}/`,

                formData

            );

            alert(
                "Course offering updated successfully"
            );

            navigate(
                "/admin/course-offerings"
            );

        }

        catch(error) {

            console.error(error);

            console.log(
                error.response?.data
            );

            alert(

                JSON.stringify(

                    error.response?.data

                )

            );

        }

    };

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h2 className="mb-4">

                        Edit Course Offering

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>

                                Course

                            </label>

                            <select

                                className="form-select"

                                name="course"

                                value={formData.course}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Course

                                </option>

                                {

                                    courses.map(

                                        course => (

                                            <option

                                                key={course.id}

                                                value={course.id}

                                            >

                                                {course.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>

                                Semester

                            </label>

                            <select

                                className="form-select"

                                name="semester"

                                value={formData.semester}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Semester

                                </option>

                                {

                                    semesters.map(

                                        semester => (

                                            <option

                                                key={semester.id}

                                                value={semester.id}

                                            >

                                                {semester.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>

                                Instructor

                            </label>

                            <select

                                className="form-select"

                                name="instructor"

                                value={formData.instructor}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Instructor

                                </option>

                                {

                                    staff.map(

                                        instructor => (

                                            <option

                                                key={instructor.id}

                                                value={instructor.id}

                                            >

                                                {instructor.username}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>Section</label>

                            <input
                                type="text"
                                className="form-control"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Room</label>

                            <input
                                type="text"
                                className="form-control"
                                name="room"
                                value={formData.room}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Schedule</label>

                            <input
                                type="text"
                                className="form-control"
                                name="schedule"
                                value={formData.schedule}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Capacity</label>

                            <input
                                type="number"
                                className="form-control"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>
                                Registration Open
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="registration_open"
                                value={formData.registration_open}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>
                                Registration Close
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="registration_close"
                                value={formData.registration_close}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label>
                                Drop Deadline
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="drop_deadline"
                                value={formData.drop_deadline}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >

                            Update Offering

                        </button>

                    </form>

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

export default EditCourseOffering;