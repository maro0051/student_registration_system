import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateStudent() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({

            username: "",
            email: "",
            password: "",
            program: "",
            department: ""

        });

    const [programs, setPrograms] =
        useState([]);

    const [departments, setDepartments] =
        useState([]);

    useEffect(() => {

        loadDropdowns();

    }, []);

    const loadDropdowns = async () => {

        try {

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

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        try {

            await api.post(

                "/admin/students/",

                formData

            );

            alert(
                "Student created successfully"
            );

            navigate(
                "/admin/students"
            );

        }

        catch(error) {

            console.error(error);
            console.log(error.response?.data);
            alert(JSON.stringify(error.response?.data) || "Unable to create student");

            
        }

    };

    return (

        <AdminLayout>

            <div className="card">

                <div className="card-body">

                    <h2 className="mb-4">

                        Add Student

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

                                name="username"

                                className="form-control"

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

                                name="email"

                                type="email"

                                className="form-control"

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
                                Password
                            </label>

                            <input

                                name="password"

                                type="password"

                                className="form-control"

                                value={
                                    formData.password
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

                                name="program"

                                className="form-select"

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

                                name="department"

                                className="form-select"

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
                            className="btn btn-success"
                        >

                            Create Student

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CreateStudent;