import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FilterPanel.css";

const FilterPanel = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const categories = [
    { id: 1, name: "Indoor Plants", path: "/product" },
    { id: 2, name: "Outdoor Plants", path: "/product" },
    { id: 3, name: "Garden Accessories", path: "/product" },
    { id: 4, name: "Tools", path: "/product" },
    { id: 5, name: "Fertilizers", path: "/product" },
    { id: 6, name: "Plant Seeds", path: "/product" },
    { id: 7, name: "Pots and Vase", path: "/product" },
  ];

  const handleSelect = (id, path) => {
    setSelected(id); // Update selected checkbox
    navigate(path); // Navigate to the product page
  };

  return (
    <div className="filter-panel">
      <h2 className="filter-panel__header">Filter by Category</h2>
      <ul className="filter-panel__categories">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`filter-panel__category ${
              selected === category.id ? "filter-panel__category--active" : ""
            }`}
            onClick={() => handleSelect(category.id, category.path)}
          >
            <span
              className={`filter-panel__checkbox ${
                selected === category.id ? "filter-panel__checkbox--selected" : ""
              }`}
            ></span>
            <span className="filter-panel__label">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPanel;
