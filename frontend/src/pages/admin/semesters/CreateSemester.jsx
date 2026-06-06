import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateSemester() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({

            name: "",
            start_date: "",
            end_date: "",
            status: "ACTIVE"

        });

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
            "/admin/semesters/",
            formData
        );

        navigate(
            "/admin/semesters"
        );

    };

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h2>Create Semester</h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="mb-3">

                            <label>Name</label>

                            <input

                                type="text"

                                name="name"

                                className="form-control"

                                value={formData.name}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label>Start Date</label>

                            <input

                                type="date"

                                name="start_date"

                                className="form-control"

                                value={formData.start_date}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label>End Date</label>

                            <input

                                type="date"

                                name="end_date"

                                className="form-control"

                                value={formData.end_date}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label>Status</label>

                            <select

                                name="status"

                                className="form-select"

                                value={formData.status}

                                onChange={handleChange}

                            >

                                <option value="ACTIVE">
                                    Active
                                </option>

                                <option value="INACTIVE">
                                    Inactive
                                </option>

                            </select>

                        </div>

                        <button
                            className="btn btn-primary"
                        >

                            Save Semester

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CreateSemester;