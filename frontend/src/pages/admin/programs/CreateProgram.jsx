import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateProgram() {

    const navigate =
        useNavigate();

    const [departments, setDepartments] =
        useState([]);

    const [formData, setFormData] =
        useState({

            code: "",
            name: "",
            department: ""

        });

    useEffect(() => {

        loadDepartments();

    }, []);

    const loadDepartments = async () => {

        const response =
            await api.get(
                "/admin/departments/"
            );

        setDepartments(
            response.data.results ||
            response.data
        );

    };

    const handleChange = (
        e
    ) => {

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

        await api.post(
            "/admin/programs/",
            formData
        );

        navigate(
            "/admin/programs"
        );

    };

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h2 className="mb-4">

                        Create Program

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="mb-3">

                            <label>

                                Code

                            </label>

                            <input

                                type="text"

                                name="code"

                                className="form-control"

                                value={formData.code}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label>

                                Name

                            </label>

                            <input

                                type="text"

                                name="name"

                                className="form-control"

                                value={formData.name}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label>

                                Department

                            </label>

                            <select

                                className="form-select"

                                name="department"

                                value={formData.department}

                                onChange={handleChange}

                            >

                                <option value="">

                                    Select Department

                                </option>

                                {

                                    departments.map(

                                        (
                                            department
                                        ) => (

                                            <option

                                                key={department.id}

                                                value={department.id}

                                            >

                                                {department.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <button
                            className="btn btn-primary"
                        >

                            Save Program

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CreateProgram;