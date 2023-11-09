"use client";
import React, { useEffect, useState } from "react";
import "./Login.css";
import "../Home.css";
import { Input } from "../../component/input/Input";
import { DefaultButton } from "../../component/button/DefaultButton";
import string from "../../constants/string";
import { User } from "@/types/userType";
import { user } from "@/dummyData/userData";
import Link from "next/link";
import { Blog } from "@/component/Blog/Blog";
import { BlogData } from "@/types/blogType";
import { PlusCircle } from "phosphor-react";

export const SignIn = ({ searchParams }) => {
  const EmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const PhoneNumberRegex =
    /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
  const defaultProfileData: User = {
    isLogin: false,
    email: "",
    name: "",
    mobileNo: null,
    password: "",
    createdBlogs: [],
  };
  const [userData, setUserData] = useState<User[]>(user);
  const [userProfileData, setUserProfileData] = useState<User>(
    searchParams?.viewAuthorProfile !== undefined
      ? JSON.parse(searchParams?.viewAuthorProfile)
      : defaultProfileData
  );
  const [profilePostStatus, setProfilePostStatus] = useState<string>(
    searchParams.action === true
      ? string.login.AuthorPosts
      : string.login.AuthorProfile
  );
  const [registeredEmailStatus, setRegisteredEmailStatus] =
    useState<string>("");
  const [authorPosts, setAuthorPosts] = useState<BlogData[]>();

  // get local storage saved data and set in the fields
  useEffect(() => {
    if (searchParams?.viewAuthorProfile === undefined) {
      if (typeof window !== "undefined" && window.localStorage) {
        let profileData = JSON.parse(localStorage.getItem("userProfileData"));
        setUserProfileData(profileData);
      }
    }
  }, []);

  const getLocalStorageBlogData = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return JSON.parse(localStorage.getItem("blogData"));
    }
    return null;
  };

  // Get the details of the post created by the author
  useEffect(() => {
    let blogsData = getLocalStorageBlogData();

    if (
      profilePostStatus === string.login.AuthorPosts &&
      userProfileData?.createdBlogs
    ) {
      const userPosts = userProfileData?.createdBlogs.map((ids) => {
        return blogsData.find((blog) => blog.id === ids.blogId);
      });
      setAuthorPosts(userPosts);
    }
  }, [profilePostStatus]);

  // On press of reset button
  const reset = () => {
    setLocalData(defaultProfileData);
    setRegisteredEmailStatus("");
  };

  // On press of logout button
  const logout = () => {
    // call logout api and set below data when get success response
    setLocalData(defaultProfileData);
    setRegisteredEmailStatus("");
  };

  // When register, validate fields
  const validate = () => {
    if (!userProfileData?.name || userProfileData?.name === "") {
      alert("Name cannot be blank.");
      return false;
    } else if (
      !userProfileData?.mobileNo ||
      userProfileData?.mobileNo === null
    ) {
      alert("Mobile cannot be blank ");
      return false;
    } else if (
      userProfileData?.mobileNo !== null &&
      PhoneNumberRegex.test(userProfileData?.mobileNo) === false
    ) {
      alert("Invalid Mobile ");
      return false;
    } else if (!userProfileData?.password || userProfileData?.password === "") {
      alert("Password cannot be blank.");
      return false;
    }
    return true;
  };

  // Save data to local storage
  const setLocalData = (profileData: User) => {
    // set this below code when both the apis get success status
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("userProfileData", JSON.stringify(profileData));
      setUserProfileData(profileData);
    }
  };

  // On press of login/signup
  const onFormSubmit = () => {
    if (
      userProfileData?.email !== "" &&
      EmailReg.test(userProfileData?.email) === true
    ) {
      const findUser = userData.find(
        (data) => data.email === userProfileData?.email
      );

      if (registeredEmailStatus === "") {
        if (findUser) {
          setRegisteredEmailStatus(
            string.login.SigninSignupStatus.AlreadyRegistered
          );
        } else {
          setRegisteredEmailStatus(
            string.login.SigninSignupStatus.NeedToRegister
          );
        }
      } else if (
        registeredEmailStatus === string.login.SigninSignupStatus.NeedToRegister
      ) {
        if (validate()) {
          // call register api
          setLocalData({
            id: userData.length + 1,
            isLogin: true,
            email: userProfileData?.email,
            name: userProfileData?.name,
            mobileNo: userProfileData?.mobileNo,
            password: userProfileData?.password,
            createdBlogs: [],
          });
        }
      } else if (
        registeredEmailStatus ===
        string.login.SigninSignupStatus.AlreadyRegistered
      ) {
        if (findUser?.password === userProfileData?.password) {
          // call login api
          setLocalData({
            id: findUser.id,
            isLogin: true,
            email: userProfileData?.email,
            name: findUser.name,
            mobileNo: findUser.mobileNo,
            password: findUser.password,
            createdBlogs: findUser.createdBlogs,
          });
        } else {
          alert("Password doesnot match");
        }
      }
    } else {
      alert(string.login.InvalidEmailError);
    }
  };

  const deleteBlog = (blog: BlogData) => {
    // delete blog from blog list
    let blogsData = getLocalStorageBlogData();
    let getBlogIndex = blogsData.findIndex((blogs) => blogs.id === blog.id);
    if (getBlogIndex > -1) {
      blogsData.splice(getBlogIndex, 1);
      localStorage.setItem("blogData", JSON.stringify(blogsData));
    }

    // delete blog id from author profile
    let authorBlogIds = userProfileData?.createdBlogs;
    let getAuthorBlogIndex = authorBlogIds?.findIndex(
      (authBlog) => authBlog.blogId === blog.id
    );
    if (getAuthorBlogIndex > -1) {
      authorBlogIds?.splice(getAuthorBlogIndex, 1);
      setUserProfileData({
        ...userProfileData,
        createdBlogs: authorBlogIds,
      });
      localStorage.setItem("userProfileData", JSON.stringify(userProfileData));

      let authorBlogs = authorPosts;
      authorBlogs?.splice(getAuthorBlogIndex, 1);
      setAuthorPosts(authorBlogs);
    }
  };

  return (
    <div className='main'>
      <div
        className={
          profilePostStatus === string.login.AuthorProfile
            ? "logincontainer"
            : "authpost"
        }>
        {/* title / tab buttons */}
        {userProfileData?.isLogin || searchParams?.viewAuthorProfile ? (
          <div className='login'>
            <DefaultButton
              styleType={
                profilePostStatus === string.login.AuthorProfile
                  ? "noborderButton"
                  : "bordered"
              }
              buttonType='button'
              title={string.login.AuthorProfile}
              onPress={() => {
                setProfilePostStatus(string.login.AuthorProfile);
              }}
            />
            <DefaultButton
              styleType={
                profilePostStatus === string.login.AuthorPosts
                  ? "noborderButton"
                  : "bordered"
              }
              buttonType='button'
              title={string.login.AuthorPosts}
              onPress={() => {
                setProfilePostStatus(string.login.AuthorPosts);
              }}
            />
          </div>
        ) : (
          <div>
            <h1 className='login'>{string.login.AuthorProfileCreate}</h1>
            <div className='login'>
              <h1>{string.login.Login}</h1>
              <h1 className='or'>{string.login.Or}</h1>
              <h1>{string.login.Signup}</h1>
            </div>
          </div>
        )}

        {/* profile form */}
        {profilePostStatus === string.login.AuthorProfile ? (
          <form className='formWidth'>
            {/* Email */}
            <Input
              type='email'
              placeholder={string.login.Email}
              handleChange={(e) =>
                setUserProfileData({
                  ...userProfileData,
                  email: e.target.value,
                })
              }
              value={userProfileData?.email}
              isRequired={true}
              disabled={
                searchParams?.viewAuthorProfile ||
                (userProfileData?.isLogin && userProfileData?.isLogin)
                  ? true
                  : false
              }
            />
            {/* visible only when already login without editable fields or visible when need to login/signup and visible when any user want to see blog author profile*/}
            {(registeredEmailStatus !== "" ||
              userProfileData?.isLogin ||
              searchParams?.viewAuthorProfile) && (
              <div>
                {/* visible only when already login without editable fields or visible when need to signup */}
                {(registeredEmailStatus ===
                  string.login.SigninSignupStatus.NeedToRegister ||
                  userProfileData?.isLogin ||
                  searchParams?.viewAuthorProfile) && (
                  <div>
                    {/* Name */}
                    <Input
                      type='text'
                      placeholder={string.login.Name}
                      handleChange={(e) =>
                        setUserProfileData({
                          ...userProfileData,
                          name: e.target.value,
                        })
                      }
                      value={userProfileData?.name}
                      isRequired={true}
                      disabled={
                        searchParams?.viewAuthorProfile ||
                        (userProfileData?.isLogin && userProfileData?.isLogin)
                          ? true
                          : false
                      }
                    />
                    {/* Mobile */}
                    <Input
                      type='tel'
                      placeholder={string.login.Mobile}
                      handleChange={(e) =>
                        setUserProfileData({
                          ...userProfileData,
                          mobileNo: e.target.value,
                        })
                      }
                      value={userProfileData?.mobileNo}
                      isRequired={true}
                      disabled={
                        searchParams?.viewAuthorProfile ||
                        (userProfileData?.isLogin && userProfileData?.isLogin)
                          ? true
                          : false
                      }
                    />
                  </div>
                )}
                {/* Password */}
                {!searchParams?.viewAuthorProfile && (
                  <Input
                    type='password'
                    placeholder={string.login.Password}
                    handleChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        password: e.target.value,
                      })
                    }
                    value={userProfileData?.password}
                    isRequired={true}
                    disabled={!userProfileData?.isLogin ? false : true}
                  />
                )}
              </div>
            )}
            <div className='buttoncontainer'>
              {!searchParams?.viewAuthorProfile && (
                <div>
                  {/* Logout */}
                  {userProfileData?.isLogin ? (
                    <DefaultButton
                      styleType='bordered'
                      buttonType='reset'
                      title={string.login.Logout}
                      onPress={() => logout()}
                    />
                  ) : (
                    <div>
                      {/* signu/login button */}
                      <DefaultButton
                        styleType='bordered'
                        buttonType='submit'
                        title={
                          registeredEmailStatus ===
                          string.login.SigninSignupStatus.AlreadyRegistered
                            ? string.login.Login
                            : string.login.Signup
                        }
                        onPress={() => onFormSubmit()}
                      />
                      {/* reset button */}
                      <DefaultButton
                        styleType='bordered'
                        buttonType='reset'
                        title={string.login.Reset}
                        onPress={() => reset()}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        ) : (
          <div>
            {!searchParams?.viewAuthorProfile && (
              <Link href='/CreateEditBlog' className='login addPostIcon'>
                <PlusCircle size={32} />
              </Link>
            )}
            <div>
              {authorPosts !== undefined && authorPosts?.length > 0 ? (
                <div className='products'>
                  {authorPosts.map((blogs) => (
                    <Link
                      key={blogs.id}
                      href={{
                        pathname: `/BlogDetails`,
                        query: {
                          blogId: blogs.id,
                        },
                      }}>
                      <Blog
                        blog={blogs}
                        isAuthorPost={
                          searchParams?.viewAuthorProfile ? false : true
                        }
                        deleteBlog={(blog) => deleteBlog(blog)}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className='norecords'>
                  <b>{string.NoRecords}</b>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
