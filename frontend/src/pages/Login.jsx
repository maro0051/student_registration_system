import { useState } from "react";
import api from "../api/axios";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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

            console.log("Login Success:", response.data);

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

        } catch (error) {

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

            } else {

                alert(
                    "Unable to connect to server."
                );

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center mb-4">
                                Login
                            </h3>

                            <form
                                onSubmit={handleLogin}
                            >

                                <div className="mb-3">

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
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
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Logging in..."
                                        : "Login"}

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;