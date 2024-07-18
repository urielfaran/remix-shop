import PurchaseForm from "~/components/forms/purchaseForm";
import Navbar from "~/components/headerComponents/Navbar";
import { Card } from "~/components/ui/card";

function BuyPage() {
  return (
    <div className="default flex h-screen w-screen flex-col">
      <div className="container">
        <Navbar />
      </div>
      <div className="flex h-full items-center justify-center">
        <Card className="flex flex-col gap-8 p-10 border-2 bg-transparent">
          <PurchaseForm />
        </Card>
      </div>
    </div>
  );
}

import { json, type ActionFunctionArgs } from "@remix-run/node";
import { shoppingListCookie } from "~/utils/cookies.server";
export async function action({ request }: ActionFunctionArgs) {

  const body = await request.formData();
  const { _action } = Object.fromEntries(body);
  switch (_action.toString()) {
    case "buy": {
      // get cookie
      const cookieHeader = request.headers.get("Cookie");
      const cookie = (await shoppingListCookie.parse(cookieHeader)) || {};

    

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

export default BuyPage;
