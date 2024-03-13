import Blogs from "../Blogs";
import Categories from "../Categories";

const BlogsPage = () => {
  return (
    <div className="blogs-page">
      <div className="blogs-content">
        <h1>Daily dev</h1>
        <Blogs />
      </div>
      <Categories />
    </div>
  );
};
export default BlogsPage;
