import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import DisplayCategoryProducts from "~/components/ItemsComponents/DisplayCategoryProducts";
import { Input } from "~/components/ui/input";
import { getCategory } from "~/utils/category.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const categoryName = String(params.category);
  const category = await getCategory(categoryName);
  return json({ category });
}

function Category() {
  const [query, setQuery] = useState("");
  const { category } = useLoaderData<typeof loader>();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const filterProducts = category?.products?.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-between p-4 space-y-7">
      <div className="w-full justify-around flex gap-5">
        <Input
          type="text"
          placeholder="search..."
          onChange={onChange}
          value={query}
          className="w-fit"
        />
      </div>
      <DisplayCategoryProducts products={filterProducts} />
    </div>
  );
}

export default Category;
