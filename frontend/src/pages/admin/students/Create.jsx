import { useState } from "react";
import api from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

function CreateStudent() {

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const submit = async (e) => {

        e.preventDefault();

        try {

            await api.post(

                "/admin/students/",

                {

                    username,

                    email,

                }

            );

            alert(
                "Student created"
            );

            window.location.href =
                "/admin/students";

        }

        catch(error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <h2>
                Add Student
            </h2>

            <form
                onSubmit={submit}
            >

                <input

                    className="form-control mb-3"

                    placeholder="Username"

                    value={username}

                    onChange={(e)=>
                        setUsername(
                            e.target.value
                        )
                    }

                />

                <input

                    className="form-control mb-3"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>
                        setEmail(
                            e.target.value
                        )
                    }

                />

                <button
                    className="btn btn-primary"
                >

                    Save

                </button>

            </form>

        </AdminLayout>

    );

}

export default CreateStudent;