import React from "react";
import { useAppContext } from "../../context/AppContext";
import "./Categories.css";

const Categories = () => {
  const { categories,setCurrentCategory, showCat } = useAppContext();

  const setCatHandler = (id) => {
    categoryHandler(id);
  };

  const categoryHandler = (cat) => {
    setCurrentCategory(cat);
  };

  const mapedCat = categories.map((category) => {
    return (
      <li
        key={category.id}
        onClick={() => setCatHandler(category.id)}
        className={`category-item ${category.active && "active"} `}
      >
        {category.text}
      </li>
    );
  });

  return (
    <aside className={`categories-container ${!showCat && "closeAside"}`}>
      <ul className="categories-list">{mapedCat}</ul>
    </aside>
  );
};

export default Categories;
