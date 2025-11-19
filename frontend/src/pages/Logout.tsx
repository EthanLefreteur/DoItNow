import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import React from "react";

const Logout: React.FC = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        setToken(null);
        navigate("/", { replace: true });
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            handleLogout();
        }, 3 * 1000);

        return () => clearTimeout(timer);
    }, []);

    return <>Logout Page</>;
};

export default Logout;