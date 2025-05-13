import { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/authContext";
import FilterPanel from "../../components/Filter/FilterPanel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navigation from "../../components/Navbar/Navigation";
import useFetch from "../../hooks/useFetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const ProductPage = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch("/api/products");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState({});
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    if (data.length > 0) {
      setFilteredProducts(data);
    }
  }, [data]);

  const applyFilter = (newFilter) => {
  const updatedFilter = { ...activeFilter, ...newFilter };
  setActiveFilter(updatedFilter);

  let filtered = [...data];

  if (updatedFilter.category) {
    filtered = filtered.filter((p) => p.category_id === updatedFilter.category);
  }
  if (updatedFilter.subCategory) {
    filtered = filtered.filter((p) => p.subCategory === updatedFilter.subCategory);
  }
  if (updatedFilter.brand) {
    filtered = filtered.filter((p) => p.brand === updatedFilter.brand);
  }
  if (updatedFilter.size) {
    filtered = filtered.filter((p) => p.size === updatedFilter.size);
  }

  setFilteredProducts(filtered);
};


  const handleAddToCart = async (product) => {
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
          unit: 1,
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
        text: 'Failed to add the product to cart.',
      });
    }
  };

  const handleBuyNow = (product) => {
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
        window.location.href = `/checkout?productId=${product.id}`;
      }
    });
  };

  const handleViewDetail = (id) => {
    navigate(`/product/${id}`); // ✅ Navigate to product detail
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="fixed top-16 w-full z-40 bg-green-600 text-white py-2 overflow-hidden">
  <div className="relative w-full h-6">
    <div className="marquee line1 absolute w-full text-center font-semibold text-sm sm:text-lg">
      🚚 FREE Island-wide Delivery on All Orders! 🎉 Limited Time Offer - Shop Now!
    </div>
    {/* <div className="marquee line2 absolute w-full text-center font-semibold text-sm sm:text-lg">
      🛒 Shop our best deals today and save big on your favorite products!
    </div>
    <div className="marquee line3 absolute w-full text-center font-semibold text-sm sm:text-lg">
      🎁 Get a surprise gift with every purchase over $50!
    </div> */}
  </div>
</div>


      <div className="container mx-auto p-4 flex gap-4  mt-24">
        <div className="hidden md:block w-1/4">
          <FilterPanel applyFilter={applyFilter} />
        </div>

        <div className="md:hidden fixed z-50">
          <FilterPanel applyFilter={applyFilter} />
        </div>

        <div className="w-full md:w-3/4">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load products.</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onBuyNow={() => handleBuyNow(product)}
                  onViewDetail={() => handleViewDetail(product.id)} 
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-red-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
