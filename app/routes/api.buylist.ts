import { ActionFunctionArgs, json } from "@remix-run/node";
import { shoppingListCookie } from "~/utils/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  // const _action = await getRequestField("_action", request);
  const body = await request.formData();
  const { _action, ...rest } = Object.fromEntries(body);
  console.log(_action)
  switch (_action.toString()) {
    case "add": {
      const { productName, amount } = rest;

      // get cookie
      const cookieHeader = request.headers.get("Cookie");
      const cookie = (await shoppingListCookie.parse(cookieHeader)) || {};

      // update buyList
      const filteredBuyList = cookie.buyList
        ? cookie.buyList.filter(
            (item: { productName: string; amount: number }) =>
              item.productName !== productName
          )
        : [];

      const newBuyList = [
        ...filteredBuyList,
        { productName, amount: Number(amount) },
      ];

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
    case "remove": {
      const { productName } = rest;

       // get cookie
      const cookieHeader = request.headers.get("Cookie");
      const cookie = (await shoppingListCookie.parse(cookieHeader)) || {};

      // update buyList
      const newBuyList = cookie.buyList
        ? cookie.buyList.filter(
            (item: { productName: string; amount: number }) =>
              item.productName !== productName
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
