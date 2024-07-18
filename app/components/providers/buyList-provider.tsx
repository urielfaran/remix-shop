import { Product } from "@prisma/client";
import { createContext, PropsWithChildren } from "react";

export interface BuyListItem extends Product {
  amount: number;
}

export type buyListItemType = { id: string; name: string; amount: number; price: number };
export type buyListType = buyListItemType[];
interface BuyListContextType {
  buyList: buyListType;
}

export const BuyListContext = createContext<BuyListContextType>({
  buyList: [],
});

interface BuyListProviderProps extends PropsWithChildren {
  value: BuyListContextType;
}

export function BuyListProvider({ children, value }: BuyListProviderProps) {
  return (
    <BuyListContext.Provider value={value}>{children}</BuyListContext.Provider>
  );
}
