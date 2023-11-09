"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CategoryContextProps {
  categoryType: string;
  setCategoryType: Dispatch<SetStateAction<string>>;
}

export const CategoryContext = createContext<CategoryContextProps>({
  categoryType: "",
  setCategoryType: (): string => "",
});

// save selected category from nav bar
export const CategoryContextProvider = ({ children }) => {
  const [categoryType, setCategoryType] = useState("");

  return (
    <CategoryContext.Provider value={{ categoryType, setCategoryType }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
