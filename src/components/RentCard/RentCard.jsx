import React from "react";

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  const isAvailable = product.availability_status === 1;
  const hasStock = product.stock > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:-translate-y-1 w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-[16rem] flex flex-col justify-between h-[28rem] sm:h-[30rem] md:h-[32rem] mx-auto">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md"
      />

      <div className="flex flex-col gap-1 text-left mt-2 flex-grow">
        <h3 className="text-base sm:text-lg font-semibold truncate">{product.name}</h3>

        {product.brand && (
          <p className="text-gray-400 text-xs sm:text-sm">BRAND: {product.brand}</p>
        )}

        {product.category?.includes("tools") && (
          <p className="text-gray-500 text-xs sm:text-sm">
            Category: {product.category.replace("-", " ")}
          </p>
        )}

        {product.description && (
          <p className="text-gray-700 text-xs sm:text-sm line-clamp-5">
            {product.description}
          </p>
        )}

        {product.size && (
          <p className="text-gray-500 text-xs sm:text-sm">Size: {product.size}</p>
        )}

        <p className="text-red-500 text-xs sm:text-sm"> {product.stock} in Stock</p>

        <div className="mt-2">
          <span
            className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
              isAvailable && hasStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isAvailable && hasStock ? "Available for Rent" : "Currently Unavailable"}
          </span>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-green-600 font-medium text-sm sm:text-base">
          Price: ₨ {Number(product.price).toFixed(2)} / Per Day
        </p>
        {/* <p className="text-yellow-500 text-xs sm:text-sm">Rating: {product.rating} ★</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
