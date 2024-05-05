/*
  Warnings:

  - You are about to drop the column `discount_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbNail` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `discount_price`,
    DROP COLUMN `name`,
    DROP COLUMN `thumbNail`,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL;
