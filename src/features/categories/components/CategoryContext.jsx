import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState(null); // مقدار اولیه به عنوان null تعیین شده است

  const updateCategory = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <CategoryContext.Provider value={{ category, updateCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export { useCategoryContext, CategoryProvider };
