"use client";
import { DefaultButton } from "@/component/button/DefaultButton";
import { Input } from "@/component/input/Input";
import string from "@/constants/string";
import { BlogData, BlogSubCategories } from "@/types/blogType";
import { useEffect, useState } from "react";
import "./CreateEditBlog.css";
import { DropDownComponent } from "@/component/navbar/DropDownComponent";
import "@/component/navbar/NavBar.css";
import blogCategory from "@/dummyData/blogCategory";
import TextEditor from "@/component/TextEditor/TextEditor";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/utils";
import { User } from "@/types/userType";

// check category error for edit blog and add author whole object in blog instead of author id and name, that can help in blog details page auhtor name click redirection to login page

export const CreateEditBlog = ({ searchParams }) => {
  const router = useRouter();
  const defaultBlog = {
    id: 0,
    image: "",
    category: "Select Category",
    title: "",
    highligth: "",
    description: "",
    date: formatDate(new Date(), "DD MMM YYYY"),
    authorData: {},
  };
  const [authorData, setAuthorData] = useState<User>();
  const [blogData, setBlogData] = useState<BlogData[]>();
  const [blog, setBlog] = useState<BlogData>(defaultBlog);
  const [categoryList, setCategoryList] = useState<BlogSubCategories>();

  // add all type of categories and sub-categories in categoryList state
  useEffect(() => {
    // if (searchParams.blogId === undefined) {
    //   setBlog(defaultBlog);
    // }

    let subCat;
    const cat = blogCategory.map((item) => {
      if (item.subCategories.length > 0) {
        subCat = item.subCategories.map((subItem) => {
          const { id, categoryTitle } = subItem;
          return { id, categoryTitle };
        });
        return;
      }
      const { id, categoryTitle } = item;
      return { id, categoryTitle };
    });
    setTimeout(() => {
      var results = cat.filter((item) => {
        return item !== undefined;
      });

      setCategoryList([...results, ...subCat]);
    }, 1000);
  }, []);

  useEffect(() => {
    // get auhtor data and blog list data and set it in the blog author data and blog id
    if (typeof window !== "undefined" && window.localStorage) {
      const author = JSON.parse(localStorage.getItem("userProfileData"));
      setAuthorData(author);

      const blogs = JSON.parse(localStorage.getItem("blogData"));
      setBlogData(blogs);

      if (searchParams.blogId === undefined) {
        author.createdBlogs.push({ blogId: blogs.length + 1 });
        setAuthorData(author);
        setBlog({
          ...blog,
          id: blogs.length + 1,
          authorData: author,
        });
      } else {
        // Find blog details from blog list on the basis of blog id
        const findBlogData = blogs.find(
          (blog) => blog.id.toString() === searchParams.blogId
        );
        if (findBlogData) {
          setBlog(findBlogData);
        }
      }
    }
  }, [searchParams.blogId]);

  const validate = () => {
    if (blog?.image === "") {
      alert("Imagee cannot be blank.");
      return false;
    } else if (blog?.category === "" || blog?.category === "Select Category") {
      alert("Category cannot be blank.");
      return false;
    } else if (blog?.title === "") {
      alert("Title cannot be blank.");
      return false;
    } else if (blog?.description === "") {
      alert("Description cannot be blank.");
      return false;
    }
    return true;
  };

  const editPost = async () => {
    if (validate()) {
      if (typeof window !== "undefined" && window.localStorage) {
        let findblogIndex = await blogData.findIndex(
          (blogs: BlogData) => blogs.id === blog.id
        );
        if (findblogIndex > -1) {
          blogData[findblogIndex] = blog;
          localStorage.setItem("blogData", JSON.stringify(blogData));
          router.back();
        }
      }
    }
  };

  const createPost = () => {
    if (validate()) {
      if (typeof window !== "undefined" && window.localStorage) {
        blogData.push(blog);

        localStorage.setItem("blogData", JSON.stringify(blogData));
        localStorage.setItem("userProfileData", JSON.stringify(authorData));
        router.back();
      }
    }
  };

  return (
    <div className='mainCont'>
      {/* Create/Edit post form */}
      <form>
        {/* title create / edit post */}
        {searchParams.blogId ? (
          <h1 className='title'>{string.createEditPost.EditPost}</h1>
        ) : (
          <h1 className='title'>{string.createEditPost.CreatePost}</h1>
        )}

        {/* Image Link */}
        <div className='title'>
          <h1 className='placeholder'>{string.createEditPost.ImageLink}</h1>
        </div>
        <Input
          type='url'
          placeholder={string.createEditPost.ImageLink}
          handleChange={(e) =>
            setBlog({
              ...blog,
              image: e.target.value,
            })
          }
          value={blog.image}
          isRequired={true}
        />

        {/* category */}
        <div className='title'>
          <h1 className='placeholder'>{string.createEditPost.Category}</h1>
        </div>
        <div className='title'>
          <div className='dropdownDiv'>
            {categoryList && categoryList.length > 0 && (
              <DropDownComponent
                key={0}
                categoryTitle={blog.category}
                id={0}
                subCategories={categoryList}
                type='CreateEditBlog'
                setSelectedCategory={(e) =>
                  setBlog({
                    ...blog,
                    category: e,
                  })
                }
              />
            )}
          </div>
        </div>

        {/* Title */}
        <div className='title'>
          <h1 className='placeholder'>{string.createEditPost.Title}</h1>
        </div>
        <Input
          type='text'
          placeholder={string.createEditPost.Title}
          handleChange={(e) =>
            setBlog({
              ...blog,
              title: e.target.value,
            })
          }
          value={blog.title}
          isRequired={true}
        />

        {/* Highligth */}
        <div className='title'>
          <h1 className='placeholder'>{string.createEditPost.Highligth}</h1>
        </div>
        <div className='title'>
          <div className='dropdownDiv'>
            <TextEditor
              value={blog.highligth}
              setValue={(text) =>
                setBlog({
                  ...blog,
                  highligth: text,
                })
              }
            />
          </div>
        </div>

        {/* Description */}
        <div className='title'>
          <h1 className='placeholder'>{string.createEditPost.Description}</h1>
        </div>
        <div className='title'>
          <div className='dropdownDiv'>
            <TextEditor
              value={blog.description}
              setValue={(text) =>
                setBlog({
                  ...blog,
                  description: text,
                })
              }
            />
          </div>
        </div>

        {/* signu/login button */}
        <div className='title'>
          <DefaultButton
            styleType='bordered'
            buttonType='submit'
            title={
              searchParams.blogId
                ? string.createEditPost.EditPost
                : string.createEditPost.CreatePost
            }
            onPress={() => (searchParams.blogId ? editPost() : createPost())}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEditBlog;
