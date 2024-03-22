"use client";
import categoriesApi from "@/api/category.api";
import { Category } from "@/interface/categories.interface";
import Link from "next/link";
import React from "react";
const Categories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    categoriesApi.getCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  return (
    <div className="categories">
      {categories.map((category) => (
        <Link href={`/categories/${category.slug}`} key={category._id} className="category">
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
