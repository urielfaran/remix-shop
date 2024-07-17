import { Prisma } from "@prisma/client";
import { prisma } from "./prisma.server";

export async function getCategory(categoryName: string) {
  return prisma.category.findUnique({
    where: { name: categoryName },
    include: { products: true },
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({
    include: {
      products: true,
    },
  });
}

export type CategoryWithProduct = Prisma.CategoryGetPayload<{
  include: {
    products: true,
  }
 }>