import { useEffect, useState } from "react";

import {
useNavigate,
useParams
} from "react-router-dom";

import api from "../../../api/axios";

import AdminLayout from "../../../layouts/AdminLayout";

function EditStaff() {


const navigate = useNavigate();

const { id } =
    useParams();

const [loading, setLoading] =
    useState(true);

const [departments, setDepartments] =
    useState([]);

const [formData, setFormData] =
    useState({

        username: "",

        email: "",

        department: ""

    });

useEffect(() => {

    loadData();

}, []);

const loadData = async () => {

    try {

        const staffResponse =
            await api.get(
                `/admin/staff/${id}/`
            );

        const departmentsResponse =
            await api.get(
                "/admin/departments/"
            );

        setDepartments(
            departmentsResponse.data.results ||
            departmentsResponse.data
        );

        setFormData({

            username:
                staffResponse.data.username || "",

            email:
                staffResponse.data.email || "",

            department:
                staffResponse.data.department_id || ""

        });

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

const handleSubmit = async (
    e
) => {

    e.preventDefault();

    try {

        await api.put(

            `/admin/staff/${id}/`,

            formData

        );

        alert(
            "Staff updated successfully."
        );

        navigate(
            "/admin/staff"
        );

    }

    catch(error) {

        console.error(error);

        alert(
            "Unable to update staff."
        );

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

        <div className="card shadow-sm">

            <div className="card-body">

                <h2 className="mb-4">

                    Edit Staff

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

                            type="email"

                            className="form-control"

                            name="email"

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

                        Update Staff

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

export default EditStaff;
