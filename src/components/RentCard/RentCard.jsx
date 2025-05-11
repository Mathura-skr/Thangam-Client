import React from "react";

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:-translate-y-1 w-48 h-[24rem] flex flex-col justify-between sm:w-56 sm:h-[26rem] md:w-64 md:h-[28rem]">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md sm:h-40 md:h-48"
      />

      <div className="flex flex-col gap-1 text-left mt-2 flex-grow">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>

        {product.brand && (
          <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
        )}

        {product.category?.includes("tools") && (
          <p className="text-gray-500 text-sm">
            Category: {product.category.replace("-", " ")}
          </p>
        )}

        {product.description && (
          <p className="text-gray-600 text-sm line-clamp-5">
            {product.description}
          </p>
        )}

        {product.size && (
          <p className="text-gray-500 text-sm">Size: {product.size}</p>
        )}
      </div>

      <div className="mt-2">
        <p className="text-green-600 font-medium">
          Price: ₨ {Number(product.price).toFixed(2)} / Per Day
        </p>
        <p className="text-yellow-500 text-sm">Rating: {product.rating} ★</p>

        <div className="mt-2">
          <button className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-orange-600">
            Rent Available
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
