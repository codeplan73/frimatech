/*
  Warnings:

  - You are about to drop the column `CoverImage` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `bodyText` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverImage` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `CoverImage`,
    DROP COLUMN `body`,
    ADD COLUMN `bodyText` TEXT NOT NULL,
    ADD COLUMN `coverImage` VARCHAR(191) NOT NULL;
