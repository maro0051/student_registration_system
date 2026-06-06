import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function Notifications() {

    const navigate =
        useNavigate();

    const [notifications, setNotifications] =
        useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const response =
                await api.get(
                    "/admin/notifications/"
                );

            setNotifications(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2>

                    🔔 Notifications

                </h2>

                <button

                    className="btn btn-primary"

                    onClick={() =>
                        navigate(
                            "/admin/notifications/create"
                        )
                    }

                >

                    Send Notification

                </button>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Title</th>

                                <th>Recipient</th>

                                <th>Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                notifications.map(

                                    (
                                        notification
                                    ) => (

                                        <tr
                                            key={
                                                notification.id
                                            }
                                        >

                                            <td>

                                                {
                                                    notification.id
                                                }

                                            </td>

                                            <td>

                                                {
                                                    notification.title
                                                }

                                            </td>

                                            <td>

                                                {
                                                    notification.recipient
                                                }

                                            </td>

                                            <td>

                                                {
                                                    notification.created_at
                                                }

                                            </td>

                                        </tr>

                                    )

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Notifications;