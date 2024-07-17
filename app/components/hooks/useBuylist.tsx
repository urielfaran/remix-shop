import { useContext } from "react";
import { BuyListContext } from "../providers/buyList-provider";

function useBuylist() {
  const context = useContext(BuyListContext);

  if (!context) throw new Error("useBuylist must be used with buyListProvider");
  return context;
}

export default useBuylist;
