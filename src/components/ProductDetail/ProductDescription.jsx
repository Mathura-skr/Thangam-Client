import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import useFetch from "../../hooks/useFetch";
import Navigation from "../../components/Navbar/Navigation";
import Swal from "sweetalert2";
//import LoadingSpinner from "../../components/LoadingSpinner";
import ImageGallery from "../../components/ProductDetail/ImageGallery";
import ProductInfo from "../../components/ProductDetail/ProductInfo";
import ProductDescription from "../../components/ProductDetail/ProductDescription";
import RelatedProducts from "../../components/ProductDetail/RelatedProducts";
import axios from "../../utils/axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  // Fetch product data
  const { 
    data: product, 
    loading, 
    error 
  } = useFetch(`/api/products/${id}`);
  
  // Fetch related products only if we have a product
  const { 
    data: relatedProductsData
  } = useFetch(product ? `/api/products/related/${product.category_name}/${id}` : null);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      if (!user) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Required',
          text: 'You need to login to add products to your cart.',
        });
        return;
      }

      await axios.post(
        "/api/cart",
        {
          userId: user.userId,
          product_id: product.id,
          unit: quantity,
        },
        { withCredentials: true }
      );
  
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added to your cart.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error("Add to cart error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Failed to add the product to cart.',
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };
  
  const handleBuyNow = () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to proceed with purchase.',
      });
      return;
    }
  
    Swal.fire({
      title: 'Proceed to Checkout?',
      text: `You're about to buy: ${product.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Buy Now!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/checkout?productId=${product.id}&quantity=${quantity}`);
      }
    });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (product.stock && newQuantity > product.stock) {
      Swal.fire({
        icon: 'warning',
        title: 'Insufficient Stock',
        text: `Only ${product.stock} items available.`,
      });
      return;
    }
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        {/* <div className="container mx-auto p-4">
          <LoadingSpinner />
        </div> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto p-4 text-center">
          <p className="text-red-500 text-lg">Failed to load product details.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto p-4 text-center">
          <p className="text-lg">Product not found.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="container mx-auto p-4 md:p-6">
        {/* Breadcrumb Navigation */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><a href="/">Home</a></li> 
            <li><a href="/products">Products</a></li> 
            <li><a href={`/products?category=${product.category_name}`}>{product.category_name}</a></li>
            <li className="text-gray-600">{product.name}</li>
          </ul>
        </div>

        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <ImageGallery images={product.image_url} name={product.name} />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <ProductInfo 
              product={product}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Product Description and Details */}
        <div className="mb-12">
          <ProductDescription 
            description={product.description}
            specifications={{
              'Category': product.category_name,
              'Subcategory': product.subcategory_name,
              'Brand': product.brand_name,
              'Supplier': product.supplier_name,
              'Stock': product.stock,
              ...(product.manufactured_date && {'Manufactured Date': formatDate(product.manufactured_date)}),
              ...(product.expiry_date && {'Expiry Date': formatDate(product.expiry_date)}),
              ...(product.quantity && {'Quantity': product.quantity})
            }}
          />
        </div>

        {/* Related Products */}
        {relatedProductsData?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <RelatedProducts products={relatedProductsData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;