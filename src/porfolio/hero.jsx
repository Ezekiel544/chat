import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroImage from "./image.png"; // Replace with your actual image path

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Ezekiel";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white pt-15">
      {/* Intro Section */}
      <section className="h-[60vh] flex items-center justify-center text-center" >
        <motion.h1
          className="text-5xl md:text-7xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {text}
          <motion.span
            className="inline-block"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 20, 0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            👋
          </motion.span>
        </motion.h1>
      </section>
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-3">
        {/* Left Content */}
        <motion.div
          className="max-w-xl text-left"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            Creative User <br /> Experience/frontend <br /> developer
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            My approach to web development combines empathy, strategy, and creativity. Fun
            fact? I find inspiration in everyday interactions, which helps me
            code ideas  that feel natural and human.
          </p>
        </motion.div>
        
        {/* Right Image */}
        <motion.div
          className="relative mt-10 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <div className="bg-gray-800 rounded-xl p-4">
            <img
              src={heroImage}
              alt="User Experience Specialist"
              className="w-80 md:w-[500px] rounded-lg"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
