import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-gray-900 from-gray-900 to-gray-800 text-white" id="about">
      {/* Title with Underline Effect */}
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold relative inline-block"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Me
        <motion.div
          className="absolute left-0 bottom-0 w-full h-1 bg-green-500 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mt-6 max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Driven by a passion for solving real-world problems, I'm a{" "}
        <span className="text-green-400 font-semibold">front-end developer</span>{" "}
        who creates innovative tech solutions that make a difference. I thrive on{" "}
        <span className="text-green-400 font-semibold">collaboration</span>, working 
        with UI designers, backend developers, and other team members to bring impactful 
        ideas to life. My strong{" "}
        <span className="text-green-400 font-semibold">soft skills</span>, including 
        effective communication and teamwork, ensure smooth project execution and 
        successful results.
      </motion.p>

      {/* Animated Call-to-Action */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <a
          href="#portfolio"
          className="bg-green-500 hover:bg-green-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
        >
          Explore My Work
        </a>
      </motion.div>
    </section>
  );
};

export default About;

