import React from "react";
import "./Categories.css";

const Categories = (props) => {
  const { categories, categoryHandler } = props;


    const setCatHandler = (id) =>{
        categoryHandler(id)
    }

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
    <div className={`categories-container `}>
      <ul className="categories-list">{mapedCat}</ul>
    </div>
  );
};

export default Categories;
