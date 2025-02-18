import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterPanel = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const categories = [
    { id: 1, name: "Tools", path: "/product" },
    { id: 2, name: "Fertilizers", path: "/product" },
  ];

  const handleSelect = (id, path) => {
    setSelected(id);
    navigate(path);
  };

  return (
    <div className="w-64 p-5 bg-green-700 text-white overflow-y-auto rounded-md md:w-80 lg:w-96">
      <h2 className="text-xl mb-4">Filter by Category</h2>
      <ul className="list-none p-0 m-0">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`flex items-center mb-4 p-2 border-2 transition duration-300 cursor-pointer ${
              selected === category.id ? "bg-green-500 border-green-400" : "border-transparent"
            } hover:border-white`}
            onClick={() => handleSelect(category.id, category.path)}
          >
            <span
              className={`w-5 h-5 mr-3 border-2 border-white flex items-center justify-center transition-transform ${
                selected === category.id ? "bg-green-500 scale-100" : "scale-0"
              }`}
            ></span>
            <span className="text-base">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPanel;
