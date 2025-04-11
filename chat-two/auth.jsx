import React from "react";
import { useNavigate } from "react-router-dom";
import './auth.css';
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section here prob*/}
      <motion.div
        className="hero-section"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="hero-title">Welcome to Chatterly</h1>
        <p className="hero-subtitle">
          Chatterly is a modern chat app where you can connect with friends, share ideas, and build conversations in real-time.
        </p>

        <motion.div
          className="auth-landing-buttons"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            className="landing-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </motion.button>

          <motion.button
            className="landing-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
