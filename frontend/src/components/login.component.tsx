import React, { useState } from 'react';
import axios from "axios";
import "../style/login.css";
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
            if (response.data.token || response.data.token !== '') {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isAdmin", response.data.isAdmin);
                window.location.href = 'http://localhost:5173/tache';
            } else {
                setError('Invalid username or password.');
            }
        }).catch(err => {
            setError('Connection error. Please try again.');
            console.error(err);
        });
    };

    return (
        <div className="split-screen">
            {/* Partie Gauche : Accueil */}
            <div className="left-pane">
                <h1>Do It Now</h1>
            </div>

            {/* Partie Droite : Formulaire */}
            <div className="right-pane">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Login</h2>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <div className="login-btn-container">
                        <button className="login-btn" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;