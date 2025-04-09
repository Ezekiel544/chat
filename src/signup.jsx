// Signup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
            <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
        </div>
    );
};

export default Signup;
