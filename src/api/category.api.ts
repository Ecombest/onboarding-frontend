import { CategoryInterface } from "@/interface/categories.interface";
import axios from "axios";

const getCategories = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  return response.data as CategoryInterface[];
};

const categoriesApi = {
  getCategories,
};

export default categoriesApi;
