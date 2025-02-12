import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import FilterPanel from '../../components/Filter/FilterPanel';
import './ProductPage.css';


const ProductPage = () => {
  const navigate = useNavigate(); 


  const getRandomPrice = () => {
    return Math.floor(Math.random() * (900 - 200 + 1)) + 200; // Random price between 200 and 900
  };

  // Sample products data
  const products = [
    { id: 1, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img1.png') },
    { id: 2, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img2.png') },
    { id: 3, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img1.png') },
    { id: 4, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img2.png') },
    { id: 5, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img1.png') },
    { id: 6, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img2.png') },
    
    { id: 7, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/fer1.png') },
    { id: 8, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/fer2.png') },
    { id: 9, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/fer3.png') },
    { id: 10, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/fer1.png') },
    { id: 11, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/fer2.png') },
    


  ];

  const sections = [

    { title: "Tools and Equipments", products: products.filter(p => p.category === "Tools") },
    { title: "Seeds and Fertilizers", products: products.filter(p => p.category === "Fertilizers") },
  ];

  const handleBuyNow = () => {
 
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(`.product-section${hash}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const ProductCard = ({ product, handleBuyNow }) => (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₨ {product.price.toFixed(2)}</p>
      <p className="product-rating">Rating: {product.rating} ★</p>
      <div className="button-container">
        <button className="buy-now-button" onClick={() => handleBuyNow(product)}>Buy Now</button>
      </div>
    </div>
  );

  return (
    <div className="productpage">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={require('../../assets/images/hero_bgimg.png')}
          alt="Hero"
          className="hero__image"
        />
        <img
          src={require('../../assets/images/hero_img1.png')}
          alt="Hero Overlay"
          className="hero__overlay-image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Welcome to THANGAM</h1>
            <h2 className="hero__description">Buy & Rent for your garden from home!</h2>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <div className="filter-container">
          <FilterPanel />
        </div>

        {/* Product Sections */}
        <div className="products-section">
          {sections.map(section => (
            <div key={section.title} className={`product-section ${section.title.replace(/\s+/g, '-').toLowerCase()}`} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
              <h2>{section.title}</h2>
              <div className="product-cards-container">
                <button className="scroll-button left" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(-200, 0)}>❮</button>
                <div className="product-cards-wrapper">
                  {section.products.map(product => (
                    <ProductCard key={product.id} product={product} handleBuyNow={handleBuyNow} />
                  ))}
                </div>
                <button className="scroll-button right" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(200, 0)}>❯</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
