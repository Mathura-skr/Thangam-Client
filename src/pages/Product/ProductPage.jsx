import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterPanel from '../../components/Filter/FilterPanel';

const ProductPage = () => {
  const navigate = useNavigate();

  const getRandomPrice = () => Math.floor(Math.random() * (900 - 200 + 1)) + 200;

  const products = [
    { id: 1, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img1.png') },
    { id: 2, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img2.png') },
    { id: 7, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/fer1.png') },
    { id: 8, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/fer2.png') },
  ];

  const sections = [
    { title: "Tools and Equipments", products: products.filter(p => p.category === "Tools") },
    { title: "Seeds and Fertilizers", products: products.filter(p => p.category === "Fertilizers") },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const ProductCard = ({ product }) => (
    <div className="w-72 p-4 bg-white rounded-lg shadow-md flex flex-col justify-between text-center h-96">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">Price: ₨ {product.price.toFixed(2)}</p>
      <p className="text-yellow-500">Rating: {product.rating} ★</p>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Buy Now</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative w-full h-96">
        <img src={require('../../assets/images/hero_bgimg.png')} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to THANGAM</h1>
            <h2 className="text-2xl mt-2">Buy & Rent for your garden from home!</h2>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <FilterPanel />
        </div>
        <div className="w-full md:w-3/4">
          {sections.map(section => (
            <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, '-')}
              className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div className="flex gap-4 overflow-x-auto">
                {section.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
