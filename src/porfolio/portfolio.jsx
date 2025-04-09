import { motion } from "framer-motion";
import Picone from './picone.png';
import Pictwoo from './pictwoo.png';
import Picthree from './picthree.png';
import Picfour from './picthree.png'; // New image
import Picfive from './pictwoo.png'; // New image
import Picsix from './picone.png'; // New image

const Folio = () => {
  const projects = [
    { id: 1, title: "Smfest Website", image: Picone, link: "https://smfest-project.vercel.app/" },
    { id: 2, title: "Sheif Cuisine Website", image: Pictwoo, link: "https://sheif-cuisine.vercel.app/" },
    { id: 3, title: "Movie Website", image: Picthree, link: "https://movie-time-mu.vercel.app/" },
    { id: 4, title: "E-Commerce Website", image: Picfour, link: "https://your-ecommerce-site.com" },
    { id: 5, title: "Blog Platform", image: Picfive, link: "https://your-blog-platform.com" },
    { id: 6, title: "Portfolio Website", image: Picsix, link: "https://your-portfolio-site.com" },
  ];
 
  return (
    <section className="py-24 px-6 md:px-20 bg-gray-900 from-gray-900 to-gray-800 text-white " id="portfolio">
      {/* Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold text-center relative inline-block"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Portfolio
        <motion.div
          className="absolute left-0 bottom-0 w-full h-1 bg-green-500 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.h2>

      {/* Grid for Portfolio Items */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gray-700"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover transition-opacity duration-500 group-hover:opacity-75"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h3 className="text-lg font-semibold text-white mb-4">{project.title}</h3>

              {/* Visit Website Button */}
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-6 py-3 text-white font-bold bg-green-500 rounded-full shadow-lg hover:bg-green-400 transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Visit Website
                <motion.div
                  className="absolute inset-0 border-2 border-green-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      <motion.div
        className="mt-14 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <a
          href="#contact"
          className="bg-green-500 hover:bg-green-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
        >
          View More Projects
        </a>
      </motion.div>
    </section>
  );
};

export default Folio;
