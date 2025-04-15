import { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/authContext";
import FilterPanel from "../../components/Filter/FilterPanel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navigation from "../../components/Navbar/Navigation";
import useFetch from "../../hooks/useFetch";

const ProductPage = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch("/api/products");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState({});


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
      filtered = filtered.filter((p) => p.category === updatedFilter.category);
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
  

  const handleAddToCart = async (productId) => {
    try {
      if (!user) {
        alert("You need to login to add products to your cart.");
        return;
      }

      await axios.post(
        "/api/cart",
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      alert("Product added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart.");
    }
  };

  const handleBuyNow = (productId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    window.location.href = `/checkout?productId=${productId}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="container mx-auto p-4 flex gap-4">
        {/* Sidebar Filter (Drawer on mobile) */}
        <div className="hidden md:block w-1/4">
          <FilterPanel applyFilter={applyFilter} />
        </div>

        {/* FilterPanel drawer on mobile */}
        <div className="md:hidden fixed z-50">
          <FilterPanel applyFilter={applyFilter} />
        </div>

        {/* Product Listing */}
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
                  onAddToCart={() => handleAddToCart(product.id)}
                  onBuyNow={() => handleBuyNow(product.id)}
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
