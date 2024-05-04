/*
  Warnings:

  - Added the required column `discount_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `discount_price` DOUBLE NOT NULL;
