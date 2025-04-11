  import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "./firebase";
import './auth.css';
// am here problem
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInUser(email, password, navigate);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper auth-page">
      <div className="auth-container">
        <h2>Sign In</h2>
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

        <button onClick={handleSignIn} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="toggle-auth">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
