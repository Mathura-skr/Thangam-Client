const ProductInfo = ({ 
  product, 
  quantity, 
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  loading = false, // Optional: if parent passes loading state
  error = null     // Optional: if parent passes error state
}) => {
  // Show loading
  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading product details...</div>;
  }

  // Show error
  if (error) {
    return <div className="text-center py-10 text-red-600">Error loading product: {error}</div>;
  }

  // Handle null product
  if (!product) {
    return <div className="text-center py-10 text-gray-600">No product data available.</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const price = product.price != null
    ? (typeof product.price === 'string'
      ? parseFloat(product.price)
      : product.price)
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      
      {product.brand_name && (
        <p className="text-gray-600">Brand: {product.brand_name}</p>
      )}
      
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-gray-900">
          Rs. {typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : 'N/A'}
        </span>
      </div>

      {/* Stock */}
      <div>
        {product.stock > 0 ? (
          <span className="text-green-600">In Stock ({product.stock} available)</span>
        ) : (
          <span className="text-red-600">Out of Stock</span>
        )}
      </div>

      {product.quantity && (
        <div>
          <p className="text-gray-600">Quantity: {product.quantity}</p>
        </div>
      )}

      {/* Quantity Controls */}
      <div className="flex items-center space-x-4">
        <h3 className="font-medium">Order Quantity:</h3>
        <div className="flex items-center border rounded-md">
          <button 
            className="px-3 py-1 text-lg"
            onClick={() => onQuantityChange(quantity - 1)}
          >
            -
          </button>
          <span className="px-4 py-1 border-x">{quantity}</span>
          <button 
            className="px-3 py-1 text-lg"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={onAddToCart}
          disabled={product.stock <= 0}
          className={`px-6 py-3 rounded-md font-medium ${product.stock > 0 ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Add to Cart
        </button>
        <button
          onClick={onBuyNow}
          disabled={product.stock <= 0}
          className={`px-6 py-3 rounded-md font-medium ${product.stock > 0 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Buy Now
        </button>
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t space-y-2">
        {product.category_name && <p className="text-sm text-gray-600">Category: {product.category_name}</p>}
        {product.subcategory_name && <p className="text-sm text-gray-600">Subcategory: {product.subcategory_name}</p>}
        {product.supplier_name && <p className="text-sm text-gray-600">Supplier: {product.supplier_name}</p>}
        {product.manufactured_date && <p className="text-sm text-gray-600">Manufactured: {formatDate(product.manufactured_date)}</p>}
        {product.expiry_date && <p className="text-sm text-gray-600">Expiry: {formatDate(product.expiry_date)}</p>}
      </div>
    </div>
  );
};

export default ProductInfo;
