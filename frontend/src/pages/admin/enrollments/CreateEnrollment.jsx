import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateEnrollment() {

    const navigate = useNavigate();

    const [students, setStudents] =
        useState([]);

    const [offerings, setOfferings] =
        useState([]);

    const [formData, setFormData] =
        useState({

            student: "",

            offering: "",

            status: "ENROLLED",

            final_grade: ""

        });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const studentsRes =
                await api.get(
                    "/admin/students/"
                );

            const offeringsRes =
                await api.get(
                    "/admin/course-offerings/"
                );

            setStudents(
                studentsRes.data.results ||
                studentsRes.data
            );

            setOfferings(
                offeringsRes.data.results ||
                offeringsRes.data
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

            await api.post(

                "/admin/enrollments/",

                formData

            );

            alert(
                "Enrollment created successfully"
            );

            navigate(
                "/admin/enrollments"
            );

        }

        catch(error) {

            console.error(error);

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

                        Create Enrollment

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>

                                Student

                            </label>

                            <select

                                className="form-select"

                                name="student"

                                value={formData.student}

                                onChange={handleChange}

                                required

                            >

                                <option value="">
                                    Select Student
                                </option>

                                {

                                    students.map(

                                        student => (

                                            <option

                                                key={student.id}

                                                value={student.id}

                                            >

                                                {student.username}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>

                                Course Offering

                            </label>

                            <select

                                className="form-select"

                                name="offering"

                                value={formData.offering}

                                onChange={handleChange}

                                required

                            >

                                <option value="">
                                    Select Offering
                                </option>

                                {

                                    offerings.map(

                                        offering => (

                                            <option

                                                key={offering.id}

                                                value={offering.id}

                                            >

                                                {offering.course}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>

                                Status

                            </label>

                            <select

                                className="form-select"

                                name="status"

                                value={formData.status}

                                onChange={handleChange}

                            >

                                <option value="ENROLLED">
                                    ENROLLED
                                </option>

                                <option value="DROPPED">
                                    DROPPED
                                </option>

                                <option value="COMPLETED">
                                    COMPLETED
                                </option>

                            </select>

                        </div>

                        <div className="mb-4">

                            <label>

                                Final Grade

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="final_grade"

                                value={formData.final_grade}

                                onChange={handleChange}

                            />

                        </div>

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >

                            Create Enrollment

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CreateEnrollment;