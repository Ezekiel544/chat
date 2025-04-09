import React from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
        </div>
    );
};

export default Login;

