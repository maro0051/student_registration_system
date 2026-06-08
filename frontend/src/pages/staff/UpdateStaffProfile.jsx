import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StaffLayout from "../../layouts/StaffLayout";

function UpdateStaffProfile() {

    const navigate =
        useNavigate();

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [profilePicture, setProfilePicture] =
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

            setPhoneNumber(
                response.data.phone_number || ""
            );

            setAddress(
                response.data.address || ""
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const saveProfile = async (
        e
    ) => {

        e.preventDefault();

        try {

            const formData =
                new FormData();

            formData.append(
                "phone_number",
                phoneNumber
            );

            formData.append(
                "address",
                address
            );

            if (
                profilePicture
            ) {

                formData.append(
                    "profile_picture",
                    profilePicture
                );

            }

            await api.put(

                "/staff/profile/update/",

                formData,

                {

                    headers: {

                        "Content-Type":
                            "multipart/form-data"

                    }

                }

            );

            alert(
                "Profile updated successfully"
            );

            navigate(
                "/staff/staffprofile"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Update failed"
            );

        }

    };

    return (

        <StaffLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Update Your Profile

                </h2>

                

            </div>

            <div className="card">

                <div className="card-body">

                    <form
                        onSubmit={
                            saveProfile
                        }
                    >

                        <div className="mb-3">

                            <label className="form-label">

                                Profile Picture

                            </label>

                            <input

                                type="file"

                                className="form-control"

                                onChange={(e) =>

                                    setProfilePicture(
                                        e.target.files[0]
                                    )

                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Phone Number

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                value={phoneNumber}

                                onChange={(e) =>
                                    setPhoneNumber(
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Address

                            </label>

                            <textarea

                                rows="4"

                                className="form-control"

                                value={address}

                                onChange={(e) =>
                                    setAddress(
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                        <button

                            type="submit"

                            className="
                                btn
                                btn-primary
                            "

                        >

                            Save Changes

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

        </StaffLayout>

    );

}

export default UpdateStaffProfile;