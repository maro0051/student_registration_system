import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../../../api/axios";

import AdminLayout from "../../../layouts/AdminLayout";

function EditStudent() {

    const navigate = useNavigate();

    const { id } =
        useParams();

    const [loading, setLoading] =
        useState(true);

    const [programs, setPrograms] =
        useState([]);

    const [departments, setDepartments] =
        useState([]);

    const [formData, setFormData] =
        useState({

            username: "",

            email: "",

            program: "",

            department: ""

        });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const studentResponse =
                await api.get(
                    `/admin/students/${id}/`
                );

            const programsResponse =
                await api.get(
                    "/admin/programs/"
                );

            const departmentsResponse =
                await api.get(
                    "/admin/departments/"
                );

            setPrograms(
                programsResponse.data.results ||
                programsResponse.data
            );

            setDepartments(
                departmentsResponse.data.results ||
                departmentsResponse.data
            );

            setFormData({

                username:
                    studentResponse.data.username || "",

                email:
                    studentResponse.data.email || "",

                program:
                    studentResponse.data.program_id || "",

                department:
                    studentResponse.data.department_id || ""

            });

        }

        catch(error) {

            console.error(error);
            console.log(error.response?.data || error.message);

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        try {

            await api.put(

                `/admin/students/${id}/`,

                formData

            );

            alert(
                "Student updated successfully."
            );

            navigate(
                "/admin/students"
            );

        }

        catch(error) {

            console.error(error);
            console.log(error.response?.data );
            console.error(error);
            

        }

    };

    if (loading) {

        return (

            <AdminLayout>

                Loading...

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <div className="card">

                <div className="card-body">

                    <h2 className="mb-4">

                        Edit Student

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="mb-3">

                            <label>

                                Username

                            </label>

                            <input

                                className="form-control"

                                name="username"

                                value={
                                    formData.username
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label>

                                Email

                            </label>

                            <input

                                className="form-control"

                                name="email"

                                type="email"

                                value={
                                    formData.email
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label>

                                Program

                            </label>

                            <select

                                className="form-select"

                                name="program"

                                value={
                                    formData.program
                                }

                                onChange={
                                    handleChange
                                }

                            >

                                <option value="">
                                    Select Program
                                </option>

                                {programs.map(
                                    (program) => (

                                    <option

                                        key={program.id}

                                        value={program.id}

                                    >

                                        {program.name}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>

                                Department

                            </label>

                            <select

                                className="form-select"

                                name="department"

                                value={
                                    formData.department
                                }

                                onChange={
                                    handleChange
                                }

                            >

                                <option value="">
                                    Select Department
                                </option>

                                {departments.map(
                                    (department) => (

                                    <option

                                        key={department.id}

                                        value={department.id}

                                    >

                                        {department.name}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <button
                            className="btn btn-primary"
                        >

                            Update Student

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default EditStudent;