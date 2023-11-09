"use client";
import { useCategoryContext } from "@/context/context";
import { BlogCategory, BlogSubCategories } from "@/types/blogType";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface PropType {
  categoryTitle: string;
  id: number;
  subCategories: BlogSubCategories;
  type: string;
  setSelectedCategory?: Function;
}

export const DropDownComponent = (props: PropType) => {
  const router = useRouter();
  const { categoryTitle, id, subCategories, type, setSelectedCategory } = props;
  const { setCategoryType } = useCategoryContext();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='light' color='secondary' className='appTitle'>
          {/* {category.categoryTitle} */}
          {categoryTitle}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        key={id} //{category.id}
        aria-label='Dynamic Actions'
        color='secondary'
        items={subCategories} //{category.subCategories}
        className='navbarBackground'
        onAction={(key) => {
          if (type === "NavBar") {
            setCategoryType(key);
            router.push("/", { scroll: false });
          } else {
            setSelectedCategory(key);
          }
        }}>
        {(cat) => (
          <DropdownItem
            key={cat.categoryTitle}
            color='default'
            className='appTitle'
            style={{ padding: 10, textAlign: "start" }}>
            {cat.categoryTitle}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
