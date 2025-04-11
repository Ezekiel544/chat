import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./firebase";
import './auth.css';
// you are welcome provlem
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please and please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password, navigate);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper auth-page">
      <div className="auth-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSignUp} disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p className="toggle-auth">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
