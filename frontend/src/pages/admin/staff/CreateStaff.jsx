import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateStaff() {

    const navigate = useNavigate();

    const [departments, setDepartments] =
        useState([]);

    const [formData, setFormData] =
        useState({

            username: "",
            email: "",
            password: "",
            department: ""

        });

    useEffect(() => {

        loadDepartments();

    }, []);

    const loadDepartments = async () => {

        try {

            const response =
                await api.get(
                    "/admin/departments/"
                );

            setDepartments(
                response.data.results ||
                response.data
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

                "/admin/staff/",

                formData

            );

            alert(
                "Staff created successfully."
            );

            navigate(
                "/admin/staff"
            );

        }

        catch(error) {

            console.log(error);

            alert(JSON.stringify(
                error.response.data
            ) 
            );

        }

    };

    return (

        <AdminLayout>

            <div className="card">

                <div className="card-body">

                    <h2 className="mb-4">

                        Add Staff

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <input

                            className="form-control mb-3"

                            name="username"

                            placeholder="Username"

                            value={
                                formData.username
                            }

                            onChange={
                                handleChange
                            }

                        />

                        <input

                            className="form-control mb-3"

                            name="email"

                            placeholder="Email"

                            value={
                                formData.email
                            }

                            onChange={
                                handleChange
                            }

                        />

                        <input

                            className="form-control mb-3"

                            type="password"

                            name="password"

                            placeholder="Password"

                            value={
                                formData.password
                            }

                            onChange={
                                handleChange
                            }

                        />

                        <select

                            className="form-select mb-3"

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

                        <button
                            className="btn btn-success"
                        >

                            Create Staff

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CreateStaff;