import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaEnvelope, FaFacebook, FaWhatsapp, FaPhone } from "react-icons/fa";

const socialLinks = [
  { id: 1, icon: <FaLinkedin size={20} />, label: "LinkedIn", href: "#" },
  { id: 2, icon: <FaTwitter size={20} />, label: "Twitter", href: "#" },
  { id: 3, icon: <FaEnvelope size={20} />, label: "Email", href: "#" },
  { id: 4, icon: <FaFacebook size={20} />, label: "Facebook", href: "#" },
  { id: 5, icon: <FaWhatsapp size={20} />, label: "WhatsApp", href: "#" },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="py-16 px-6 bg-gray-900 text-white text-center"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Title */}
        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Let’s Create Together
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Thank you for exploring my work! If you’re ready to create something extraordinary or just 
          want to chat about design, I’d love to hear from you. Let’s make your next project unforgettable.
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full flex items-center mx-auto transition duration-300 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Let’s Talk <FaPhone className="ml-2" />
        </motion.button>

        {/* Social Media Links */}
        <motion.div
          className="flex flex-wrap justify-center items-center space-x-6 mt-8 text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              className="flex items-center space-x-2 hover:text-white transition"
              whileHover={{ y: -3, scale: 1.1 }}
            >
              {link.icon} <span>{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-gray-500 text-sm mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          © 2025 Kelvin Chikezie. All rights reserved.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
