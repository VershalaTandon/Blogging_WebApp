import { BlogCategory } from "@/types/blogType";

export const blogCategory: BlogCategory[] = [
  {
    id: 1,
    categoryTitle: "Latest Blogs",
    subCategories: [],
  },
  {
    id: 2,
    categoryTitle: "Business News",
    subCategories: [],
  },
  {
    id: 3,
    categoryTitle: "Editorial",
    subCategories: [
      {
        id: 3.1,
        categoryTitle: "Adventure",
      },
      {
        id: 3.2,
        categoryTitle: "Technology Advancement & Wellness",
      },
      {
        id: 3.3,
        categoryTitle: "Fashion and Design",
      },
      {
        id: 3.4,
        categoryTitle: "Development",
      },
      {
        id: 3.5,
        categoryTitle: "Growth Hacks",
      },
    ],
  },
];

export default blogCategory;
