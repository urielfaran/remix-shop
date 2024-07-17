import { Product } from "@prisma/client";
import { Form } from "@remix-run/react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import LazyImg from "../LazyImg";
import { Toaster } from "../Toaster"; // Import your Sonner component
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
// import LazyLoad from "react-lazyload";

interface DisplayItemProps {
  product: Product;
}

function DisplayItem({ product }: DisplayItemProps) {
  const [amount, setAmount] = useState(0);

  function handleIncrease() {
    setAmount(amount + 1);
  }

  function handleDecrease() {
    if (amount > 0) setAmount(amount - 1);
  }

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <LazyImg
          src={product.image}
          alt={product.name}
          className={`aspect-square`}
        />
        {/* {loaded ? null : "loading..."}
        <img
          ref={imgRef}
          src={product.image}
          className={`aspect-square`}
          alt=""
        /> */}
      </CardContent>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          Price: {product.price.toPrecision(3)}$
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            className="shrink-0"
            size={"icon"}
            variant={"ghost"}
            onClick={handleDecrease}
          >
            <Minus />
          </Button>
          <Input
            type="number"
            className="text-center"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button
            className="shrink-0"
            size={"icon"}
            variant={"ghost"}
            onClick={handleIncrease}
          >
            <Plus />
          </Button>
        </div>
        <Form method="post" action="/api/buylist" navigate={false}>
          <input
            type="text"
            readOnly
            hidden
            value={product.name}
            name="productName"
          />
          <input type="text" readOnly hidden value={amount} name="amount" />
          <Toaster
            type="submit"
            name="_action"
            value={"add"}
            disabled={amount == 0}
            toastTitle={
              amount > 0 ? "Product Added" : "You must add at least one item"
            }
            toastType={amount > 0 ? "success" : "warning"}
            variant={"default"}
            className="gap-2 w-full"
            description={
              amount > 0 ? `Added ${product.name}; amount: ${amount}` : ""
            }
          >
            <ShoppingBag />
            Add To Cart
          </Toaster>
        </Form>
      </CardFooter>
    </Card>
  );
}

export default DisplayItem;
