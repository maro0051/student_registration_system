import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StaffLayout from "../../layouts/StaffLayout";

function StaffProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] =
        useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response =
                await api.get(
                    "/staff/profile/"
                );

            setProfile(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!profile) {

        return (

            <StaffLayout>

                <div className="text-center mt-5">

                    <div className="spinner-border text-primary" />

                </div>

            </StaffLayout>

        );

    }

    return (

        <StaffLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    My Profile

                </h2>

                <button

                    className="btn btn-secondary"

                    onClick={() =>
                        navigate(-1)
                    }

                >

                    ← Back

                </button>

            </div>

            <div className="card">

                <div className="card-body">

                    <div className="text-center mb-4">

                        {

                            profile.profile_picture

                            ?

                            (

                                <img

                                    src={
                                        profile.profile_picture
                                    }

                                    alt="Profile"

                                    className="
                                        rounded-circle
                                        border
                                    "

                                    style={{

                                        width: "150px",

                                        height: "150px",

                                        objectFit: "cover"

                                    }}

                                />

                            )

                            :

                            (

                                <div

                                    className="
                                        bg-light
                                        rounded-circle
                                        mx-auto
                                        d-flex
                                        align-items-center
                                        justify-content-center
                                    "

                                    style={{

                                        width: "150px",

                                        height: "150px",

                                        fontSize: "3rem"

                                    }}

                                >

                                    👨‍🏫

                                </div>

                            )

                        }

                    </div>

                    <table className="table">

                        <tbody>

                            <tr>
                                <th>Employee ID</th>
                                <td>{profile.employee_id}</td>
                            </tr>

                            <tr>
                                <th>Username</th>
                                <td>{profile.username}</td>
                            </tr>

                            <tr>
                                <th>Name</th>
                                <td>{profile.name}</td>
                            </tr>

                            <tr>
                                <th>Department</th>
                                <td>{profile.department}</td>
                            </tr>

                            <tr>
                                <th>Phone Number</th>
                                <td>{profile.phone_number}</td>
                            </tr>

                            <tr>
                                <th>Address</th>
                                <td>{profile.address}</td>
                            </tr>

                        </tbody>

                    </table>

                    <button

                        className="btn btn-primary"

                        onClick={() =>

                            navigate(
                                "/staff/profile/update"
                            )

                        }

                    >

                        Update Profile

                    </button>

                </div>

            </div>

        </StaffLayout>

    );

}

export default StaffProfile;