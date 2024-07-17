import PurchaseForm from "~/components/forms/purchaseForm";
import Navbar from "~/components/headerComponents/Navbar";
import { Card } from "~/components/ui/card";

function BuyPage() {
  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="flex h-full items-center w-full justify-center">
        <Card className="flex flex-col gap-8 p-10 border-2 bg-transparent w-[25%]">
          <PurchaseForm />
        </Card>
      </div>
    </div>
  );
}

export default BuyPage;
