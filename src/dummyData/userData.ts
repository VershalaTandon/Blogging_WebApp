import { User } from "@/types/userType";

export const user: User = [
  {
    id: 1,
    name: "abc",
    mobileNo: 1122334455,
    email: "abc@gmail.com",
    password: "assw",
    createdBlogs: [{ blogId: 1 }, { blogId: 2 }, { blogId: 3 }],
  },
  {
    id: 2,
    name: "pqr",
    mobileNo: 1122334455,
    email: "pqr@gmail.com",
    password: "assw",
    createdBlogs: [{ blogId: 4 }, { blogId: 5 }, { blogId: 6 }],
  },
];
