import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "../../utils/axios";

const FilterPanel = ({ applyFilter }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/filters/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`/api/filters/${selectedCategory}/subcategories`)
        .then((res) => setSubCategories(res.data))
        .catch((err) => console.error("Error fetching subcategories", err));

      axios
        .get(`/api/filters/${selectedCategory}/brands`)
        .then((res) => setBrands(res.data))
        .catch((err) => console.error("Error fetching brands", err));

      axios
        .get(`/api/filters/${selectedCategory}/sizes`)
        .then((res) => setSizes(res.data))
        .catch((err) => console.error("Error fetching sizes", err));
    } else {
      setSubCategories([]);
      setBrands([]);
      setSizes([]);
    }
  }, [selectedCategory]);

  const applyAll = () => {
    applyFilter({
      category: selectedCategory,
      subCategory: selectedSubCategory,
      brand: selectedBrand,
      size: selectedSize,
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedBrand(null);
    setSelectedSize(null);
    applyFilter({});
  };

  const SelectedTag = ({ label, value, clear }) => (
    <span className="flex items-center bg-black text-white rounded-full px-3 py-1 text-sm mr-2 mb-2">
      {label}: {value}
      <button onClick={clear} className="ml-2 hover:text-red-400">
        <X size={14} />
      </button>
    </span>
  );

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        Filters
      </button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed md:static top-0 left-0 z-40 md:z-0 w-72 h-screen bg-white shadow-lg p-6 overflow-y-auto"
          >
            <div className="md:hidden flex justify-end">
              <button onClick={() => setIsOpen(false)} className="text-black">
                <X size={24} />
              </button>
            </div>

            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="flex flex-wrap mb-4">
              {selectedCategory && (
                <SelectedTag label="Category" value={selectedCategory} clear={() => setSelectedCategory(null)} />
              )}
              {selectedSubCategory && (
                <SelectedTag label="Subcategory" value={selectedSubCategory} clear={() => setSelectedSubCategory(null)} />
              )}
              {selectedBrand && (
                <SelectedTag label="Brand" value={selectedBrand} clear={() => setSelectedBrand(null)} />
              )}
              {selectedSize && (
                <SelectedTag label="Size" value={selectedSize} clear={() => setSelectedSize(null)} />
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map(({ id, name }) => (
                  <button
                    key={id}
                    className={`w-full text-left px-4 py-2 rounded border ${
                      selectedCategory === id
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedCategory(id);
                      setSelectedSubCategory(null);
                      setSelectedBrand(null);
                      setSelectedSize(null);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            {subCategories.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Subcategory</h3>
                <div className="space-y-2">
                  {subCategories.map((sub) => (
                    <button
                      key={sub}
                      className={`w-full text-left px-4 py-2 rounded border ${
                        selectedSubCategory === sub
                          ? "bg-black text-white border-black"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedSubCategory(sub);
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {brands.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      className={`w-full text-left px-4 py-2 rounded border ${
                        selectedBrand === brand
                          ? "bg-black text-white border-black"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedBrand(brand);
                      }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-full text-left px-4 py-2 rounded border ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  applyAll();
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-black text-white rounded text-sm"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterPanel;
