import { Link } from "@remix-run/react";
import { Home } from "lucide-react";
import { Button } from "../ui/button";

function HomeLink() {
  return (
    <div>
      <Link to={"/"}>
        <Button variant={"link"} className="space-x-2">
          <p>Home</p>
          <Home />
        </Button>
      </Link>
    </div>
  );
}

export default HomeLink;
