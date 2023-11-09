import { User } from "./userType";

export interface BlogCategory {
  id: number;
  categoryTitle: string;
  subCategories: BlogSubCategories[];
}

export interface BlogSubCategories {
  id: number;
  categoryTitle: string;
}

export interface BlogData {
  id: number;
  image: string;
  category: string;
  title: string;
  highligth: string;
  description: string;
  date: string;
  authorData: User;
}
