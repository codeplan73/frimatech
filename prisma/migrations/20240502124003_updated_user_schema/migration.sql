/*
  Warnings:

  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - Made the column `phone_number` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `dob`,
    MODIFY `phone_number` VARCHAR(20) NOT NULL,
    MODIFY `address` VARCHAR(255) NOT NULL,
    MODIFY `city` VARCHAR(50) NOT NULL,
    MODIFY `gender` VARCHAR(191) NOT NULL;
