/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storageSize` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `image`,
    DROP COLUMN `storageSize`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;
