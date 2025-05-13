import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import Navigation from "../../components/Navbar/Navigation";
import ProductCard from "../../components/ProductCard/ProductCard";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";
import ProductReviewSection from "../../components/Review/ProductReviewSection";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState('');

   useEffect(() => {
    if (product?.description) {
      setDescription(
        isExpanded 
          ? product.description 
          : truncateDescription(product.description)
      );
    }
  }, [product, isExpanded]);

   const truncateDescription = (text) => {
    const maxLength = 300;
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '... ';
  };


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);

        // Fetch related products
        const category = res.data.category_name;

        if (category) {
          const relatedRes = await axios.get(
            `/api/products/related?category=${encodeURIComponent(category)}&excludeId=${res.data.id}`
          );
          setRelatedProducts(relatedRes.data);
        }
        

        // Fetch reviews
        const reviewRes = await axios.get(`/api/reviews/product/${id}`);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error("Error fetching product detail:", err);
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  const formatDescription = (text) => {
    if (!text) return '';
    return text.split('\n').map((paragraph, i) => (
      <p key={i} className="mb-2">{paragraph}</p>
    ));
  };

   const handleViewDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async () => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to add to cart.", "warning");
    }

    try {
      await axios.post("/api/cart", {
        userId: user.userId,
        product_id: product.id,
        unit: 1,
      });

      Swal.fire("Added to Cart", `${product.name} added to your cart.`, "success");
    } catch (err) {
      console.error("Add to cart error:", err);
      Swal.fire("Error", "Failed to add to cart.", "error");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to proceed.", "info");
    }

    Swal.fire({
      title: "Proceed to Checkout?",
      text: `Buy ${product.name}?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Buy Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/checkout?productId=${product.id}`;
      }
    });
  };

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto p-6 grid md:grid-cols-2 gap-8">
        {/* Product Image + Info */}
        <div>
          <img
            src={Array.isArray(product.image_url) ? product.image_url[0] : product.image_url}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow"
            onError={(e) => (e.target.src = "/images/placeholder-product.png")}
          />
        </div>
       
        <div >
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">
              <span className="font-semibold">Brand:</span> {product.brand_name}
            </p>

          {product.category_name === 'Fertilizer' && (
        <div className="my-2 space-y-1">
          {product.quantity && (
            <p className="text-gray-600">
              <span className="font-semibold">Quantity:</span> {product.quantity}kg
            </p>
          )}
        </div>
      )}

      {/* Shrinkable Description */}
      <div className="text-gray-600 mt-2 whitespace-pre-line relative">
        {formatDescription(description)}
        {product.description.length > 300 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:underline mt-2 text-sm"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
          <p className="text-lg mt-4 font-semibold text-green-600">₨ {product.price}</p>

          <div className="flex gap-4 mt-6">
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
      </div>

      {/* Reviews */}
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            <ProductReviewSection productId={product.id} user={user} />

          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="container mx-auto mt-10 px-6 pb-10">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onViewDetail={() => handleViewDetail(prod.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
