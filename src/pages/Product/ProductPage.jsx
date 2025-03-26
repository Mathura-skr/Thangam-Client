import React, { useEffect, useState } from "react";
import FilterPanel from "../../components/Filter/FilterPanel";
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductPage = () => {
  const getRandomPrice = () => Math.floor(Math.random() * (900 - 200 + 1)) + 200;

  const products = [
    { id: 1, name: "Bosch Drill", category: "tools", subCategory: "Hand Tools", brand: "Bosch", rating: 4.8, price: getRandomPrice(), image: require("../../assets/images/tool_img1.png") },
    { id: 2, name: "Makita Saw", category: "tools", subCategory: "Land Movers", brand: "Makita", rating: 4.8, price: getRandomPrice(), image: require("../../assets/images/tool_img2.png") },
    { id: 3, name: "FarmRich Fertilizer", category: "fertilizers", brand: "FarmRich", size: "10kg", rating: 4.6, price: getRandomPrice(), image: require("../../assets/images/fer1.png") },
    { id: 4, name: "AgriBoost Compost", category: "fertilizers", brand: "AgriBoost", size: "5kg", rating: 4.6, price: getRandomPrice(), image: require("../../assets/images/fer2.png") }
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  const applyFilter = (filter) => {
    let filtered = products;

    if (filter.category) {
      filtered = filtered.filter((p) => p.category === filter.category);
    }
    if (filter.subCategory) {
      filtered = filtered.filter((p) => p.subCategory === filter.subCategory);
    }
    if (filter.brand) {
      filtered = filtered.filter((p) => p.brand === filter.brand);
    }
    if (filter.size) {
      filtered = filtered.filter((p) => p.size === filter.size);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative w-full h-96">
        <img src={require("../../assets/images/hero_bgimg.jpg")} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to THANGAM</h1>
            <h2 className="text-2xl mt-2">Buy & Rent for your garden from home!</h2>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <FilterPanel applyFilter={applyFilter} />
        </div>
        <div className="w-full md:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-red-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
