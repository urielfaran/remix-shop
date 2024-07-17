import { Form } from "@remix-run/react";
import useBuylist from "../hooks/useBuylist";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

function DisplayBuyList() {
  const { buyList } = useBuylist();

  return (
    <div className="flex flex-wrap gap-6 justify-center p-4 h-full">
      {buyList?.map(({ amount, productName }) => (
        <Card
          key={productName}
          className="flex flex-col items-center p-4 rounded-lg shadow-sm size-32"
        >
          <p className="text-lg font-medium">{productName}</p>
          <p className="text-sm">Amount: {amount}</p>
          <Form method="post" action="/api/buylist" navigate={false}>
            <input
              type="hidden"
              name="productName"
              value={productName}
              readOnly
            />
            <Button
              variant="destructive"
              className="mt-2"
              type="submit"
              name="_action"
              value="remove"
            >
              Remove
            </Button>
          </Form>
        </Card>
      ))}
    </div>
  );
}

export default DisplayBuyList;
