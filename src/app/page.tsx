"use client";
import { Blog } from "@/component/Blog/Blog";
import blogsData from "@/dummyData/blogsData";
import "./Home.css";
import Link from "next/link";
import { useCategoryContext } from "@/context/context";
import { useEffect, useState } from "react";
import { BlogData } from "@/types/blogType";
import string from "@/constants/string";
import { checkDateBetween, formatDate } from "@/utils/utils";

export const Home = () => {
  const { categoryType } = useCategoryContext();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogData[]>([]);

  // Get data from storage
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let blogData;
      if (typeof window !== "undefined" && window.localStorage) {
        blogData = JSON.parse(localStorage.getItem("blogData"));
        setBlogs(blogData);
      }
      if (blogData === null) {
        localStorage.setItem("blogData", JSON.stringify(blogsData));
        setBlogs(blogsData);
      }
    }
  }, []);

  // Filter blogs on the basis of category selection
  useEffect(() => {
    if (categoryType !== "") {
      let filter = [];
      if (categoryType === "Latest Blogs") {
        var today = new Date();
        var priorDate = new Date(new Date().setDate(today.getDate() - 30));

        filter = blogs.filter((blog) =>
          checkDateBetween(
            formatDate(priorDate, "DD/MM/YYYY"),
            formatDate(today, "DD/MM/YYYY"),
            formatDate(blog.date, "DD/MM/YYYY")
          )
        );
      } else {
        filter = blogs.filter(
          (blog) => blog.category.toLowerCase() === categoryType.toLowerCase()
        );
      }

      if (filter) {
        setFilteredBlogs(filter);
      } else {
        setFilteredBlogs([]);
      }
    } else {
      setFilteredBlogs([]);
    }
  }, [categoryType]);

  return (
    <main>
      <div>
        {filteredBlogs.length > 0 ? (
          <div className='products'>
            {filteredBlogs.length > 0 &&
              filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={{
                    pathname: `/BlogDetails`,
                    query: {
                      blogId: blog.id,
                    },
                  }}>
                  <Blog blog={blog} />
                </Link>
              ))}
          </div>
        ) : (
          <div>
            {blogs.length > 0 ? (
              <div className='products'>
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={{
                      pathname: `/BlogDetails`,
                      query: {
                        blogId: blog.id,
                      },
                    }}>
                    <Blog blog={blog} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className='norecords'>
                <b>{string.NoRecords}</b>
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
