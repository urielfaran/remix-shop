import { Product } from "@prisma/client";
import DisplayItem from "./DisplayItem";

interface DisplayCategoryProductsProps {
  products: Product[] | undefined;
}

function DisplayCategoryProducts({ products }: DisplayCategoryProductsProps) {
  return (
    <div className="container gap-10 grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
      {products?.map((product, Index) => (
        <DisplayItem product={product} key={Index} />
      ))}
    </div>
  );
}

export default DisplayCategoryProducts;
