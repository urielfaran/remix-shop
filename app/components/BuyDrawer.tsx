import type { PropsWithChildren } from "react";
import DisplayBuyList from "./headerComponents/DisplayBuyList";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link } from "@remix-run/react";
import useBuylist from "./hooks/useBuylist";

interface NavbarProps extends PropsWithChildren {}

function BuyDrawer({ children }: NavbarProps) {
  const { buyList } = useBuylist();

  let totalAmount = 0;
  buyList?.forEach((item) => (totalAmount += item.amount*item.price));

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col min-h-0" side={"right"}>
        <SheetHeader className="p-4 border-b border-gray-200">
          <SheetTitle className="text-center text-xl font-semibold text-muted-foreground">
            Your Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-center text-sm text-muted-foreground">
            Review your items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex overflow-y-auto min-h-0">
          <DisplayBuyList buyList={buyList} />
        </div>
        <SheetFooter className="p-4 border-t mt-auto border-gray-200 bottom-0">
          <div className="flex flex-col w-full gap-4">
            <p className="text-center text-muted-foreground">
              Total Price: {totalAmount.toFixed(2)}$
            </p>
            <div className="flex justify-center">
              <Link
                to={"/buy-page"}
                className={buttonVariants({ className: "flex-1 mx-1" })}
              >
                Buy
              </Link>
              <SheetClose asChild>
                <Button variant="outline" className="flex-1 mx-1">
                  Cancel
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default BuyDrawer;
