import React, { useState } from "react";

const FilterPanel = ({ applyFilter }) => {
  const [selected, setSelected] = useState(null);

  const categories = [
    { id: "tools", name: "Tools" },
    { id: "fertilizers", name: "Fertilizers" }
  ];

  const subCategories = {
    tools: ["Hand Tools", "Land Movers", "Cleaning Tools", "Protective Accessories", "Watering Systems"],
    fertilizers: ["Organic", "Chemical", "Compost"]
  };

  const brands = {
    tools: ["Bosch", "Makita", "DeWalt"],
    fertilizers: ["GreenGrow", "FarmRich", "AgriBoost"]
  };

  const size = ["5kg", "10kg", "20kg"];

  const handleSelect = (id) => {
    setSelected(id);
    applyFilter({ category: id });
  };

  return (
    <div className="w-64 p-5 overflow-y-auto rounded-md">
      <h2 className="text-xl mb-4">Filter by Category</h2>
      <ul className="list-none p-0 m-0">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`cursor-pointer p-2 border ${selected === category.id ? "border-black" : "border-gray-200"}`}
            onClick={() => handleSelect(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      {selected && (
        <>
          <h3 className="mt-4">Subcategories</h3>
          <ul>
            {subCategories[selected]?.map((sub) => (
              <li key={sub} className="cursor-pointer" onClick={() => applyFilter({ category: selected, subCategory: sub })}>
                {sub}
              </li>
            ))}
          </ul>

          <h3 className="mt-4">Brands</h3>
          <ul>
            {brands[selected]?.map((brand) => (
              <li key={brand} className="cursor-pointer" onClick={() => applyFilter({ category: selected, brand })}>
                {brand}
              </li>
            ))}
          </ul>

          {selected === "fertilizers" && (
            <>
              <h3 className="mt-4">Size</h3>
              <ul>
                {size.map((size) => (
                  <li key={size} className="cursor-pointer" onClick={() => applyFilter({ category: selected, size })}>
                    {size}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FilterPanel;
