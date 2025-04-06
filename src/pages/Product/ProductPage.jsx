import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import FilterPanel from "../../components/Filter/FilterPanel";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductPage = () => {
  // const getRandomPrice = () =>
  //   Math.floor(Math.random() * (900 - 200 + 1)) + 200;

  const { user } = useContext(AuthContext); // access auth
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        console.log("data....", res.data)
        setFilteredProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilter = (filter) => {
    let filtered = [...products];

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

    // You might want to redirect with product ID as param or via context
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
            <p className="text-red-500">{error}</p>
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
