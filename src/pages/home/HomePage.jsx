import React, { useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import FilterPanel from "../../components/Filter/FilterPanel";
import "./HomePage.css";


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
      description: "king of fertilizers provide plants with nitrogen and to encourage the growth of green, leafy plants and is an important factor for the process of photosynthesis",
    },
    {
      id: 2,
      image: require("../../assets/images/tool_img1.png"),
      alt: "Gardening Tools",
      label: "Hand Shovel",
      price: 2005,
      rating: "4.7",
      description: "Essential tools for every gardener",
    },
    {
      id: 3,
      image: require("../../assets/images/tool_img2.png"),
      alt: "Gardening Tools",
      label: "Gardening Gloves",
      price: 15,
      rating: "4.3",
      description: "Essential tools for every gardener.",
    },
    {
      id: 4,
      image: require("../../assets/images/fer2.png"),
      alt: "fertilizer",
      label: "NPK Prime",
      price: 10,
      rating: "4.6",
      description: "Essential nutrients needed for plant growth and overall plant health",
    },
    {
      id: 5,
      image: require("../../assets/images/fer3.png"),
      alt: "Home Garden Flower",
      label: "Home Garden Flower",
      price: 5,
      rating: "4.8",
      description: "Suitable for any kind of flowering plants.",
    },
  ];

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={require("../../assets/images/hero_bgimg.png")}
          alt="Hero"
          className="hero__image"
        />
        <img
          src={require("../../assets/images/hero_img1.png")}
          alt="Hero Overlay"
          className="hero__overlay-image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Welcome to THANGAM</h1>
            <h2 className="hero__description">
              Buy & Rent for your garden from home!
            </h2>
            <button
              className="hero__button"
              onClick={() => navigate("")}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        <div className="filter-container">
          <FilterPanel />
        </div>

        {/* Right Side Content */}
        <div className="featured-section">
          {/* Category Section - Now First */}
          <section className="category-section">
            <h2 className="category-section__title">Shop by Category</h2>
            <div className="category-container">
              <button
                className="scroll-button left"
                onClick={() =>
                  document.querySelector(".category-scroll").scrollBy(-200, 0)
                }
              >
                &lt;
              </button>
              <div className="category-scroll">
                <Link to="/product" className="category-item">
                  <div className="category-image">
                    <img
                      src={require("../../assets/images/tool_img2.png")}
                      alt="Gardening Tools"
                    />
                  </div>
                  <p className="category-label">Tools & Equipments</p>
                </Link>

                <Link to="/product" className="category-item">
                  <div className="category-image">
                    <img
                      src={require("../../assets/images/fer2.png")}
                      alt="fertilizer"
                    />
                  </div>
                  <p className="category-label">Fertilizers</p>
                </Link>
              </div>
              <button
                className="scroll-button right"
                onClick={() =>
                  document.querySelector(".category-scroll").scrollBy(200, 0)
                }
              >
                &gt;
              </button>
            </div>
          </section>

          {/* Featured Products Section - Now Second */}
          <h2 className="featured-section__title">Featured Products</h2>
          <div className="featured-container">
            <button
              className="scroll-button left"
              onClick={() =>
                document.querySelector(".featured-scroll").scrollBy(-200, 0)
              }
            >
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
                      <button className="add-to-cart-button">
                        {/* onClick={} */}
                        Add to Cart
                      </button>
                      <button
                        className="buy-now-button"
                        onClick={() => navigate("/checkout")}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="scroll-button right"
              onClick={() =>
                document.querySelector(".featured-scroll").scrollBy(200, 0)
              }
            >
              &gt;
            </button>
          </div>

          {/* New Browse More Section */}
          <section className="browse-more-section">
            <h2 className="browse-more-title">Browse More Products</h2>
            <button
              className="browse-more-button"
              onClick={() => navigate("/product")}
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
            <img
              src={selectedProduct.image}
              alt={selectedProduct.label}
              className="modal-product-image"
            />
            <h2 className="modal-product-name">{selectedProduct.label}</h2>
            <p className="modal-product-category">
              Category: {selectedProduct.alt}
            </p>
            <p className="modal-product-rating">
              Rating: {selectedProduct.rating} ★
            </p>
            <p className="modal-product-description">
              Description: {selectedProduct.description}
            </p>
            <div className="button-container">
              <button className="add-to-cart-button">
                onClick={}
                Add to Cart
              </button>
              <button
                className="buy-now-button"
                onClick={() => navigate("")}
              >
                Buy Now
              </button>
            </div>
            <button onClick={closeModal} className="close-modal-button">
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
