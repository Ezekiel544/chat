import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./appforlio.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 z-50 ${
        isScrolled ? "bg-gray-950 /80 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 ">
        <h1 className="text-2xl font-bold text-blue">Ezekiel</h1>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-gray-400 cursor-pointer" >Home</li>
          <li><a href="#about" className="hover:text-gray-400 cursor-pointer">About</a></li>
          <li><a href="#portfolio" className="hover:text-gray-400 cursor-pointer">Portfolio</a></li>
          <li><a href="#contact" className="hover:text-gray-400 cursor-pointer">Contact</a></li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
