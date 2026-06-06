import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function EditProgram() {

    const { id } =
        useParams();

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

        loadProgram();

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

        catch (error) {

            console.error(error);

        }

    };

    const loadProgram = async () => {

        try {

            const response =
                await api.get(
                    `/admin/programs/${id}/`
                );

            setFormData({

                code:
                    response.data.code || "",

                name:
                    response.data.name || "",

                department:
                    response.data.department || ""

            });

        }

        catch (error) {

            console.error(error);

        }

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

        try {

            await api.put(

                `/admin/programs/${id}/`,

                formData

            );

            navigate(
                "/admin/programs"
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h2 className="mb-4">

                        Edit Program

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="mb-3">

                            <label className="form-label">

                                Program Code

                            </label>

                            <input

                                type="text"

                                name="code"

                                className="form-control"

                                value={
                                    formData.code
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Program Name

                            </label>

                            <input

                                type="text"

                                name="name"

                                className="form-control"

                                value={
                                    formData.name
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

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

                                {

                                    departments.map(

                                        (
                                            department
                                        ) => (

                                            <option

                                                key={
                                                    department.id
                                                }

                                                value={
                                                    department.id
                                                }

                                            >

                                                {
                                                    department.name
                                                }

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <button
                            className="btn btn-primary"
                        >

                            Update Program

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default EditProgram;