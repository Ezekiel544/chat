import { motion, useAnimation } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGithub, FaGitAlt } from "react-icons/fa";
import { SiFramer, SiTailwindcss, SiVercel, SiRender, SiTypescript, SiSass, SiAdobephotoshop, SiAdobexd, SiFigma, SiSketch, SiAdobeillustrator, SiInvision, SiMarvelapp } from "react-icons/si";
import { useEffect } from "react";
import "./appforlio.css";

const tools = [
  { name: "HTML", icon: <FaHtml5 />, color: "bg-red-500", shape: "rounded-lg" },
  { name: "CSS", icon: <FaCss3Alt />, color: "bg-blue-500", shape: "rounded-full" },
  { name: "JavaScript", icon: <FaJs />, color: "bg-yellow-500", shape: "rounded-xl" },
  { name: "React JS", icon: <FaReact />, color: "bg-cyan-500", shape: "rounded-md" },
  { name: "Framer Motion", icon: <SiFramer />, color: "bg-purple-500", shape: "rounded-3xl" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "bg-indigo-500", shape: "rounded-md" },
  { name: "Bootstrap", icon: <FaBootstrap />, color: "bg-pink-500", shape: "rounded-lg" },
  { name: "Git", icon: <FaGitAlt />, color: "bg-orange-500", shape: "rounded-xl" },
  { name: "GitHub", icon: <FaGithub />, color: "bg-gray-700", shape: "rounded-xl" },
  { name: "Vercel", icon: <SiVercel />, color: "bg-black text-white", shape: "rounded-full" },
  { name: "Render", icon: <SiRender />, color: "bg-green-500", shape: "rounded-2xl" },
  { name: "TypeScript", icon: <SiTypescript />, color: "bg-blue-600", shape: "rounded-lg" },
  { name: "Sass/SCSS", icon: <SiSass />, color: "bg-pink-400", shape: "rounded-md" },
  { name: "Figma", icon: <SiFigma />, color: "bg-gray-900", shape: "rounded-full" },
  { name: "Adobe XD", icon: <SiAdobexd />, color: "bg-purple-700", shape: "rounded-lg" },
  { name: "Sketch", icon: <SiSketch />, color: "bg-yellow-400", shape: "rounded-xl" },
  { name: "Adobe Photoshop", icon: <SiAdobephotoshop />, color: "bg-blue-900", shape: "rounded-md" },
  { name: "Adobe Illustrator", icon: <SiAdobeillustrator />, color: "bg-orange-600", shape: "rounded-lg" },
  { name: "InVision", icon: <SiInvision />, color: "bg-red-600", shape: "rounded-md" },
  { name: "Marvel", icon: <SiMarvelapp />, color: "bg-blue-500", shape: "rounded-full" },
];

const Workload = () => {
  const controls = useAnimation();

  // Faster animation speed
  const duration = window.innerWidth > 768 ? 30 : 20; // Large: 30s, Small: 20s

  useEffect(() => {
    controls.start({
      x: "-100%",
      transition: {
        repeat: Infinity,
        duration: duration,
        ease: "linear",
      },
    });
  }, [controls, duration]);

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-900 text-white text-center">
      {/* Title */}
      <motion.h1
  className="text-3xl md:text-5xl font-extrabold"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  Tools That I Work With
</motion.h1>

      {/* Marquee Effect */}
      <div className="overflow-hidden mt-10 relative">
        <motion.div
          className="flex space-x-8"
          animate={controls}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {[...tools, ...tools].map((tool, index) => (
            <motion.div
              key={index}
              className={`px-6 py-3 text-lg md:text-xl font-bold flex items-center gap-2 ${tool.color} ${tool.shape} shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => controls.stop()} // Pause on hover
              onMouseLeave={() =>
                controls.start({
                  x: "-100%",
                  transition: {
                    repeat: Infinity,
                    duration: duration,
                    ease: "linear",
                  },
                })
              } // Resume on leave
            >
              <span className="text-2xl">{tool.icon}</span>
              {tool.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Workload;
