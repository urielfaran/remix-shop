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

interface NavbarProps extends PropsWithChildren {}

function BuyDrawer({ children }: NavbarProps) {
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
          <DisplayBuyList />
        </div>
        <SheetFooter className="p-4 border-t mt-auto border-gray-200 flex justify-between bottom-0">
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default BuyDrawer;
