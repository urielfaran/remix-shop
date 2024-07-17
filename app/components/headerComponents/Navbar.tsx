import { ShoppingCart, User } from "lucide-react";
import BuyDrawer from "../BuyDrawer";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import ProfileMenu from "./ProfileMenu";
import HomeLink from "./HomeLink";

function Navbar() {
  return (
    <header className="flex justify-between p-4 shadow-md">
      <div className="items-start gap-2 flex justify-between">
        <HomeLink />
        <BuyDrawer>
          <Button variant="outline" size={"icon"}>
            <ShoppingCart />
          </Button>
        </BuyDrawer>
      </div>
      <div className="items-end gap-2 flex justify-between">
        <ModeToggle />
        <ProfileMenu>
          <Button variant="ghost">
            <User />
          </Button>
        </ProfileMenu>
      </div>
    </header>
  );
}

export default Navbar;
