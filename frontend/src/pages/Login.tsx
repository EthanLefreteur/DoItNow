import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import React from "react";

const Login: React.FC = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (): void => {
        setToken("this is a test token");
        navigate("/", { replace: true });
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            handleLogin();
        }, 3 * 1000);

        return () => clearTimeout(timer);
    }, []);

    return <>Login Page</>;
};

export default Login;