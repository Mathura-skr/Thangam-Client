import React from "react";

const ProductCard = ({ product, onAddToCart, onBuyNow, onViewDetail }) => {
  const handleCardClick = () => {
    if (onViewDetail) onViewDetail(product.id);
  };

  const getImageUrl = () => {
    if (Array.isArray(product.image_url)) {
      return product.image_url[0] || "/images/placeholder-product.png";
    }
    return product.image_url || "/images/placeholder-product.png";
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating || 0);
    return (
      <div className="flex justify-center mt-1 text-yellow-500 text-sm">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < rounded ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (onBuyNow) onBuyNow(product);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:-translate-y-1 w-48 sm:w-56 md:w-64 flex flex-col justify-between cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={getImageUrl()}
        alt={product.name || "Product"}
        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md"
        onError={(e) => {
          e.target.src = "/images/placeholder-product.png";
        }}
      />

      <div className="flex-grow">
        <h3 className="text-lg font-semibold mt-2 truncate">{product.name}</h3>

        
        {product.brand && (
          <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
        )}

        {product.category_name && (
          <p className="text-gray-500 text-sm">
            Category: {product.category_name.replace("-", " ")}
          </p>
        )}

        {renderStars(product.average_rating)}

        <div className="mt-1">
          {product.discount && product.discount_price ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-semibold text-base">
                  ₨ {Number(product.discount_price).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                  -{product.discount}%
                </span>
              </div>
              <span className="text-gray-500 line-through text-sm">
                ₨ {Number(product.price).toFixed(2)}
              </span>
            </div>
          ) : (
            <p className="text-green-600 font-medium">
              ₨ {Number(product.price).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 space-x-2">
        <button
          onClick={handleAddToCart}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
