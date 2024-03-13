import { Blog } from "@/interface/blog.interface";
import axios from "axios";

const getBlogs = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
  return response.data as Blog[];
};

const getBlog = async (id: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
  return response.data;
};

const createBlog = async (blog: any) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, blog);
  return response.data;
};

const updateBlog = async (id: string, blog: any) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, blog);
  return response.data;
};

const deleteBlog = async (id: string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
  return response.data;
};

const blogApi = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};

export default blogApi;
