export interface User {
  id?: number;
  isLogin?: boolean;
  name: string;
  mobileNo: number | null;
  email: string;
  password?: string;
  createdBlogs?: CreatedBlogs[];
}

interface CreatedBlogs {
  blogId: number;
}
