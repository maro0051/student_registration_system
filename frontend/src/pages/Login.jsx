import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {

    const navigate = useNavigate();


const [username, setUsername] =
    useState("");

const [password, setPassword] =
    useState("");

const [loading, setLoading] =
    useState(false);

const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

        const response = await api.post(

            "/auth/login/",

            {
                username,
                password,
            }

        );

        console.log(
            "Login Success:",
            response.data
        );

        localStorage.setItem(
            "access",
            response.data.access
        );

        localStorage.setItem(
            "refresh",
            response.data.refresh
        );

        localStorage.setItem(
            "user",
            response.data.user.role
        );

        localStorage.setItem(
            "username",
            response.data.user.username
        );

        const role =
            response.data.user.role;

        if (role === "STUDENT") {

            window.location.href =
                "/student";

        }

        else if (role === "STAFF") {

            window.location.href =
                "/staff";

        }

        else if (role === "ADMIN") {

            window.location.href =
                "/admin";

        }

        else {

            alert(
                `Unknown role: ${role}`
            );

        }

    }

    catch (error) {

        console.error(
            "Login Error:",
            error
        );

        console.error(
            "Response:",
            error.response
        );

        if (
            error.response &&
            error.response.data
        ) {

            alert(
                JSON.stringify(
                    error.response.data
                )
            );

        }

        else {

            alert(
                "Unable to connect to server."
            );

        }

    }

    finally {

        setLoading(false);

    }

};

return (

    <div

        className="
            min-vh-100
            d-flex
            align-items-center
            justify-content-center
        "

        style={{

            background:

                "linear-gradient(135deg,#ecfdf5,#dcfce7,#bbf7d0)"

        }}

    >

        <div className="container">
            <div className="mb-3">

               <button
                   type="button"
                   className="btn btn-danger btn-sm"
                   onClick={() => navigate("/")}
                >
                    ← Back to Home
                </button>

            </div>

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div

                        className="card shadow-lg border-0"

                        style={{

                            borderRadius:
                                "24px"

                        }}

                    >

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <div

                                    style={{

                                        fontSize:
                                            "4rem"

                                    }}

                                >

                                    🎓

                                </div>

                                <h2

                                    className="
                                        fw-bold
                                        text-success
                                    "

                                >

                                    EduAdmin

                                </h2>

                                <p
                                    className="text-muted"
                                >

                                    Student Registration System

                                    only login as student or Staff

                                </p>

                            </div>

                            <form
                                onSubmit={handleLogin}
                            >

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >

                                        Username

                                    </label>

                                    <input

                                        type="text"

                                        className="
                                            form-control
                                        "

                                        placeholder="Enter username"

                                        value={username}

                                        onChange={(e) =>

                                            setUsername(

                                                e.target.value

                                            )

                                        }

                                        required

                                    />

                                </div>

                                <div className="mb-4">

                                    <label
                                        className="form-label"
                                    >

                                        Password

                                    </label>

                                    <input

                                        type="password"

                                        className="
                                            form-control
                                        "

                                        placeholder="Enter password"

                                        value={password}

                                        onChange={(e) =>

                                            setPassword(

                                                e.target.value

                                            )

                                        }

                                        required

                                    />

                                </div>

                                <button

                                    type="submit"

                                    className="
                                        btn
                                        btn-success
                                        w-100
                                    "

                                    disabled={loading}

                                >

                                    {

                                        loading

                                        ?

                                        "Logging in..."

                                        :

                                        "Login"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);


}

export default Login;
