import Navbar from "./navbar";
import Hero from "./hero";
import About from "./about";
import Portfolio from "./portfolio";
import Workload from './workload'
import Bitmore from './bitmore.jsx'
import Contact from "./contact";
import Footer from "./footer";

import './appforlio.css'
function Appforlio() {
  return (
    <div className="bg-black text-white ">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Workload />
      <Bitmore />
      <Contact />
      <Footer />
    </div>
  );
}

export default Appforlio;
