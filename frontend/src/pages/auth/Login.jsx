import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function Login() {

    const navigate =
        useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response =
                await api.post(

                    "/auth/login/",

                    {
                        username,
                        password
                    }

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
                "role",
                response.data.role
            );

            if (

                response.data.role ===
                "ADMIN"

            ) {

                navigate("/admin");

            }

            else if (

                response.data.role ===
                "STAFF"

            ) {

                navigate(
                    "/staff/staffdashboard"
                );

            }

            else {

                navigate(
                    "/student/dashboard"
                );

            }

        }

        catch {

            setError(
                "Invalid username or password"
            );

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

                    "linear-gradient(135deg,#16a34a,#22c55e,#86efac)"

            }}

        >

            <div

                className="card border-0"

                style={{

                    width: "100%",

                    maxWidth: "450px",

                    borderRadius: "25px",

                    backdropFilter:
                        "blur(10px)",

                    boxShadow:
                        "0 25px 50px rgba(0,0,0,.15)"

                }}

            >

                <div className="card-body p-5">

                    <div className="text-center mb-4">

                        <div

                            style={{

                                width: "90px",

                                height: "90px",

                                margin: "auto",

                                borderRadius: "50%",

                                background:

                                    "linear-gradient(135deg,#16a34a,#22c55e)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                fontSize: "40px",

                                color: "white"

                            }}

                        >

                            🎓

                        </div>

                        <h2

                            className="mt-3 fw-bold"

                            style={{
                                color: "#166534"
                            }}

                        >

                            EduAdmin Portal

                        </h2>

                        <p
                            className="text-muted"
                        >

                            Student Registration System

                        </p>

                    </div>

                    {

                        error && (

                            <div

                                className="
                                    alert
                                    alert-danger
                                "

                            >

                                {error}

                            </div>

                        )

                    }

                    <form
                        onSubmit={
                            handleSubmit
                        }
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
                                    form-control-lg
                                "

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
                                    form-control-lg
                                "

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

                            disabled={loading}

                            className="
                                btn
                                btn-success
                                btn-lg
                                w-100
                            "

                        >

                            {

                                loading

                                ?

                                "Signing In..."

                                :

                                "Login"

                            }

                        </button>

                    </form>

                    <div
                        className="
                            text-center
                            mt-4
                        "
                    >

                        <small
                            className="text-muted"
                        >

                            Academic Management System

                        </small>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;