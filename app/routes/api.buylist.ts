import { ActionFunctionArgs, json } from "@remix-run/node";
import { shoppingListCookie } from "~/utils/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const { _action, ...rest } = Object.fromEntries(body);
  switch (_action.toString()) {
    case "add": {
      const { id, amount, price, name } = rest;

      // get cookie
      const cookieHeader = request.headers.get("Cookie");
      const cookie = (await shoppingListCookie.parse(cookieHeader)) || {};
      console.log(id, amount, price, name);
      // update buyList
      const filteredBuyList = cookie.buyList
        ? cookie.buyList.filter(
            (item: {
              id: string;
              name: string;
              amount: number;
              price: number;
            }) => item.id !== id
          )
        : [];
        const newBuyList = [
        ...filteredBuyList,
        { id, name, amount: Number(amount), price },
      ];

      cookie.buyList = newBuyList;
      console.log(cookie.buyList)

      return json(
        {},
        {
          headers: {
            "Set-Cookie": await shoppingListCookie.serialize(cookie),
          },
        }
      );
    }
    case "remove": {
      const { id } = rest;

      // get cookie
      const cookieHeader = request.headers.get("Cookie");
      const cookie = (await shoppingListCookie.parse(cookieHeader)) || {};

      // update buyList
      const newBuyList = cookie.buyList
        ? cookie.buyList.filter(
            (item: {
              id: string;
              name: string;
              amount: number;
              price: number;
            }) => item.id !== id
          )
        : [];

      cookie.buyList = newBuyList;

      return json(
        {},
        {
          headers: {
            "Set-Cookie": await shoppingListCookie.serialize(cookie),
          },
        }
      );
    }
    default:
      return null;
  }
}
