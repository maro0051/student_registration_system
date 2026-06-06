import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateDepartment() {


const navigate = useNavigate();

const [formData, setFormData] =
    useState({

        name: "",
        code: ""

    });

const handleChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]:
            e.target.value

    });

};

const submit = async (
    e
) => {

    e.preventDefault();

    await api.post(

        "/admin/departments/",

        formData

    );

    navigate(
        "/admin/departments"
    );

};

return (

    <AdminLayout>

        <div className="card">

            <div className="card-body">

                <h2>
                    Add Department
                </h2>

                <form
                    onSubmit={
                        submit
                    }
                >

                    <input

                        className="form-control mb-3"

                        placeholder="Department Name"

                        name="name"

                        value={
                            formData.name
                        }

                        onChange={
                            handleChange
                        }

                    />

                    <input

                        className="form-control mb-3"

                        placeholder="Department Code"

                        name="code"

                        value={
                            formData.code
                        }

                        onChange={
                            handleChange
                        }

                    />

                    <button
                        className="btn btn-success"
                    >

                        Create Department

                    </button>

                </form>

            </div>

        </div>

    </AdminLayout>

);


}

export default CreateDepartment;
