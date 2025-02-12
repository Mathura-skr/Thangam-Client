import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, handleBuyNow }) => {
 

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Price: ₨ {product.price.toFixed(2)}</p>
      <p className="product-rating">Rating: {product.rating} ★</p>
      <div className="button-container">
        <button className="add-to-cart-button" >
          Add to Cart
        </button>
        <button className="buy-now-button" onClick={() => handleBuyNow(product)}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
