import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function EditGrade() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({

            student: "",

            course: "",

            midterm_grade: "",

            final_grade: ""

        });

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadGrade();

    }, []);

    const loadGrade = async () => {

        try {

            const response =
                await api.get(
                    `/admin/grades/${id}/`
                );

            setFormData(
                response.data
            );

        }

        catch(error) {

            console.error(error);

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

            const payload = {

                midterm_grade:

                    formData.midterm_grade === ""

                    ? null

                    : formData.midterm_grade,

                final_grade:

                    formData.final_grade === ""

                    ? null

                    : formData.final_grade

            };

            await api.put(

                `/admin/grades/${id}/`,

                payload

            );

            alert(
                "Grades updated successfully"
            );

            navigate(
                "/admin/grades"
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

                        Edit Grades

                    </h2>

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
                                onSubmit={handleSubmit}
                            >

                                <div className="mb-3">

                                    <label>

                                        Student

                                    </label>

                                    <input

                                        className="form-control"

                                        value={
                                            formData.student
                                        }

                                        disabled

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Course

                                    </label>

                                    <input

                                        className="form-control"

                                        value={
                                            formData.course
                                        }

                                        disabled

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Midterm Grade

                                    </label>

                                    <input

                                        type="number"

                                        step="0.01"

                                        className="form-control"

                                        name="midterm_grade"

                                        value={
                                            formData.midterm_grade ?? ""
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />

                                </div>

                                <div className="mb-4">

                                    <label>

                                        Final Grade

                                    </label>

                                    <input

                                        type="number"

                                        step="0.01"

                                        className="form-control"

                                        name="final_grade"

                                        value={
                                            formData.final_grade ?? ""
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />

                                </div>

                                <button

                                    type="submit"

                                    className="btn btn-primary"

                                >

                                    Update Grades

                                </button>

                            </form>

                        )

                    }

                </div>

            </div>

        </AdminLayout>

    );

}

export default EditGrade;