import React, { useState } from 'react';
import '../style/login2.css';
import axios from "axios";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }

        axios.post("http://127.0.0.1:8000" + "/login", {
            identifiant: username,
            mot_de_passe: password,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.token || response.data.token != '') {
                localStorage.setItem("token", response.data.token);
                window.location.href = 'http://localhost:5173/task';
                return;
            } else {
                setError('Invalid username or password.');
            }
        })
    };

    return (
        <>
            <div className="login-page">
                <h1>Login</h1>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    );
}

export default LoginPage;