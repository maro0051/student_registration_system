import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function EditDepartment() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [formData, setFormData] =
        useState({

            name: "",

            code: "",

            description: ""

        });

    useEffect(() => {

        loadDepartment();

    }, []);

    const loadDepartment = async () => {

        try {

            const response =
                await api.get(
                    `/admin/departments/${id}/`
                );

            setFormData({

                name:
                    response.data.name || "",

                code:
                    response.data.code || "",

                description:
                    response.data.description || ""

            });

        }

        catch(error) {

            console.error(error);

            alert(
                "Unable to load department"
            );

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(

                `/admin/departments/${id}/`,

                formData

            );

            alert(
                "Department updated successfully"
            );

            navigate(
                "/admin/departments"
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

            <div className="px-3">

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h2 className="fw-bold mb-1">

                                    ✏️ Edit Department

                                </h2>

                                <p className="text-muted mb-0">

                                    Update department information

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        {

                            loading

                            ?

                            (

                                <div className="text-center py-5">

                                    <div className="spinner-border" />

                                </div>

                            )

                            :

                            (

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Department Name

                                        </label>

                                        <input

                                            type="text"

                                            name="name"

                                            className="form-control"

                                            value={formData.name}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Department Code

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

                                        <label className="form-label">

                                            Description

                                        </label>

                                        <textarea

                                            name="description"

                                            rows="4"

                                            className="form-control"

                                            value={formData.description}

                                            onChange={handleChange}

                                        />

                                    </div>

                                    <button

                                        type="submit"

                                        className="btn btn-primary me-2"

                                    >

                                        Save Changes

                                    </button>

                                    <button

                                        type="button"

                                        className="btn btn-secondary"

                                        onClick={() =>
                                            navigate(
                                                "/admin/departments"
                                            )
                                        }

                                    >

                                        Cancel

                                    </button>

                                </form>

                            )

                        }

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
                

            </div>

        </AdminLayout>

    );

}

export default EditDepartment;