import { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/authContext";
import FilterPanel from "../../components/Filter/FilterPanel";
import ProductCard from "../../components/ProductCard/ProductCard";
import useFetch from "../../hooks/useFetch";

const ProductPage = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch("/api/products");

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredProducts(data);
    }
  }, [data]);

  const applyFilter = (filter) => {
    let filtered = [...data];

    if (filter.category) {
      filtered = filtered.filter((p) => p.category === filter.category);
    }
    if (filter.subCategory) {
      filtered = filtered.filter((p) => p.subCategory === filter.subCategory);
    }
    if (filter.brand) {
      filtered = filtered.filter((p) => p.brand === filter.brand);
    }
    if (filter.size) {
      filtered = filtered.filter((p) => p.size === filter.size);
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
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <FilterPanel applyFilter={applyFilter} />
        </div>
        <div className="w-full md:w-3/4">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load products.</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
