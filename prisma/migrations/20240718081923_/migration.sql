/*
  Warnings:

  - Added the required column `totalAmount` to the `ShoppingList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shoppinglist` ADD COLUMN `totalAmount` INTEGER NOT NULL;
