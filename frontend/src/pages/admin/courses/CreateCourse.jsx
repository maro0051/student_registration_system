import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateCourse() {

    const navigate =
        useNavigate();

    const [programs, setPrograms] =
        useState([]);

    const [formData, setFormData] =
        useState({

            code: "",
            name: "",
            credits: "",
            program: ""

        });

    useEffect(() => {

        loadPrograms();

    }, []);

    const loadPrograms = async () => {

        const response =
            await api.get(
                "/admin/programs/"
            );

        setPrograms(
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
            "/admin/courses/",
            formData
        );

        navigate(
            "/admin/courses"
        );

    };

    return (

        <AdminLayout>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h2 className="mb-4">
                        Create Course
                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="mb-3">

                            <label>
                                Course Code
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
                                Course Name
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
                                Credits
                            </label>

                            <input

                                type="number"

                                name="credits"

                                className="form-control"

                                value={formData.credits}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-4">

                            <label>
                                Program
                            </label>

                            <select

                                className="form-select"

                                name="program"

                                value={formData.program}

                                onChange={handleChange}

                            >

                                <option value="">
                                    Select Program
                                </option>

                                {

                                    programs.map(

                                        (program) => (

                                            <option

                                                key={program.id}

                                                value={program.id}

                                            >

                                                {program.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <button
                            className="btn btn-primary"
                        >

                            Save Course

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

export default CreateCourse;