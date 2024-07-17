import { Category } from "@prisma/client";
import { PropsWithChildren } from "react";
import Navbar from "../headerComponents/Navbar";
import CategoryCarousel from "./CategoryCarousel";

interface CategoryLayoutProps extends PropsWithChildren {
  categories: Category[];
}

function CategoryLayout({ children, categories }: CategoryLayoutProps) {
  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="flex m-5 sm:flex-col items-center">
        <CategoryCarousel categories={categories} />
      </div>
      <main>{children}</main>
    </div>
  );
}

export default CategoryLayout;
