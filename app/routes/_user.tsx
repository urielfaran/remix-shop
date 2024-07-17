// import { BuyList } from "@prisma/client";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/utils/auth.server";
// import { BuyListContext } from "../components/providers/buyList-provider";
import invariant from "tiny-invariant";
import GeneralErrorBoundary from "~/components/ErrorBoundary";
import CategoryLayout from "~/components/layoutComponents/CategoryLayout";
import { BuyListProvider } from "~/components/providers/buyList-provider";
import { getAllCategories } from "~/utils/category.server";
import { shoppingListCookie } from "~/utils/cookies.server";

export const fruits = [
  "Apple",
  "Appricott",
  "Banana",
  "BlackBerry",
  "Cherry",
  "Cranberry",
  "Date",
  "Dragonfruit",
  "Elderberry",
  "Fig",
  "Grape",
  "Grapefruit",
];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth(request);
  invariant(user, "user is not logged in");

  const categories = await getAllCategories();

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await shoppingListCookie.parse(cookieHeader)) || {};

  return json({ categories, buyList: cookie.buyList });
}

export default function Index() {
  const { categories, buyList } = useLoaderData<typeof loader>();

  return (
    <>
      <BuyListProvider value={{ buyList }}>
        <CategoryLayout categories={categories}>
          <Outlet />
        </CategoryLayout>
      </BuyListProvider>
    </>
  );
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
