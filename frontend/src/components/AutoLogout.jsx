import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AutoLogout() {

    const navigate = useNavigate();

    useEffect(() => {

        let timeout;

        const resetTimer = () => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                localStorage.removeItem(
                    "access"
                );

                localStorage.removeItem(
                    "refresh"
                );

                alert(
                    "Session expired due to inactivity"
                );

                navigate("/login");

            }, 10 * 60 * 1000);

        };

        window.addEventListener(
            "mousemove",
            resetTimer
        );

        window.addEventListener(
            "keypress",
            resetTimer
        );

        window.addEventListener(
            "click",
            resetTimer
        );

        resetTimer();

        return () => {

            clearTimeout(timeout);

            window.removeEventListener(
                "mousemove",
                resetTimer
            );

            window.removeEventListener(
                "keypress",
                resetTimer
            );

            window.removeEventListener(
                "click",
                resetTimer
            );

        };

    }, [navigate]);

    return null;

}

export default AutoLogout;