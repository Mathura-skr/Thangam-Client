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

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:-translate-y-1 w-48  flex flex-col justify-between sm:w-56  md:w-64  cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={getImageUrl()}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md sm:h-40 md:h-48"
        onError={(e) => {
          e.target.src = "/images/placeholder-product.png";
        }}
      />

      <div className="flex-grow">
        <h3 className="text-lg font-semibold mt-2 truncate">{product.name}</h3>

        {product.brand_name && (
          <p className="text-gray-500 text-sm">Brand: {product.brand_name}</p>
        )}

        {product.category_name && (
          <p className="text-gray-500 text-sm">
            Category: {product.category_name.replace("-", " ")}
          </p>
        )}

        {/* Rating stars */}
        {renderStars(product.average_rating)}

        <p className="text-green-600 font-medium mt-1">
          Price: ₨ {Number(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
