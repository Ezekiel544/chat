import { useState } from "react";
import { motion } from "framer-motion";
import Auth from "./auth";
import Chat from "./chat";
import Sidebar from './sidebar'
// you are welcome here problem
import "./login.css";

const Home = () => {
  const [user, setUser] = useState(null);

  return (
    <motion.div
      className="flex h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
  
      <div className="w-72 sm:w-80 bg-gray-900 h-full">
        <Sidebar user={user} />
      </div>


      <motion.div
        className="flex flex-col flex-grow h-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {!user ? <Auth setUser={setUser} /> : <Chat user={user} />}
      </motion.div>
    </motion.div>
  );
};

export default Home;
