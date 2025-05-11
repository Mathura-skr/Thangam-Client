import { useState } from "react";

const ImageGallery = ({ images, name }) => {
  const [mainImage, setMainImage] = useState(images?.[0] || null);

  // Handle case where images might be a string or array
  const imageArray = Array.isArray(images) ? images : 
                    (typeof images === 'string' ? [images] : []);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={name} 
            className="object-contain w-full h-full max-h-[500px]"
            onError={(e) => {
              e.target.src = "/images/placeholder-product.png";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      
      {/* Thumbnail Gallery - only show if we have multiple images */}
      {imageArray.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {imageArray.map((img, index) => (
            <button
              key={index}
              className={`aspect-square rounded overflow-hidden border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setMainImage(img)}
            >
              {img ? (
                <img 
                  src={img} 
                  alt={`${name} thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = "/images/placeholder-product.png";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;