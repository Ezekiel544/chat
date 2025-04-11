import { useNavigate } from "react-router-dom";
import './login.css'
//  you are welcome peoblem
const Welcome = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/auth"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Chat App</h1>
      <p className="text-lg mb-6">Sign in to start chatting!</p>
      <button
        onClick={handleSignIn}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg"
      >
        Sign In
      </button>
    </div>
  );
};

export default Welcome;
