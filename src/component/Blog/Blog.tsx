import React from "react";
import "./Blog.css";
import { PencilSimple, Trash } from "phosphor-react";
import Link from "next/link";
import { BlogData } from "@/types/blogType";

interface PropType {
  blog: BlogData;
  isAuthorPost?: boolean;
  deleteBlog?: Function;
}

export const Blog = (props: PropType) => {
  const { blog, isAuthorPost = false, deleteBlog } = props;

  return (
    <div className='product'>
      {/* Blog category */}
      <div className='categoryDiv'>
        <p>
          <b>{blog.category}</b>
        </p>
        {isAuthorPost && (
          <div className='categoryDiv'>
            <Link
              href={{
                pathname: `/CreateEditBlog`,
                query: {
                  blogId: blog.id,
                },
              }}
              className='iconSpace'>
              <PencilSimple size={20} />
            </Link>
            <Link
              href='/'
              onClick={(event) => {
                event.preventDefault();
                deleteBlog(blog);
              }}>
              <Trash size={20} />
            </Link>
          </div>
        )}
      </div>
      {/* Blog image */}
      <img className='img' src={blog.image} alt='' />
      <div>
        {/* Blog title */}
        <p>
          <b>{blog.title}</b>
        </p>
      </div>
    </div>
  );
};
