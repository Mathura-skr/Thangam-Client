import React from "react";

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:-translate-y-1 w-48 h-72 flex flex-col justify-between sm:w-56 sm:h-80 md:w-64 md:h-96">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md sm:h-40 md:h-48"
      />

      <h3 className="text-lg font-semibold mt-2 truncate">{product.name}</h3>

      {product.brand && (
        <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
      )}

      {product.category?.includes("tools") && (
        <p className="text-gray-500 text-sm">
          Category: {product.category.replace("-", " ")}
        </p>
      )}

      {product.size && (
        <p className="text-gray-500 text-sm">Size: {product.size}</p>
      )}

      <p className="text-green-600 font-medium">
        {" "}
        Price: ₨ {Number(product.price).toFixed(2)}
      </p>
      <p className="text-yellow-500 text-sm">Rating: {product.rating} ★</p>

      <div className="flex justify-between mt-auto">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-[#f2b400] text-white rounded px-3 py-1 text-sm hover:bg-orange-600 w-1/2 mr-1"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onBuyNow(product)}
          className="bg-black text-white rounded px-3 py-1 text-sm hover:outline hover:outline-2 hover:outline-black hover:rounded-md w-1/2 ml-1"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
