"use client";
import { useEffect, useState } from "react";
import "./BlogDetails.css";
import { BlogData } from "@/types/blogType";
import string from "@/constants/string";
import Link from "next/link";

export const BlogDetails = ({ searchParams }) => {
  const [blog, setBlog] = useState<BlogData>();

  // Find blog details from blog list on the basis of blog id
  useEffect(() => {
    let blogData;
    if (typeof window !== "undefined" && window.localStorage) {
      blogData = JSON.parse(localStorage.getItem("blogData"));
    }
    const findBlogData: BlogData = blogData.find(
      (blog) => blog.id.toString() === searchParams.blogId
    );
    setBlog(findBlogData);
  }, [searchParams.blogId]);

  return (
    <div>
      <div className='detailscontainer'>
        {/* Blog categort */}
        <p className='title category margin'>
          <b>{blog?.category}</b>
        </p>
        {/* blog title */}
        <p className='margin'>
          <b>{blog?.title}</b>
        </p>

        {/* blog image */}
        <img className='image margin' src={blog?.image} alt='' />
        <p className='description margin'>{blog?.date}</p>

        {blog?.highligth !== "" && (
          <div>
            {/* Blog Highlights */}
            <p className='title margin'>
              <b>{string.BlogDetails.PostHighlight}</b>
            </p>
            <div
              className='description margin'
              dangerouslySetInnerHTML={{ __html: blog?.highligth }}
            />
          </div>
        )}
        {/* Blog description */}
        <p className='title margin'>
          <b>{string.BlogDetails.ContinueReading}</b>
        </p>
        <div
          className='description margin'
          dangerouslySetInnerHTML={{ __html: blog?.description }}
        />
        {/* Author details */}
        <div className='author'>
          <p className='title margin'>
            <b>Author:</b>
          </p>

          <Link
            href={{
              pathname: `/SignIn`,
              query: {
                viewAuthorProfile: JSON.stringify(blog?.authorData),
              },
            }}>
            <p className='title margin authorName'>{blog?.authorData.name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
