import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FilterPanel from '../../components/Filter/FilterPanel';
// import { useCart } from '../../context/CartContext';
import Modal from 'react-modal';
import './HomePage.css';

import gardener1 from '../../assets/images/gardener1.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  // const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredItems = [
    { id: 1, image: require('../../assets/images/snake_plant.png'), alt: 'Snake Plant', label: 'Indoor Plants', price: 500, rating: '4.5', description: 'Beautiful indoor plants to enhance your home decor.' },
    { id: 2, image: require('../../assets/images/succulent_plant.png'), alt: 'Outdoor Plants', label: 'succulent Plant', price: 2005, rating: '4.7', description: 'Sturdy outdoor plants for your garden.' },
    { id: 3, image: require('../../assets/images/tool_img2.png'), alt: 'Gardening Tools', label: 'Gardening Tools', price: 15, rating: '4.3', description: 'Essential tools for every gardener.' },
    { id: 4, image: require('../../assets/images/pothos.png'), alt: 'Pothos plant', label: 'Plant Care', price: 10, rating: '4.6', description: 'Products to keep your plants healthy.' },
    { id: 5, image: require('../../assets/images/seed_img2.png'), alt: 'Seeds', label: 'Seeds', price: 5, rating: '4.8', description: 'High-quality seeds for your garden.' },
  ];

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="homepage">
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
            <button 
              className="hero__button"
              onClick={() => navigate('/HomeService')}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <div className="filter-container">
          <FilterPanel />
        </div>

        {/* Right Side Content */}
        <div className="featured-section">
          {/* Category Section - Now First */}
          <section className="category-section">
            <h2 className="category-section__title">Shop by Category</h2>
            <div className="category-container">
              <button className="scroll-button left" onClick={() => document.querySelector('.category-scroll').scrollBy(-200, 0)}>
                &lt;
              </button>
              <div className="category-scroll">
                <Link to="/product" className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/plant1.jpg')} alt="Indoor Plants" />
                  </div>
                  <p className="category-label">Indoor Plants</p>
                </Link>
                <Link to="/product" className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/outdoor_img.jpg')} alt="Outdoor Plants" />
                  </div>
                  <p className="category-label">Outdoor Plants</p>
                </Link>
                <Link to="/product" className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/tool_img2.png')} alt="Gardening Tools" />
                  </div>
                  <p className="category-label">Tools & Equipments</p>
                </Link>
                <Link to="/product" className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/pot_img2.png')} alt="Plant Care" />
                  </div>
                  <p className="category-label">Pots & Supplies</p>
                </Link>
                <Link to="/product" className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/seed_img2.png')} alt="Seeds" />
                  </div>
                  <p className="category-label">Seeds & Fertilizers</p>
                </Link>
              </div>
              <button className="scroll-button right" onClick={() => document.querySelector('.category-scroll').scrollBy(200, 0)}>
                &gt;
              </button>
            </div>
          </section>

          {/* Featured Products Section - Now Second */}
          <h2 className="featured-section__title">Featured Products</h2>
          <div className="featured-container">
            <button className="scroll-button left" onClick={() => document.querySelector('.featured-scroll').scrollBy(-200, 0)}>
              &lt;
            </button>
            <div className="featured-scroll">
              {featuredItems.map((item) => (
                <div className="featured-item" key={item.id}>
                  <div className="featured-image">
                    <img src={item.image} alt={item.alt} />
                  </div>
                  <div className="featured-details">
                    <p className="featured-label">{item.label}</p>
                    <p className="featured-price">₨ {item.price.toFixed(2)}</p>
                    <p className="featured-rating">Rating: {item.rating}</p>
                    <div className="button-container">
                      <button className="add-to-cart-button" >
                      {/* onClick={() => addToCart(item)} */}
                        Add to Cart
                      </button>
                      <button className="buy-now-button" onClick={() => navigate('/checkout')}>
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => document.querySelector('.featured-scroll').scrollBy(200, 0)}>
              &gt;
            </button>
          </div>

          {/* New Browse More Section */}
          <section className="browse-more-section">
            <h2 className="browse-more-title">Browse More Products</h2>
            <button 
              className="browse-more-button"
              onClick={() => navigate('/product')}
            >
              Explore Our Products
            </button>
          </section>
        </div>
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onRequestClose={closeModal}
          contentLabel="Product Details"
          className="product-modal"
          overlayClassName="product-modal-overlay"
        >
          <div className="modal-content">
            <img src={selectedProduct.image} alt={selectedProduct.label} className="modal-product-image" />
            <h2 className="modal-product-name">{selectedProduct.label}</h2>
            <p className="modal-product-category">Category: {selectedProduct.alt}</p>
            <p className="modal-product-rating">Rating: {selectedProduct.rating} ★</p>
            <p className="modal-product-description">Description: {selectedProduct.description}</p>
            <div className="button-container">
              <button className="add-to-cart-button" >
              {/* onClick={() => addToCart(selectedProduct)} */}
                Add to Cart
              </button>
              <button className="buy-now-button" onClick={() => navigate('/checkout')}>
                Buy Now
              </button>
            </div>
            <button onClick={closeModal} className="close-modal-button">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
