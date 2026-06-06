import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateNotification() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({

            title: "",

            message: "",

            recipient: "ALL"

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

        try {

            await api.post(

                "/admin/notifications/",

                formData

            );

            navigate(
                "/admin/notifications"
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

                        Send Notification

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="mb-3">

                            <label>

                                Title

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="title"

                                value={
                                    formData.title
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label>

                                Message

                            </label>

                            <textarea

                                rows="5"

                                className="form-control"

                                name="message"

                                value={
                                    formData.message
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>

                        <div className="mb-4">

                            <label>

                                Recipient

                            </label>

                            <select

                                className="form-select"

                                name="recipient"

                                value={
                                    formData.recipient
                                }

                                onChange={
                                    handleChange
                                }

                            >

                                <option value="ALL">

                                    All Users

                                </option>

                                <option value="STUDENTS">

                                    Students

                                </option>

                                <option value="STAFF">

                                    Staff

                                </option>

                            </select>

                        </div>

                        <button
                            className="btn btn-primary"
                        >

                            Send

                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CreateNotification;