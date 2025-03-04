import React, { useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import FilterPanel from "../../components/Filter/FilterPanel";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredItems = [
    {
      id: 1,
      image: require("../../assets/images/fer1.png"),
      alt: "Urea",
      label: "Urea",
      price: 500,
      rating: "4.5",
      description: "Provides plants with nitrogen for growth and photosynthesis."
    },
    {
      id: 2,
      image: require("../../assets/images/tool_img1.png"),
      alt: "Gardening Tools",
      label: "Hand Shovel",
      price: 2005,
      rating: "4.7",
      description: "Essential tools for every gardener."
    }
  ];

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[600px]">
        <img
          src={require("../../assets/images/hero_bgimg.jpg")}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* <img
          src={require("../../assets/images/hero_img1.png")}
          alt="Hero Overlay"
          className="absolute top-16 right-0 h-full max-w-full object-contain z-10"
        /> */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div className="max-w-lg text-center">
            <h1 className="text-5xl font-bold mb-4 shadow-lg">Welcome to THANGAM</h1>
            <h2 className="text-xl mb-6 shadow-md">Buy & Rent for your garden from home!</h2>
            <button
              className="px-6 py-2 text-lg bg-green-800 outline outline-2 outline-transparent hover:outline-white rounded-md"
              onClick={() => navigate("")}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row p-4 bg-gray-100 gap-6">
        <div className="lg:w-1/4 bg-white rounded-lg p-4 sticky top-24">
          <FilterPanel />
        </div>

        <div className="flex-1 bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide">
            {featuredItems.map((item) => (
              <div key={item.id} className="w-72 p-4 border rounded-lg bg-white shadow-md">
                <div className="w-full h-48 overflow-hidden border-b">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold">{item.label}</p>
                  <p className="text-gray-700">₨ {item.price.toFixed(2)}</p>
                  <p className="text-gray-500">Rating: {item.rating}</p>
                  <div className="mt-2 flex space-x-2">
                    <button className="px-4 py-2 bg-black text-white rounded">Add to Cart</button>
                    <button
                      className="px-4 py-2 bg-black text-white rounded"
                      onClick={() => navigate("/checkout")}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;