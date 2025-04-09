import Counter from "./counter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Bitimage from "./bitimage.jpg";

// Stats Data
const stats = [
  { id: 1, label: "Projects Completed", value: 20, symbol: "+", duration: 7 },
  { id: 2, label: "Satisfied Clients", value: 100, symbol: "%", duration: 1.5 },
  { id: 3, label: "Positive Reviews", value: 20, symbol: "+", duration: 7 },
];

const BitMore = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px", once: false });

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-16 bg-gray-900 text-white flex flex-col md:flex-row items-center gap-10"
    >
      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/3"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <img src={Bitimage} alt="Portfolio preview" className="w-full rounded-lg shadow-lg" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="w-full md:w-2/3 text-center md:text-left"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">A bit about me...</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
        As a front-end developer, I thrive on the challenge of crafting seamless, user-centric designs that are both visually stunning and highly functional.  I write code that not only solves problems but also enhances user experiences in meaningful ways.
        </p>

        {/* Stats Section */}
        <div className="flex justify-center md:justify-start space-x-8 mt-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 1, delay: stat.id * 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <Counter
                from={1}
                to={stat.value}
                symbol={stat.symbol}
                isVisible={isInView}
                duration={stat.duration}
              />
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BitMore;
