import { Form } from "@remix-run/react";
import { buyListType } from "../providers/buyList-provider";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface DisplayBuyListProps {
  buyList: buyListType;
}

function DisplayBuyList({ buyList }: DisplayBuyListProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-4 h-full">
      {buyList?.map(({ amount, id, name }) => (
        <Card
          key={id}
          className="flex flex-col items-center p-4 rounded-lg shadow-sm size-32"
        >
          <p className="text-lg font-medium">{name}</p>
          <p className="text-sm">Amount: {amount}</p>
          <Form method="post" action="/api/buylist" navigate={false}>
            <input
              type="hidden"
              name="id"
              value={id}
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
