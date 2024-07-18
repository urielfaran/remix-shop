import { ShoppingList } from "@prisma/client";
import { prisma } from "./prisma.server";

export async function AddShoppingList(
  userId: string,
  shoppingList: ShoppingList
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      shoppingList: [shoppingList],
    },
  });
}
