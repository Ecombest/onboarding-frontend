"use client";
import React from "react";
import blogApi from "../../api/blog.api";
import { Blog } from "@/interface/blog.interface";
const Blogs = () => {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  React.useEffect(() => {
    blogApi.getBlogs().then((data) => {
      setBlogs(data);
    });
  }, []);
  return (
    <div className="blogs">
      {blogs.map((blog) => (
        <div key={blog._id} className="blog">
          <img src={blog.image} alt={blog.title} loading="lazy" />
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
