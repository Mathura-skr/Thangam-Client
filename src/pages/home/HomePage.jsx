import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../../components/Navbar/Navigation";
import { useInView } from "react-intersection-observer";

const infoCards = [
  {
    id: 1,
    image: require("../../assets/vectors/fertilizer_vector1.png"),
    title: "Why Fertilizers Matter",
    description:
      "Fertilizers enrich the soil with essential nutrients, helping plants grow faster and healthier.",
  },
  {
    id: 2,
    image: require("../../assets/vectors/tools_vector1.png"),
    title: "Essential Gardening Tools",
    description:
      "Using the right tools like trowels and pruners improves gardening efficiency and reduces strain.",
  },
  {
    id: 3,
    image: require("../../assets/vectors/fertilizer_vector1.png"),
    title: "Types of Fertilizers",
    description:
      "Organic and synthetic fertilizers offer different benefits. Choosing the right one is key to success.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const infoRef = useRef(null);

  // Separate inView triggers for heading and cards
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [cardsRef, cardsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="flex flex-col">
      {/* Navigation */}
     
        <Navigation />
      

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={require("../../assets/images/hero_bgimg.jpg")}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 z-10 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-screen-lg"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              We take care of your beautiful garden
            </h1>
            <h2 className="text-lg md:text-xl mb-6">
              Buy & Rent for your garden from home!
            </h2>
            <button
              onClick={() => infoRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-2 text-lg bg-green-700 hover:bg-green-600 transition rounded-md"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section
        ref={infoRef}
        className="py-20 px-6 sm:px-8 md:px-16 bg-[#111111] text-white"
      >
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-500">Garden Smarter</h2>
          <p className="text-base md:text-lg text-gray-300">
            Discover how fertilizers and tools enhance your gardening experience.
          </p>
        </motion.div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {infoCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md border border-green-700 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-contain mb-6"
              />
              <h3 className="text-2xl font-bold mb-2 text-green-400">
                {card.title}
              </h3>
              <p className="text-gray-300">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
