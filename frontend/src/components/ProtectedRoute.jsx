import { Navigate } from "react-router-dom";

function ProtectedRoute({
    children,
    allowedRole,
}) {

    const token =
        localStorage.getItem(
            "access"
        );

    const role =
        localStorage.getItem(
            "user"
        );

    if (!token) {

        return (
            <Navigate
                to="/login"
            />
        );

    }

    if (
        allowedRole &&
        role !== allowedRole
    ) {

        return (
            <Navigate
                to="/login"
            />
        );

    }

    return children;

}

export default ProtectedRoute;