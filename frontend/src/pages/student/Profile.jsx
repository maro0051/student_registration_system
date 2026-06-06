import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import StudentLayout from "../../layouts/StudentLayout";

function Profile() {


const navigate = useNavigate();

const [profile, setProfile] =
    useState(null);

const [editing, setEditing] =
    useState(false);

const [selectedFile, setSelectedFile] =
    useState(null);

useEffect(() => {

    loadProfile();

}, []);

const loadProfile = async () => {

    try {

        const response =
            await api.get(
                "/student/profile/"
            );

        setProfile(
            response.data
        );

    }

    catch (error) {

        console.error(error);

    }

};

const saveProfile = async () => {

    try {

        const formData =
            new FormData();

        formData.append(

            "phone_number",

            profile.phone_number || ""

        );

        formData.append(

            "address",

            profile.address || ""

        );

        formData.append(

            "emergency_contact",

            profile.emergency_contact || ""

        );

        if (selectedFile) {

            formData.append(

                "profile_picture",

                selectedFile

            );

        }

        await api.put(

            "/student/profile/update/",

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

        setEditing(false);

        loadProfile();

    }

    catch (error) {

        console.error(error);

        alert(
            "Failed to update profile"
        );

    }

};

if (!profile) {

    return (

        <StudentLayout>

            <div className="text-center mt-5">

                <div className="spinner-border" />

            </div>

        </StudentLayout>

    );

}

return (

    <StudentLayout>

        <div className="d-flex align-items-center mb-4">

            <button

                className="btn btn-secondary me-3"

                onClick={() =>
                    navigate(-1)
                }

            >

                ← Back

            </button>

            <h2 className="mb-0">

                My Profile

            </h2>

        </div>

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div className="row">

                    <div className="col-md-3 text-center">

                        {

                            profile.profile_picture

                            ?

                            (

                                <img

                                    src={
                                        `http://127.0.0.1:8000${profile.profile_picture}`
                                    }

                                    alt="Profile"

                                    className="img-fluid rounded-circle"

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

                                    className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto"

                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        fontSize: "60px"
                                    }}

                                >

                                    👤

                                </div>

                            )

                        }

                        {

                            editing

                            &&

                            <div className="mt-3">

                                <input

                                    type="file"

                                    className="form-control"

                                    accept="image/*"

                                    onChange={(e) =>

                                        setSelectedFile(
                                            e.target.files[0]
                                        )

                                    }

                                />

                            </div>

                        }

                    </div>

                    <div className="col-md-9">

                        <table className="table">

                            <tbody>

                                <tr>

                                    <th>

                                        Student ID

                                    </th>

                                    <td>

                                        {profile.student_id}

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Username

                                    </th>

                                    <td>

                                        {profile.username}

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Email

                                    </th>

                                    <td>

                                        {profile.email}

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Program

                                    </th>

                                    <td>

                                        {profile.program}

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Department

                                    </th>

                                    <td>

                                        {profile.department}

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Phone Number

                                    </th>

                                    <td>

                                        {

                                            editing

                                            ?

                                            (

                                                <input

                                                    type="text"

                                                    className="form-control"

                                                    value={
                                                        profile.phone_number || ""
                                                    }

                                                    onChange={(e) =>

                                                        setProfile({

                                                            ...profile,

                                                            phone_number:
                                                                e.target.value

                                                        })

                                                    }

                                                />

                                            )

                                            :

                                            (

                                                profile.phone_number || "-"

                                            )

                                        }

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Address

                                    </th>

                                    <td>

                                        {

                                            editing

                                            ?

                                            (

                                                <textarea

                                                    className="form-control"

                                                    rows="3"

                                                    value={
                                                        profile.address || ""
                                                    }

                                                    onChange={(e) =>

                                                        setProfile({

                                                            ...profile,

                                                            address:
                                                                e.target.value

                                                        })

                                                    }

                                                />

                                            )

                                            :

                                            (

                                                profile.address || "-"

                                            )

                                        }

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Date Of Birth

                                    </th>

                                    <td>

                                        {profile.date_of_birth || "-"}

                                    </td>

                                </tr>

                                <tr>

                                    <th>

                                        Emergency Contact

                                    </th>

                                    <td>

                                        {

                                            editing

                                            ?

                                            (

                                                <input

                                                    type="text"

                                                    className="form-control"

                                                    value={
                                                        profile.emergency_contact || ""
                                                    }

                                                    onChange={(e) =>

                                                        setProfile({

                                                            ...profile,

                                                            emergency_contact:
                                                                e.target.value

                                                        })

                                                    }

                                                />

                                            )

                                            :

                                            (

                                                profile.emergency_contact || "-"

                                            )

                                        }

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                        <div className="mt-4">

                            {

                                !editing

                                ?

                                (

                                    <button

                                        className="btn btn-primary"

                                        onClick={() =>
                                            setEditing(true)
                                        }

                                    >

                                        Update Profile

                                    </button>

                                )

                                :

                                (

                                    <>

                                        <button

                                            className="btn btn-success me-2"

                                            onClick={saveProfile}

                                        >

                                            Save Changes

                                        </button>

                                        <button

                                            className="btn btn-secondary"

                                            onClick={() => {

                                                setEditing(false);

                                                loadProfile();

                                            }}

                                        >

                                            Cancel

                                        </button>

                                    </>

                                )

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </StudentLayout>

);


}

export default Profile;
