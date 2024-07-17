import { Form } from "@remix-run/react";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

function Logout() {
  return (
    <Form method="post" action="/logout">
      <Button>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </Form>
  );
}

export default Logout;
