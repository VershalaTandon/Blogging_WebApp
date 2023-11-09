"use client";
import { EjectSimple, UserCircle, House } from "@phosphor-icons/react/dist/ssr";
import "./NavBar.css";
import Link from "next/link";
import string from "@/constants/string";
import blogCategory from "@/dummyData/blogCategory";
import { DropDownComponent } from "./DropDownComponent";
import { useCategoryContext } from "@/context/context";
import { BlogCategory } from "@/types/blogType";

export const Navbar = () => {
  const { setCategoryType } = useCategoryContext();

  return (
    <div className='navbar navbarBackground'>
      {/* logo */}
      <div className='appTitle'>
        <div className='logo'>
          <EjectSimple size={25} />
        </div>
        <p className='appTitle'>
          <b>{string.AppName}</b>
        </p>
      </div>

      {/* categories */}
      <div className='navbar'>
        <Link href={`/`}>
          <p className='appTitle' onClick={() => setCategoryType("")}>
            {string.All}
          </p>
        </Link>
        {blogCategory.map((category: BlogCategory) => {
          if (category.subCategories.length > 0) {
            // dropdown view display subcategory
            return (
              <DropDownComponent
                categoryTitle={category.categoryTitle}
                id={category.id}
                subCategories={category.subCategories}
                type='NavBar'
                key={category.id}
              />
            );
          } else {
            return (
              <Link href={`/`} key={category.id}>
                <p
                  key={category.id}
                  className='appTitle'
                  onClick={() => setCategoryType(category.categoryTitle)}>
                  {category.categoryTitle}
                </p>
              </Link>
            );
          }
        })}
      </div>

      {/* home & profile */}
      <div className='navbar navlinksContent'>
        <div className='links'>
          <Link href='/'>
            <House size={20} />
          </Link>
          <Link href='/SignIn'>
            <UserCircle size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
